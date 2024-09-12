// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

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
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256
    ) external view override returns (uint256 validationData) {
        address recovered = ECDSA.recover(
            ECDSA.toEthSignedMessageHash(userOpHash),
            userOp.signature
        );

        return owner == recovered ? 0 : 1;
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
        bytes32 salt = bytes32(uint256(uint160(owner))); //casting
        bytes memory bytecode = abi.encodePacked(
            type(Account).creationCode,
            abi.encode(owner) // must encode the owner address as a pram
        );

        // Checks if the smart account(Account Smart Contract)
        //is already deployed hence no need of Create2.deploy
        address addr = Create2.computeAddress(salt, keccak256(bytecode));
        if (addr.code.length > 0) {
            // address.code returns the byte code of the contract in that address.
            return addr;
        }

        // deploy the contract hence adding the bytcode in the address.
        return deploy(0, salt, bytecode);
    }

    function deploy(
        uint256 amount,
        bytes32 salt,
        bytes memory bytecode
    ) internal returns (address) {
        address addr;

        //  To prevent this error (ProviderError: factory uses banned opcode: SELFBALANCE)
           // Do not check smart account balance.
        // require(
        //     address(this).balance >= amount,
        //     "Create2: insufficient balance"
        // );
        require(bytecode.length != 0, "Create2: bytecode length is zero");
        assembly {
            addr := create2(amount, add(bytecode, 0x20), mload(bytecode), salt)
        }
        require(addr != address(0), "Create2: Failed on deploy");
        return addr;
    }
}
