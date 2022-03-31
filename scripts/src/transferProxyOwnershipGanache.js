import * as fs from "fs";
import { ethers } from "ethers";
import ganache from "ganache";
import { LedgerSigner } from "@ethersproject/hardware-wallets";

let jsonFile = "./abis/OZProxy.json";
let abi = JSON.parse(fs.readFileSync(jsonFile)).abi;
const fromAdminAddress = "0x681b7fD9F8B960e5e1327079C2b8eD7142C321FC";
const contractAddress = "0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe";
const toAdminAddress = "0x1c25cDD83Cd7106C3dcB361230eC9E6930Aadd30";

export async function transferProxyOwnershipGanache() {
  const options = {
    namespace: {
      chain: {
        chainID: 1,
      },
    },
    fork: {
      network: "mainnet",
    },
    wallet: {
      unlockedAccounts: [fromAdminAddress, toAdminAddress],
    },
  };
  const provider = new ethers.providers.Web3Provider(ganache.provider(options));
  const fromSigner = provider.getSigner(fromAdminAddress);
  const toSigner = provider.getSigner(toAdminAddress);

  let contract = new ethers.Contract(contractAddress, abi, fromSigner);

  let admin = await contract.admin();
  console.log("Current ProxyAdmin: ", admin);

  await contract.changeAdmin(toAdminAddress);

  contract = contract.connect(toSigner);

  admin = await contract.admin();
  console.log("Transferred ownership of ProxyAdmin to: ", admin);
}

export async function transferProxyOwnershipLedgerGanache() {
  // SETUP
  const options = {
    namespace: {
      chain: {
        chainID: 1,
      },
    },
    fork: {
      network: "mainnet",
    },
    wallet: {
      unlockedAccounts: [toAdminAddress],
    },
  };
  const path = "/44'/60'/0'/1/0";
  const fromSigner = new LedgerSigner(provider, "hid", path);
  const provider = new ethers.providers.Web3Provider(ganache.provider(options));
  let contract = new ethers.Contract(contractAddress, abi, fromSigner);

  // PRINT CURRENT ADMIN
  let admin = await contract.admin();
  console.log("Current ProxyAdmin: ", admin);

  // CHANGE ADMIN
  await contract.changeAdmin(toAdminAddress);

  // PRINT NEW ADMIN
  const toSigner = provider.getSigner(toAdminAddress);
  contract = contract.connect(toSigner);
  admin = await contract.admin();
  console.log("Transferred ownership of ProxyAdmin to: ", admin);
}
