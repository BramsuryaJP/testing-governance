const { expect } = require("chai");
const hre = require("hardhat");

describe('Er Token Contract', function () {
  let erToken

  before(async function () {
    this.ErTokenGovernor = await hre.ethers.getContractFactory('ErTokenGovernor');
  });

  beforeEach(async function () {

    const ErToken = await hre.ethers.getContractFactory("ErToken");
    erToken = await ErToken.deploy();

    this.erTokenGovernor = await this.ErTokenGovernor.deploy();
    await this.erTokenGovernor.deployed();

    const tokenSigners = await hre.ethers.getSigners();

    this.tokenOwnerAddress = tokenSigners[0].address;
    this.tokenRecipientAddress = tokenSigners[1].address;

    this.tokenSignerContract = this.erTokenGovernor.connect(tokenSigners[1]);
  });

  describe('deployment', async () => {
    it('Get voting delay', async function () {
      const getVotingDelay = await this.erTokenGovernor.votingDelay();
      console.log(getVotingDelay);
      expect(await this.erTokenGovernor.votingDelay()).to.equal(getVotingDelay);
    });

    it('Get voting period', async function () {
      const getVotingPeriod = await this.erTokenGovernor.votingPeriod();
      console.log(getVotingPeriod);
      expect(await this.erTokenGovernor.votingPeriod()).to.equal(getVotingPeriod);
    });
  });

  describe('proposal fuction', async () => {
    it('Should create a proposal', async function() {
      const targets = [erToken.address];
      const values = [0];
      const ABI = ["function mint(address to, uint256 amount)"];
      const iface = new ethers.utils.Interface(ABI);
      const address = iface.encodeFunctionData("mint", ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8", hre.ethers.utils.parseEther("20.0")])
      console.log(address);
      const description = "mint to second account"
      expect(await this.erTokenGovernor.propose(targets, values, [address], description))
    })
  });
});