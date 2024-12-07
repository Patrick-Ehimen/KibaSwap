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
 * @title KRTRewardPay
 * @dev This contract is designed to manage the safe transfer of Kiba Reward Tokens (KRT) for the Kiba ecosystem.
 * 
 * This contract is responsible for securely transferring KRT tokens to specified addresses. It utilizes the AccessControl library
 * to ensure that only authorized managers can initiate transfers. The contract also ensures that transfers do not exceed the available
 * balance of KRT tokens held by the contract.
 * 
 * @author 0xose
 * @version 1.0
 */

pragma solidity ^0.8.20;

import {KibaRewardToken} from '../KibaRewardToken.sol';
import {Ownable} from 'openzeppelin-contracts/contracts/access/Ownable.sol';
import {AccessControl} from 'openzeppelin-contracts/contracts/access/AccessControl.sol';

contract KRTRewardPayment is Ownable, AccessControl {
    KibaRewardToken public krtRewards; // The Kiba Reward Token contract

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    /**
     * @dev Initializes the contract with the KRT rewards token and sets up the manager role.
     * @param _krtRewards The KRT rewards token contract.
     */
    constructor(KibaRewardToken _krtRewards) {
        krtRewards = _krtRewards;
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MANAGER_ROLE, _msgSender());
    }

    /**
     * @dev Transfers KRT tokens safely to a specified address.
     * @param _to The address to transfer tokens to.
     * @param _amount The amount of tokens to transfer.
     */
    function safeKibaRewardTokenTransfer(address _to, uint256 _amount) external {
        require(hasRole(MANAGER_ROLE, _msgSender()), "Not allowed");
        uint256 krtRewardsBalance = krtRewards.balanceOf(address(this));
        if (_amount > krtRewardsBalance){
          krtRewards.transfer(_to, krtRewardsBalance);
        }
        else {
          krtRewards.transfer(_to, _amount);
        }
    }
}