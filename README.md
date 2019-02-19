


`ganache-cli --port 9545`

`truffle console --network local`

*Deploy contract*

`zos add MyUpgradeableToken`

`zos push -n local --deploy-dependencies`

`zos create MyUpgradeableToken --args ARG1,ARG2 -n local`

*Update*

`zos push -n local --deploy-dependencies`

`zos update MyUpgradeableToken --args ARG1,ARG2 -n local`

*Test*

`NODE_ENV=test truffle test`


## Addressess

**Ropsten**
`0x446e5681cb934f5ca9f40262e337e77d16134e66`

**Mainnet**
`0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe`
