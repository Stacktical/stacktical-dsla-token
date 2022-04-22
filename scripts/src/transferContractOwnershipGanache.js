import * as fs from "fs";
import { ethers } from "ethers";
import ganache from "ganache";

let jsonFile = "./abis/DSLA_v0.json";
let abi = JSON.parse(fs.readFileSync(jsonFile)).abi;
const singerAddress = "0x5f6ae9f5e5d9858d4b5ca4aec76d7f3a23f77ada";
const contractAddress = "0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe";
const targetOwnerAddress = "0x1c25cDD83Cd7106C3dcB361230eC9E6930Aadd30";

const options = {
  namespace: {
    chain: {
      chainID: 1,
    },
    miner: {
      defaultGasPrice: 1,
      blockGasLimit: 100000000000000,
      callGasLimit: 100000000000000,
    },
  },
  fork: {
    network: "mainnet",
  },
  wallet: {
    unlockedAccounts: [singerAddress],
  },
};

const provider = new ethers.providers.Web3Provider(ganache.provider(options));
const signer = provider.getSigner(singerAddress);

export async function transferContractOwnershipGanache() {
  const contract = new ethers.Contract(contractAddress, abi, signer);

  let owner = await contract.owner();
  console.log("owner: ", owner);

  await contract.transferOwnership(targetOwnerAddress);

  owner = await contract.owner();
  console.log("owner: ", owner);
}
