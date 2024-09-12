const hre = require("hardhat");

const ACCOUNT_ADDRESS = "0x61554a3c02d91f4305f0b1b714b3d39ebe5bdacd";

async function main() {
  // Check if count state on the account smart contract is being updated.
  const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
  const count = await account.count();
  console.log("========>", count);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
