// NB: AA Errors are errors from the entry point smart contract.

const hre = require("hardhat");

const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PM_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();

  let initCode =
    FACTORY_ADDRESS +
    AccountFactory.interface
      .encodeFunctionData("createAccount", [address0])
      .slice(2);

  let sender;
  try {
    await entryPoint.getSenderAddress(initCode);
  } catch (error) {
    sender = "0x" + error.data.data.slice(-40);
  }

  const code = await hre.ethers.provider.getCode(sender);

  if (code != "0x") {
    initCode = "0x";
  }

  console.log("sender ===>", sender);

  const Account = await hre.ethers.getContractFactory("Account");

  const userOp = {
    sender, //Address of the account smart contract to be used/created .
    nonce: await entryPoint.getNonce(sender, 0),
    initCode,
    callData: Account.interface.encodeFunctionData("execute"),
    callGasLimit: 400_000, // OOG means out of gass
    verificationGasLimit: 800_000,
    preVerificationGas: 100_000,
    maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
    maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
    paymasterAndData: PM_ADDRESS,
    signature: "0x", // generate this from smart contract making it unique for security reasons. (prevents repeat attacks.)
  };

  const userOpHash = await entryPoint.getUserOpHash(userOp);
  console.log("USER OP HASH => ", userOpHash);
  // set signature generated from user op data in the EP smart contract.
  userOp.signature = await signer0.signMessage(hre.ethers.getBytes(userOpHash));

  const tx = await entryPoint.handleOps([userOp], address0);
  const receipt = await tx.wait();

  console.log(receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
