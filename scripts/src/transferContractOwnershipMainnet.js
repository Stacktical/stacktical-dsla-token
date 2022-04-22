import 'dotenv/config' 
import * as fs from "fs";
import { ethers } from "ethers";

let jsonFile = "./abis/DSLA_v0.json";
let abi = JSON.parse(fs.readFileSync(jsonFile)).abi;

const provider = new ethers.providers.Web3Provider(process.env.PROVIDER);

export async function transferContractOwnershipMainnet() {
  const fromWallet = new ethers.Wallet(
    process.env.FROM_OWNER_PRIVATE_KEY,
    provider
  );

  const contract = new ethers.Contract(
    process.env.DSLA_TOKEN_CONTRACT_ADDRESS,
    abi,
    fromWallet
  );

  let result = await contract.transferOwnership(process.env.TO_OWNER_PUB_KEY);
  console.log(result);
}

export async function printContractOwnershipMainnet() {
  const contract = new ethers.Contract(
    process.env.DSLA_TOKEN_CONTRACT_ADDRESS,
    abi,
    provider
  );

  let owner = await contract.owner();
  console.log("owner: ", owner);
}
