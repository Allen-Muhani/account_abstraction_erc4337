// NB: AA Errors are errors from the entry point smart contract.

const hre = require("hardhat");

const EP_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const PM_ADDRESS = "0xA68DAb77797901C0ec0f53A225E2eB3Eb9643e6f";

async function main() {
  const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

  // pre-fund the entry point for the contract call.
  //   We can check for the balance of the address if to see if there is enough funds in the entry point to check for the gass fees
  // call balanceOf(address) pass the address of the smart account.
  await entryPoint.depositTo(PM_ADDRESS, {
    value: hre.ethers.parseEther("0.09"),
  });

  console.log("deposit was successful.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
