// solidity is synchronous (line by line generally)
// js is async
// // promise in async technique : pending, fullfilled, rejected

// dependencies
const ethers = require("ethers");
const fs = require("fs");

// aync function main() {}
const main = async () => {
  // endpoint to connect: http://127.0.0.1:8545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "0x055719c676b60f2b7f3e874f33e468f93b3d5b3e3a3fb7af711456fe54597079",
    provider
  );

  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", "utf8");

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, be patient.");
  const contract = await contractFactory.deploy();
  console.log(contract);
};

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
