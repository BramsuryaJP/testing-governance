const hre = require("hardhat");

async function main() {
  const ErToken = await hre.ethers.getContractFactory("ErToken");
  const erToken = await ErToken.deploy();

  await erToken.deployed();

  console.log(
    `ErToken Contract succesfully deployed to : ${erToken.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});