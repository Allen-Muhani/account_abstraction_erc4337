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

    /**
     * payment validation: check if paymaster agrees to pay.
     * Must verify sender is the entryPoint.
     * Revert to reject this request.
     * Note that bundlers will reject this method if it changes the state, unless the paymaster is trusted (whitelisted)
     * The paymaster pre-pays using its deposit, and receive back a refund after the postOp method returns.
     * @param userOp the user operation
     * @param userOpHash hash of the user's request data.
     * @param maxCost the maximum cost of this transaction (based on maximum gas and gas price from userOp)
     * @return context value to send to a postOp
     *      zero length to signify postOp is not required.
     * @return validationData signature and time-range of this operation, encoded the same as the return value of validateUserOperation
     *      <20-byte> sigAuthorizer - 0 for valid signature, 1 to mark signature failure,
     *         otherwise, an address of an "authorizer" contract.
     *      <6-byte> validUntil - last timestamp this operation is valid. 0 for "indefinite"
     *      <6-byte> validAfter - first timestamp this operation is valid
     *      Note that the validation code cannot use block.timestamp (or block.number) directly.
     */
    function validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 maxCost
    ) external pure returns (bytes memory context, uint256 validationData) {
        // first 20 bytes: the paymanster address.
        //  timePeriod : time frame for the validity of the user operation/ in which which the paymaster is willing to pay for the operation
        userOp.paymasterAndData;

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
