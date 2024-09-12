require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "arb",
  networks: {
    arb: {
      url: "https://arb-sepolia.g.alchemy.com/v2/XXllimeGQ8nOIvkzVQLRsuemjMVAJRQl",
      accounts: [
        "a2a0e536abc85205014aef3d152561ab95fbf378643cef847f18e8a924ba2488",
      ],
    },
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};
