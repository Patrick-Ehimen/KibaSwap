// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "dependencies/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title RewardToken
 * @dev ERC20 token with minting capabilities and initial distribution.
 */
contract RewardToken is ERC20, Ownable(msg.sender) {
    /**
     * @dev Constructor that mints an initial supply and sends 50% to the reward wallet.
     * @param name Token name
     * @param symbol Token symbol
     * @param initialSupply Initial supply of tokens
     * @param rewardWallet Address to receive 50% of the initial supply
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address rewardWallet
    ) ERC20(name, symbol) {
        require(rewardWallet != address(0), "Invalid reward wallet address");

        // Mint the initial supply to the deployer
        _mint(msg.sender, initialSupply);

        // Calculate 50% of the initial supply
        uint256 halfSupply = initialSupply / 2;

        // Transfer 50% to the reward wallet
        _transfer(msg.sender, rewardWallet, halfSupply);
    }

    /**
     * @dev Function to mint tokens.
     * @param to The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
