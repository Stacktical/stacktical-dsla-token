## Official DSLA Token Address

**Mainnet**
`0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe`

Please disregard any other address.

## Official DSLA ABI

The official DSLA ABI is available in the build folder of the repository, at `build/contracts/DSLA_v0.json`.
Please import it to your project to use the official functions of the DSLA token.

## OpenZeppelin SDK Token Upgradeability

We use the OpenZeppelin SDK to apply security patches to the DSLA token logic, while preserving its immutability.

This means the DSLA is seperated in two main parts:  
- The implementation logic of the DSLA token at a versionned address
- An OpenZeppelin proxy at the `0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe` address

In other words, `0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe` is both the official DSLA token address and the OpenZeppelin proxy address. Any transaction to `0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe` will be automatically and transparently forwarded to the implementation logic.

For more information about the upgradeability capability of the SDK, please refer to the official documentation [here](https://docs.openzeppelin.com/sdk/2.5/writing-contracts).

## DSLA Integration (e.g. On Exchanges)

The OpenZeppelin SDK is not supported by Etherscan (yet), so you cannot access the DSLA token functions from our verified [Etherscan](https://etherscan.io/token/0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe) page.

To integrate DSLA, you need to add the official [DSLA ABI](https://github.com/Stacktical/stacktical-dsla-token/blob/master/build/contracts/DSLA_v0.json) to your project, and send your transactions to the `0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe` official DSLA token address.


## Deploy Token Contract

`zos add MyUpgradeableToken`

`zos push -n local --deploy-dependencies`

`zos create MyUpgradeableToken --args ARG1,ARG2 -n local`

## Update Token Logic

`zos push -n local --deploy-dependencies`

`zos update MyUpgradeableToken --args ARG1,ARG2 -n local`

## Run tests

`NODE_ENV=test truffle test`
