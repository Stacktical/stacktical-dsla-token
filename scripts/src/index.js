import { transferContractOwnershipGanache } from "./transferContractOwnershipGanache.js";
import { transferProxyOwnershipGanache } from "./transferProxyOwnershipGanache.js";

// transferContractOwnershipGanache()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     // Deal with the fact the chain failed
//     console.log(err);
//   });

transferProxyOwnershipGanache()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    // Deal with the fact the chain failed
    console.log(err);
  });
