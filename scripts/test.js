const hre = require("hardhat");

const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  const code = await hre.ethers.provider.getCode(EP_ADDRESS);
  console.log(code);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
