// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";

contract Account is IAccount {
    constructor() {}

    function validateUserOp(
        UserOperation calldata,
        bytes32,
        uint256
    ) external pure override returns (uint256 validationData) {
        return 0;
    }
}
