const hre = require("hardhat");
const fs = require('fs');
const fse = require("fs-extra");
const { verify } = require('../utils/verify')
const { developmentChains } = require('../utils/helper-scripts')


async function main() {
  const deployNetwork = hre.network.name

  const greetingText = "Hello, Hardhat!"
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy(greetingText);

  await greeter.deployed();

  console.log("Greeter deployed to :", greeter.address);
  console.log("Network deployed to :", deployNetwork);

  /* transfer contracts addresses & ABIs to the front-end */
  if (fs.existsSync("../front-end/src")) {
    fs.rmSync("../src/artifacts", { recursive: true, force: true });
    fse.copySync("./artifacts/contracts", "../front-end/src/artifacts");
    fs.writeFileSync('../front-end/src/utils/contracts-config.js', `
    export const contractAddress = "${greeter.address}"
    export const ownerAddress = "${greeter.signer.address}"
    export const networkDeployedTo = "${hre.network.config.chainId}"
    `)
  }

  if (!developmentChains.includes(deployNetwork) && hre.config.etherscan.apiKey[deployNetwork]) {
    console.log("waiting for 6 blocks verification ...")
    await greeter.deployTransaction.wait(6)

    // args represent contract constructor arguments
    const args = [greetingText]
    await verify(greeter.address, args)
  }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
