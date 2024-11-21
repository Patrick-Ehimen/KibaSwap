// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "dependencies/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Simple ERC20 Token Contract
contract KibaEC20Tokens is ERC20 {
    /// @notice Constructor to initialize the KibaEC20Tokens contract
    /// @dev Mints the initial supply of tokens and assigns them to the deployer
    /// @param name The name of the token
    /// @param symbol The symbol of the token
    /// @param initialSupply The initial supply of tokens to be minted
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}
