const hre = require("hardhat");

async function main() {
  const [signer0] = await hre.ethers.getSigners();

  const signature = signer0.signMessage(
    hre.ethers.getBytes(hre.ethers.id("wee"))
  );

  // Check if count state on the account smart contract is being updated.
  const Test = await hre.ethers.getContractFactory("Test");
  const test = await Test.deploy(signature);

  console.log("address => ", await signer0.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
