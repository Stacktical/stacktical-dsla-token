// import { transferContractOwnershipGanache } from "./transferContractOwnershipGanache.js";
import {
  // transferProxyOwnershipGanache,
  // transferProxyOwnershipLedgerGanache,
} from "./transferProxyOwnershipGanache.js";
// import {
//   transferContractOwnershipMainnet,
//   printContractOwnershipMainnet,
// } from "./transferContractOwnershipMainnet.js";
// import {
//   transferProxyOwnershipMainnet,
//   printProxyOwnershipMainnet,
  transferProxyOwnershipLedgerMainnet,
// } from "./transferProxyOwnershipMainnet.js";

// transferContractOwnershipGanache()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     // Deal with the fact the chain failed
//     console.log(err);
//   });

// transferProxyOwnershipGanache()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     // Deal with the fact the chain failed
//     console.log(err);
//   });

// transferContractOwnershipMainnet()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     // Deal with the fact the chain failed
//     console.log(err);
//   });

// printContractOwnershipMainnet()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     // Deal with the fact the chain failed
//     console.log(err);
//   });

// transferProxyOwnershipMainnet()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     // Deal with the fact the chain failed
//     console.log(err);
//   });

// printProxyOwnershipMainnet()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     // Deal with the fact the chain failed
//     console.log(err);
//   });

// transferProxyOwnershipLedgerGanache()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     // Deal with the fact the chain failed
//     console.log(err);
//   });

transferProxyOwnershipLedgerMainnet()
  .then(() => {
    console.log("it worked!")
    process.exit(0);
  })
  .catch((err) => {
    // Deal with the fact the chain failed
    console.log(err);
  });
