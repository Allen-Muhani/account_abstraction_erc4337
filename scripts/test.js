const hre = require("hardhat");

const ACCOUNT_ADDRESS = "0xbf9fBFf01664500A33080Da5d437028b07DFcC55";

async function main() {
  const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
  const count = await account.count();
  console.log("========>", count);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
