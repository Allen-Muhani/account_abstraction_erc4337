// NB: AA Errors are errors from the entry point smart contract.

const hre = require("hardhat");

const FACTORY_ADDRESS = "0x9fdaad34a2Af6974e9cCEd8f9E44CD622Db6699c";
const EP_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const PM_ADDRESS = "0xA68DAb77797901C0ec0f53A225E2eB3Eb9643e6f";

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
    sender = "0x" + error.data.slice(-40);
  }

  const code = await hre.ethers.provider.getCode(sender);

  if (code != "0x") {
    initCode = "0x";
  }

  console.log("sender ===>", sender);

  const Account = await hre.ethers.getContractFactory("Account");

  const userOp = {
    sender, //Address of the account smart contract to be used/created .
    nonce: "0x" + (await entryPoint.getNonce(sender, 0)).toString(16),
    initCode,
    callData: Account.interface.encodeFunctionData("execute"),
    paymasterAndData: PM_ADDRESS,

    // use a dummy signature from Alchemy API.
    signature:
      "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c", // generate this from smart contract making it unique for security reasons. (prevents repeat attacks.)
  };


  const rsp = await hre.ethers.provider.send("eth_estimateUserOperationGas", [
    userOp,
    EP_ADDRESS,
  ]);

  console.log(rsp);

  // callGasLimit: 400_000, // OOG means out of gass
  // verificationGasLimit: 800_000,
  // preVerificationGas: 100_000,
  // maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
  // maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),

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
