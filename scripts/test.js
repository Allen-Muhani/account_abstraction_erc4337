const hre = require("hardhat");

const ACCOUNT_ADDRESS = "0x642b659f1aece194a5b7d08d8795078a538a989a";

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
