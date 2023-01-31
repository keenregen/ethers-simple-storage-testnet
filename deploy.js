// ethers.js with testnet

// dependencies
const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

// main function
const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.rpcPoint);

  const wallet = new ethers.Wallet(process.env.privateKey, provider);

  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf-8");

  const binary = fs.readFileSync(
    "SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // deploying a contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, be patient.");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait("1");
  console.log(`Contract Address: ${contract.address}`);

  // interacting with contract
  // retrieve the current fav num
  let currentFavNum = await contract.retrieve();
  console.log(`Current Fav Number: ${currentFavNum.toString()}`);
  // store a new fav num
  const storeResp = await contract.store("11111");
  const receipt2 = await storeResp.wait("1");
  // console.log(receipt2);

  currentFavNum = await contract.retrieve();
  console.log(`The Fav Number now: ${currentFavNum.toString()}`);
};

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
