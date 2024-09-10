// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@account-abstraction/contracts/interfaces/IPaymaster.sol";

/**
 * @title Validates and pays for user operation gass fees in the blockchain.
 * Can also be a server willing to pay gass fees for user operations.
 * @author
 * @notice
 */
contract Paymaster is IPaymaster {
    constructor() {}

    function validatePaymasterUserOp(
        UserOperation calldata,
        bytes32,
        uint256
    ) external pure returns (bytes memory context, uint256 validationData) {
        context = new bytes(0);
        validationData = 0;
    }

    // function postOp(
    //     PostOpMode mode,
    //     bytes calldata context,
    //     uint256 actualGasCost,
    //     uint256 actualUserOpFeePerGas
    // ) external {}

    function postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost
    ) external override {}
}
