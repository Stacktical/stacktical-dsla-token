


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
