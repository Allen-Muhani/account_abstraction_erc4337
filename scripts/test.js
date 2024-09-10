const hre = require("hardhat");

const ACCOUNT_ADDRESS = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";

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
