require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_ETHERSCAN_API_KEY = process.env.RINKEBY_ETHERSCAN_API_KEY
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      }
    ],
  },
  networks: {
    private: {
      url: 'http://143.110.190.194:8546',
      chainId: 135790,
      accounts: ["f75a852065dc630d5ebd51eb83891ed22534982b5b02c72877b2a296edea647d"]
    },
  }
};
