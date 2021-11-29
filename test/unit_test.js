const { expect } = require("chai");
const { ethers } = require("hardhat");
const { assert } = require("console");


const transformStructOutput = (structData) => {
  
  return {

    tokenAddress: structData.token.toString(),
    totalTokens: structData.totalTokens.toNumber(),
    totalAmount: ethers.utils.formatEther(structData.totalAmount),
    boolValue: structData.taskComplete,
         
  };
  
};



before(async function () {

  [owner, addr1, addr2, addr3] = await ethers.getSigners();          
  const Token = await ethers.getContractFactory('Token', owner);
  token1 = await Token.deploy();
  decimals = await token1.decimals();
  
  EpicContract = await ethers.getContractFactory('EpicContract', owner);
  epicContract = await EpicContract.deploy(token1.address);
  await epicContract.deployed();

});

describe("Minting Local Tokens", function () { 

  it("Should check owner balance", async function () { 

    
    ownerBalance = (await token1.balanceOf(owner.address)) / 10**decimals; 
    expect(ownerBalance).to.be.equal(1000000);
    
  });

});

describe("FUNCTION_NAME() ", function () { 

  it("Should check atleast one thing in a function", async function () { 



  });

  it("Should fail because owner is not making the call", async function () { 

    // await expect(epicContract.connect(addr1).function()).to.be.revertedWith('Ownable: caller is not the owner');

  });

  it("should record event", async function () { 

    // await expect(epicContract.connect(addr1).setFunction(params))
    // .to.emit(epicContract, 'SomeAwesomeEvent')
    // .withArgs(addr1.address, params);

  });

  
  it("should test ether balance", async function() {

      const balanceBefore = await ethers.provider.getBalance(owner.address);
      //console.log(ethers.utils.formatEther(balanceBefore));
  
      // do some function that transfer eth
      
      // await expect(epicContract.connect(owner).withdraw()).to.not.be.reverted;
  
      const balanceAfter = await ethers.provider.getBalance(owner.address);
      //console.log(ethers.utils.formatEther(balanceAfter));
      expect(balanceAfter).to.be.equal(balanceBefore);
      

  });

  it("should approve eth, check allowance and transfer", async function () {
      
    await token1.connect(owner).approve(addr1.address, ethers.utils.parseEther("100"));
    // console.log(ethers.utils.formatEther(await token1.allowance(owner.address ,auctionContract.address)));
    let allowance = await token1.allowance(owner.address ,addr1.address);
    await token1.connect(addr1).transferFrom(owner.address, addr1.address, allowance);
    await token1.connect(addr1).transfer(owner.address, ethers.utils.parseEther("50.0"));

  });

  it("should increase time", async function() {

    await ethers.provider.send('evm_increaseTime', [1800]);
    await ethers.provider.send('evm_mine');
    // Math.floor(Date.now() / 1000 + x) get cuurent time in js

  });

  it("should check payable function", async function() {

    // await contract.connect(addr1).someFunction(params, params2, {value: ethers.utils.parseEther(cost)});

  });

  it("should check allowance", async function(){

    await token1.connect(owner).approve(epicContract.address, ethers.utils.parseEther("100"));
    allowance = await epicContract.checkAllowance(owner.address);
    console.log(ethers.utils.formatEther(allowance));
    
  });

  it("should check transferFrom", async function(){

    await expect(epicContract.transferApprovedTokens(owner.address, allowance)).to.not.be.reverted;

  });

  it("should check transferTokens", async function(){

    await expect(epicContract.connect(owner).transferTokens(addr1.address, ethers.utils.parseEther("100"))).to.not.be.reverted;

  });

  it("should check token balance of account", async function(){

    let account_balance = ethers.utils.formatEther(await epicContract.connect(addr1).checkBalance(addr1.address));
    console.log(account_balance);

  });

  it("should check total supply of token", async function(){

    totalSupply = (ethers.utils.formatEther(await epicContract.connect(addr1).checkTotalSupply()));
    console.log(totalSupply);
    
  });


});