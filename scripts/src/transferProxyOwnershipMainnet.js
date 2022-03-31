import 'dotenv/config' 
import * as fs from "fs";
import { ethers } from "ethers";
import { LedgerSigner } from "@anders-t/ethers-ledger";

let jsonFile = "./abis/OZProxy.json";
let abi = JSON.parse(fs.readFileSync(jsonFile)).abi;

const provider = new ethers.providers.Web3Provider(process.env.RPC_PROVIDER);

export async function transferProxyOwnershipLedgerMainnet() {
  // SETUP
  const path = process.env.FROM_ADMIN_LEDGER_PATH;
  const signer = new LedgerSigner(provider, "hid", path);
  let contract = new ethers.Contract(
    process.env.PROXY_CONTRACT_ADDRESS,
    abi,
    signer
  );

  // CHANGE ADMIN
  let result = await contract.changeAdmin(process.env.TO_ADMIN_PUB_KEY);
  console.log(result);
}

export async function transferProxyOwnershipMainnet() {
  //SETUP
  const fromWallet = new ethers.Wallet(
    process.env.FROM_ADMIN_PRIVATE_KEY,
    provider
  );
  let contract = new ethers.Contract(
    process.env.PROXY_CONTRACT_ADDRESS,
    abi,
    fromWallet
  );

  // CHANGE ADMIN
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
