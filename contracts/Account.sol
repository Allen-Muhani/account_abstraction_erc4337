// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";

contract Account is IAccount {
    uint public count;
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function validateUserOp(
        UserOperation calldata,
        bytes32,
        uint256
    ) external pure override returns (uint256 validationData) {
        return 0;
    }

    function execute() external {
        count++;
    }
}


contract AccountFactory {
    constructor() {
        
    }
}
