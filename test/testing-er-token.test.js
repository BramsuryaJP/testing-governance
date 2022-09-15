const { expect } = require("chai");
const hre = require("hardhat");

describe('Er Token Contract', function () {
  before(async function () {
    this.ErToken = await hre.ethers.getContractFactory('ErToken');
  });

  beforeEach(async function () {
    this.erToken = await this.ErToken.deploy();
    await this.erToken.deployed();

    this.tokenDecimals = await this.erToken.decimals();

    const tokenSigners = await hre.ethers.getSigners();

    this.tokenOwnerAddress = tokenSigners[0].address;
    this.tokenRecipientAddress = tokenSigners[1].address;

    this.tokenSignerContract = this.erToken.connect(tokenSigners[1]);
  });

  describe('deployment', async () => {
    it('Creates a token with a name', async function () {
      expect(await this.erToken.name()).to.exist;
    });
  
    it('Creates a token with a symbol', async function () {
      expect(await this.erToken.symbol()).to.exist;
    });
  });
});