const hre = require("hardhat");

async function main() {
  const ep = await hre.ethers.deployContract("EntryPoint");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
