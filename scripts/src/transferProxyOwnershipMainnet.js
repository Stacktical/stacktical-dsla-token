require("dotenv").config();
import * as fs from "fs";
import { ethers } from "ethers";

let jsonFile = "./abis/OZProxy.json";
let abi = JSON.parse(fs.readFileSync(jsonFile)).abi;

const provider = new ethers.providers.Web3Provider(process.env.PROVIDER);

export async function transferProxyOwnershipMainnet() {
  const fromWallet = new ethers.Wallet(
    process.env.FROM_ADMIN_PRIVATE_KEY,
    provider
  );

  let contract = new ethers.Contract(
    process.env.PROXY_CONTRACT_ADDRESS,
    abi,
    fromWallet
  );

  let result = await contract.changeAdmin(process.env.TO_ADMIN_PUB_KEY);
  console.log(result);
}

export async function printProxyOwnershipMainnet() {
  const toWallet = new ethers.Wallet(
    process.env.TO_ADMIN_PRIVATE_KEY,
    provider
  );

  let contract = new ethers.Contract(
    process.env.PROXY_CONTRACT_ADDRESS,
    abi,
    toWallet
  );

  let admin = await contract.admin();
  console.log("Transferred ownership of ProxyAdmin to: ", admin);
}
