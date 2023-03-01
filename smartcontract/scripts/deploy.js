const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });


async function main() {

  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so exchangeContract here is a factory for instances of our Exchange contract.
  */
  const priceContract = await ethers.getContractFactory("SmartContract");

  // here we deploy the contract
  const deployedPriceContract = await priceContract.deploy();
  await deployedPriceContract.deployed();

  // print the address of the deployed contract
  console.log("SmartContract  Address:", deployedPriceContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


//  for polygon
  // 0xBDf60BabE092d59ec5BE1F6887Ae296cCaB71E55