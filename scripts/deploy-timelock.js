const hre = require("hardhat");

async function main() {
  const TimeLock = await hre.ethers.getContractFactory("TimeLock");
  const timeLock = await TimeLock.deploy(0, ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"], ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]);

  await timeLock.deployed();

  console.log(
    `TimeLock Contract succesfully deployed to : ${timeLock.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});