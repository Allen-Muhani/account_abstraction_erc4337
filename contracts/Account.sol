// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";

/**
 * @title a smart contract account.
 * @author
 * @notice
 */
contract Account is IAccount {
    uint public count;
    address public owner;

    /**
     * The constructor used to instantiate the contract.
     * @param _owner the owner/address that deployed the smart contract account.
     */
    constructor(address _owner) {
        owner = _owner;
    }

    // Validates user operation.
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

/**
 * @title used to create smart contract accounts @Account.sol.
 * @author
 * @notice
 */
contract AccountFactory {
    constructor() {}

    /**
     * Creates a smart contract account.
     * @param owner the address deploting the new smart contract account.
     */
    function createAccount(address owner) external returns (address) {
        Account acc = new Account(owner);
        return address(acc);
    }
}
