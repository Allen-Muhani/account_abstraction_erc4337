// NB: AA Errors are errors from the entry point smart contract.

const hre = require("hardhat");

const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PM_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

  // pre-fund the entry point for the contract call.
  //   We can check for the balance of the address if to see if there is enough funds in the entry point to check for the gass fees
  // call balanceOf(address) pass the address of the smart account.
  await entryPoint.depositTo(PM_ADDRESS, {
    value: hre.ethers.parseEther("0.2"),
  });

  console.log("deposit was successful.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
