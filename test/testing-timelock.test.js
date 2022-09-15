const { expect } = require("chai");
const hre = require("hardhat");

describe('TimeLock Contract', function () {
  before(async function () {
    this.TimeLock = await hre.ethers.getContractFactory('TimeLock');
  });

  beforeEach(async function () {
    this.timeLock = await this.TimeLock.deploy(0, ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"], ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]);
    await this.timeLock.deployed();
  });

  describe('deployment', async () => {
    it('Get min delay', async function () {
      const minDelay = await this.timeLock.getMinDelay();
      console.log(`Min Delay :`, minDelay.toString());
      expect(await this.timeLock.getMinDelay()).to.equal(minDelay);
    });
  });
});