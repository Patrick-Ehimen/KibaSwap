// SPDX-License-Identifier: MIT

/**
 * 
 ██████╗ ██╗  ██╗ ██████╗ ███████╗███████╗
██╔═████╗╚██╗██╔╝██╔═══██╗██╔════╝██╔════╝
██║██╔██║ ╚███╔╝ ██║   ██║███████╗█████╗  
████╔╝██║ ██╔██╗ ██║   ██║╚════██║██╔══╝  
╚██████╔╝██╔╝ ██╗╚██████╔╝███████║███████╗
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
 */

/**
 * @title KibaStakeMasterV1
 * @dev This contract manages the staking of tokens for rewards in the Kiba ecosystem.
 * 
 * This contract is designed to manage the staking of tokens for rewards in the Kiba ecosystem.
 * It includes functionality for adding and managing staking pools, updating the multiplier for rewards,
 * and distributing rewards to users based on their staked tokens.
 * 
 * @author 0xose
 * @version 1.0
 */

pragma solidity ^0.8.20;

import {SafeERC20} from 'openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol';
import {SafeMath} from 'openzeppelin-contracts/contracts/utils/math/SafeMath.sol';
import {IERC20} from 'openzeppelin-contracts/contracts/token/ERC20/IERC20.sol';
import {Ownable} from 'openzeppelin-contracts/contracts/access/Ownable.sol';
import {ReentrancyGuard} from 'openzeppelin-contracts/contracts/security/ReentrancyGuard.sol';

import {KibaRewardToken} from './KibaRewardToken.sol';
import {KRTRewardPayment} from './utils/KRTRewardPayment.sol';

contract KibaStakeMasterV1 is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    // Struct to hold user information
    struct UserInfo {
        uint256 amount; 
        uint256 pendingReward;
    }

    // Struct to hold pool information
    struct PoolInfo {
        IERC20 liquidityPoolToken;
        uint256 allocationPoint;
        uint256 lastRewardBlock;
        uint256 rewardTokenPerShare;
    }

    KibaRewardToken public krtRewards; // The Kiba Reward Token contract
    KRTRewardPayment public krtRewardPay; // Commented out as not used
    address public dev; // The address of the developer
    uint256 public krtRewardsPerBlock; // The number of KRT rewards per block

    PoolInfo[] public poolInfo; // Array of pool information
    mapping (uint256 => mapping (address => UserInfo)) public userInfo; // Mapping of user information
    uint256 public totalAllocation = 0; // Total allocation points
    uint256 public startBlock; // The block number when the contract starts
    uint256 public BONUS_MULTIPLIER; // The multiplier for bonus rewards

    /**
     * @dev Emitted when a user deposits tokens into a pool.
     * @param user The address of the user making the deposit.
     * @param poolId The ID of the pool into which the tokens are being deposited.
     * @param amount The amount of tokens being deposited.
     */
    event Deposit(address indexed user, uint256 indexed poolId, uint256 amount);

    /**
     * @dev Emitted when a user withdraws tokens from a pool.
     * @param user The address of the user making the withdrawal.
     * @param poolId The ID of the pool from which the tokens are being withdrawn.
     * @param amount The amount of tokens being withdrawn.
     */
    event Withdraw(address indexed user, uint256 indexed poolId, uint256 amount);

    /**
     * @dev Emitted when a user makes an emergency withdrawal from a pool.
     * @param user The address of the user making the emergency withdrawal.
     * @param poolId The ID of the pool from which the tokens are being withdrawn.
     * @param amount The amount of tokens being withdrawn.
     */
    event EmergencyWithdraw(address indexed user, uint256 indexed poolId, uint256 amount);

    /**
     * @dev Initializes the contract with the KRT rewards token, developer address, KRT rewards per block, start block, and bonus multiplier.
     * @param _krtRewards The KRT rewards token contract.
     * @param _dev The address of the developer.
     * @param _krtRewardsPerBlock The number of KRT rewards per block.
     * @param _startBlock The block number when the contract starts.
     * @param _multiplier The multiplier for bonus rewards.
     */
    constructor(
        KibaRewardToken _krtRewards,
        KRTRewardPayment _krtRewardPay, 
        address _dev,
        uint256 _krtRewardsPerBlock,
        uint256 _startBlock,
        uint256 _multiplier
    ) {
        krtRewards = _krtRewards;
        krtRewardPay = _krtRewardPay; 
        dev = _dev;
        krtRewardsPerBlock = _krtRewardsPerBlock;
        startBlock = _startBlock;
        BONUS_MULTIPLIER = _multiplier;

        // Initialize the first pool with the KRT rewards token
        poolInfo.push(PoolInfo({
            liquidityPoolToken: _krtRewards,
            allocationPoint: 1000,
            lastRewardBlock: startBlock,
            rewardTokenPerShare: 0
        }));
        totalAllocation = 1000;
    }

    /**
     * @dev Validates if the pool ID is valid.
     * @param _poolId The ID of the pool to validate.
     */
    modifier validatePool(uint256 _poolId) {
        require(_poolId < poolInfo.length, "pool Id Invalid");
        _;
    }   

    /**
     * @dev Returns the number of pools.
     * @return The number of pools.
     */
    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    /**
     * @dev Returns the information of a pool.
     * @param _poolId The ID of the pool.
     */
    function getPoolInfo(uint256 _poolId) public view
    returns(address liquidityPoolToken, uint256 allocationPoint, uint256 lastRewardBlock, uint256 rewardTokenPerShare) {
        return (address(poolInfo[_poolId].liquidityPoolToken),
            poolInfo[_poolId].allocationPoint,
            poolInfo[_poolId].lastRewardBlock,
            poolInfo[_poolId].rewardTokenPerShare);
    }

    /**
     * @dev Calculates the multiplier based on the block numbers.
     * @param _from The starting block number.
     * @param _to The ending block number.
     * @return The calculated multiplier.
     */
    function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        return _to.sub(_from).mul(BONUS_MULTIPLIER);
    }

    /**
     * @dev Updates the bonus multiplier.
     * @param multiplierNumber The new multiplier number.
     */
    function updateMultiplier(uint256 multiplierNumber) public onlyOwner {
        BONUS_MULTIPLIER = multiplierNumber;
    }

    /**
     * @dev Checks if a pool already exists.
     * @param _lpToken The liquidity pool token to check.
     */
    function checkPoolDuplicate(IERC20 _lpToken) public view {
        uint256 length = poolInfo.length;
        for (uint256 _poolId = 0; _poolId < length; _poolId++) {
            require(poolInfo[_poolId].liquidityPoolToken != _lpToken, "This Pool Already Exist");
        }
    }

    /**
     * @dev Updates the staking pool.
     */
    function updateStakingPool() internal {
        uint256 length = poolInfo.length;
        uint256 points = 0;
        for (uint256 poolId = 1; poolId < length; ++poolId) {
            points = points.add(poolInfo[poolId].allocationPoint);
        }
        if (points != 0) {
            points = points.div(3);
            totalAllocation = totalAllocation.sub(poolInfo[0].allocationPoint).add(points);
            poolInfo[0].allocationPoint = points;
        }
    }

    /**
     * @dev Updates all pools in the system.
     * This function iterates through all existing pools and calls the updatePool function for each pool.
     */
    function massUpdatePools() public {
        // Retrieve the total number of pools
        uint256 length = poolInfo.length;
        // Iterate through each pool and update it
        for (uint256 poolId = 0; poolId < length; ++poolId) {
            // Call the updatePool function for the current pool ID
            updatePool(poolId);
        }
    }

    /**
     * @dev Adds a new staking pool.
     * @param _allocPoint The allocation point for the new pool.
     * @param _lpToken The liquidity pool token for the new pool.
     */
    function add(uint256 _allocPoint, IERC20 _lpToken, bool _withUpdate) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        // Check if the pool already exists
        checkPoolDuplicate(_lpToken);
        // Calculate the last reward block
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        // Update the total allocation
        totalAllocation = totalAllocation.add(_allocPoint);
        // Add the new pool to the pool info
        poolInfo.push(PoolInfo({
            liquidityPoolToken: _lpToken,
            allocationPoint: _allocPoint,
            lastRewardBlock: lastRewardBlock,
            rewardTokenPerShare: 0
        }));
        // Update the staking pool
        updateStakingPool();
    }

    /**
     * @dev Updates the staking pool.
     * @param _poolId The pool ID to update.
     */
    function updatePool(uint256 _poolId) public validatePool(_poolId) {
        // Retrieve the pool information for the specified pool ID
        PoolInfo storage pool = poolInfo[_poolId];
        // Check if the current block number is less than or equal to the last reward block for the pool
        if (block.number <= pool.lastRewardBlock) {
            // If true, exit the function early
            return;
        }
        // Calculate the current LP token supply in the contract
        uint256 lpSupply = pool.liquidityPoolToken.balanceOf(address(this));
        // If there is no LP token supply, update the last reward block and exit
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        // Calculate the multiplier based on the time elapsed since the last reward block
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        // Calculate the token reward based on the multiplier, allocation point, and total allocation
        uint256 tokenReward = multiplier.mul(krtRewardsPerBlock).mul(pool.allocationPoint).div(totalAllocation);
        // Mint 10% of the token reward to the developer
        krtRewards.mint(dev, tokenReward.div(10));
        // Mint the remaining 90% of the token reward to the reward pay contract
        krtRewards.mint(address(krtRewardPay), tokenReward);
        // Update the pool's reward token per share
        pool.rewardTokenPerShare = pool.rewardTokenPerShare.add(tokenReward.mul(1e12).div(lpSupply));
        // Update the pool's last reward block to the current block number
        pool.lastRewardBlock = block.number;
    }

    /**
     * @dev Sets the allocation point for a given pool ID and optionally updates all pools.
     * @param _poolId The ID of the pool to update.
     * @param _allocationPoint The new allocation point for the pool.
     * @param _withUpdate If true, updates all pools before setting the allocation point.
     */
    function set(uint256 _poolId, uint256 _allocationPoint, bool _withUpdate) public onlyOwner {
        // If _withUpdate is true, call massUpdatePools to update all pools before setting the allocation point
        if (_withUpdate) {
            massUpdatePools();
        }
        // Retrieve the previous allocation point for the specified pool ID
        uint256 prevAllocationPoint = poolInfo[_poolId].allocationPoint;
        // Update the allocation point for the specified pool ID
        poolInfo[_poolId].allocationPoint = _allocationPoint;
        // If the allocation point has changed, update the total allocation and the staking pool
        if (prevAllocationPoint != _allocationPoint) {
            // Adjust the total allocation by subtracting the previous allocation point and adding the new one
            totalAllocation = totalAllocation.sub(prevAllocationPoint).add(_allocationPoint);
            // Call updateStakingPool to update the staking pool with the new allocation
            updateStakingPool();
        }
    }

    /**
     * @dev Calculates the pending reward for a user in a given pool.
     * @param _poolId The ID of the pool.
     * @param _user The address of the user.
     * @return The pending reward amount.
     */
    function pendingReward(uint256 _poolId, address _user) external view returns (uint256) {
        // Retrieve the pool information and user information for the given pool ID and user address
        PoolInfo storage pool = poolInfo[_poolId];
        UserInfo storage user = userInfo[_poolId][_user];
        // Initialize the reward token per share with the current value from the pool
        uint256 rewardTokenPerShare = pool.rewardTokenPerShare;
        // Calculate the current LP token supply in the contract for the pool
        uint256 liquidityPoolSupply = pool.liquidityPoolToken.balanceOf(address(this));
        // Check if the current block number is greater than the last reward block for the pool and if there is LP token supply
        if (block.number > pool.lastRewardBlock && liquidityPoolSupply != 0) {
            // Calculate the multiplier based on the time elapsed since the last reward block
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            // Calculate the token reward based on the multiplier, allocation point, and total allocation
            uint256 tokenReward = multiplier.mul(krtRewardsPerBlock).mul(pool.allocationPoint).div(totalAllocation);
            // Update the reward token per share by adding the token reward per LP token
            rewardTokenPerShare = rewardTokenPerShare.add(tokenReward.mul(1e12).div(liquidityPoolSupply));
        }
        // Calculate the user's pending reward by multiplying their amount by the reward token per share, subtracting their pending reward
        return user.amount.mul(rewardTokenPerShare).div(1e12).sub(user.pendingReward);
    }

    /**
     * @dev Stakes tokens in a specified pool and updates the user's pending rewards.
     * @param _poolId The ID of the pool to stake tokens in.
     * @param _amount The amount of tokens to stake.
     */
    function stake(uint256 _poolId, uint256 _amount) public validatePool(_poolId) {
        // Retrieve the pool information and user information for the given pool ID and user address
        PoolInfo storage pool = poolInfo[_poolId];
        UserInfo storage user = userInfo[_poolId][msg.sender];
        // Update the pool information before staking
        updatePool(_poolId);
        // Calculate and distribute any pending rewards to the user
        if (user.amount > 0) {
            // Calculate the pending reward amount
            uint256 pending = user.amount.mul(pool.rewardTokenPerShare).div(1e12).sub(user.pendingReward);
            // Distribute the pending reward if it's greater than 0
            if(pending > 0) {
                safeKibaRewardTokenTransfer(msg.sender, pending);
            }
        }
        // If an amount is specified, transfer the tokens from the user to the contract and update the user's amount
        if (_amount > 0) {
            // Transfer the specified amount of tokens from the user to the contract
            pool.liquidityPoolToken.safeTransferFrom(address(msg.sender), address(this), _amount);
            // Update the user's amount to reflect the new stake
            user.amount = user.amount.add(_amount);
        }
        // Update the user's pending reward based on their new amount
        user.pendingReward = user.amount.mul(pool.rewardTokenPerShare).div(1e12);
        // Emit an event to notify of the deposit
        emit Deposit(msg.sender, _poolId, _amount);
    }

    /**
     * @dev Unstakes tokens from a specified pool and updates the user's pending rewards.
     * @param _poolId The ID of the pool to unstake tokens from.
     * @param _amount The amount of tokens to unstake.
     */
    function unstake(uint256 _poolId, uint256 _amount) public validatePool(_poolId) {
        // Retrieve the pool information and user information for the given pool ID and user address
        PoolInfo storage pool = poolInfo[_poolId];
        UserInfo storage user = userInfo[_poolId][msg.sender];
        // Ensure the user has sufficient amount to unstake
        require(user.amount >= _amount, "withdraw: not good");
        // Update the pool information before unstaking
        updatePool(_poolId);
        // Calculate the user's pending reward
        uint256 pending = user.amount.mul(pool.rewardTokenPerShare).div(1e12).sub(user.pendingReward);
        // Distribute the pending reward if it's greater than 0
        if(pending > 0) {
            safeKibaRewardTokenTransfer(msg.sender, pending);
        }
        // If an amount is specified, transfer the tokens from the contract to the user and update the user's amount
        if(_amount > 0) {
            user.amount = user.amount.sub(_amount);
            pool.liquidityPoolToken.safeTransfer(address(msg.sender), _amount);
        }
        // Update the user's pending reward based on their new amount
        user.pendingReward = user.amount.mul(pool.rewardTokenPerShare).div(1e12);
        // Emit an event to notify of the withdrawal
        emit Withdraw(msg.sender, _poolId, _amount);
    }

    /**
     * @dev Automatically compounds pending rewards for the user in the first pool.
     * This function updates the user's stake amount by adding any pending rewards.
     */
    function autoCompound() public {
        // Retrieve the first pool information and user information for the current user
        PoolInfo storage pool = poolInfo[0];
        UserInfo storage user = userInfo[0][msg.sender];
        // Update the pool information before compounding
        updatePool(0);
        // Check if the user has a positive amount staked
        if (user.amount > 0) {
            // Calculate the pending reward amount
            uint256 pending = user.amount.mul(pool.rewardTokenPerShare).div(1e12).sub(user.pendingReward);
            // If there are pending rewards, add them to the user's stake amount
            if(pending > 0) {
                user.amount = user.amount.add(pending);
            }
        }
        // Update the user's pending reward based on their new amount
        user.pendingReward = user.amount.mul(pool.rewardTokenPerShare).div(1e12);
    }

    function emergencyWithdraw(uint256 _poolId) public {
        PoolInfo storage pool = poolInfo[_poolId];
        UserInfo storage user = userInfo[_poolId][msg.sender];
        pool.liquidityPoolToken.safeTransfer(address(msg.sender), user.amount);

        emit EmergencyWithdraw(msg.sender, _poolId, user.amount);
        
        user.amount = 0;
        user.pendingReward = 0;
    }

    /**
     * @dev Transfers KRT tokens safely to a specified address.
     * This function utilizes the KRTRewardPayment contract to ensure secure transfers.
     * @param _to The address to transfer tokens to.
     * @param _amount The amount of tokens to transfer.
     */
    function safeKibaRewardTokenTransfer(address _to, uint256 _amount) internal {
        // Utilize the KRTRewardPayment contract to transfer KRT tokens
        krtRewardPay.safeKibaRewardTokenTransfer(_to, _amount);
    }

    /**
     * @dev Changes the developer address.
     * This function can only be called by the current developer.
     * @param _dev The new address of the developer.
     */
    function changeDev(address _dev) public {
        // Ensure the caller is the current developer
        require(msg.sender == dev, "Not Authorized");
        // Update the developer address
        dev = _dev;
    }
}