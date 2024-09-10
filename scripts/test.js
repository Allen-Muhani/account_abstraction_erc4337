const hre = require("hardhat");

const ACCOUNT_ADDRESS = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PM_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  // Check if count state on the account smart contract is being updated.
  const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
  const count = await account.count();
  console.log("========>", count);

  // check the smart account balance on the paymaster.
  const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
  console.log(
    `Account balance for smart account ${ACCOUNT_ADDRESS} is ${await ep.balanceOf(
      ACCOUNT_ADDRESS
    )}`
  );
  console.log(
    `Paymaster balance for ${PM_ADDRESS} is ${await ep.balanceOf(PM_ADDRESS)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
