import { TestHelper } from 'zos';
import assertRevert from './helpers/assertRevert';

const DSLA = artifacts.require('DSLA_v0');

const accounts = web3.eth.accounts;
const DSLAOwner = accounts[5]

const name = 'DSLA';
const ticker = 'DSLA';
const decimals = 18;

// Tokenbits supply = 10 billions * 10^18 = 1 * 10^28 = 10000000000000000000000000000
const initialSupply = 10000000000000000000000000000;

// Dec 31th 2018 8AM GMT
const unlockDate = 1546243200;

contract('DSLA', function ([_, owner]) {
  beforeEach(async function () {
    this.project = await TestHelper({ from: owner });
  })

  it('should correctly initialize contracts', async function () {
    const proxy = await this.project.createProxy(DSLA, { initArgs: [DSLAOwner] });

    // Initializing ERC20Detailed
    assert.equal(await proxy.name({from: DSLAOwner}), name);
    assert.equal(await proxy.symbol({from: DSLAOwner}), ticker);
    assert.equal(await proxy.decimals({from: DSLAOwner}), decimals);

    // Initializing Ownable
    assert.equal(await proxy.owner({from: DSLAOwner}), DSLAOwner);

    // Initializing TimeLockable
    assert.equal(await proxy.unlockDate({from: DSLAOwner}), unlockDate);

    // Minting tokens
    assert.equal(await proxy.totalSupply({from: DSLAOwner}), initialSupply);
    assert.equal(await proxy.balanceOf(DSLAOwner, {from: DSLAOwner}), initialSupply);
  })

  it('should be possible only for owner to transfer ownership', async function () {
    const proxy = await this.project.createProxy(DSLA, { initArgs: [DSLAOwner] });

    const newOwner = accounts[2]
    assert.notEqual(newOwner, DSLAOwner);

    assertRevert(proxy.transferOwnership(newOwner, {from: newOwner}));

    assert.equal(await proxy.owner({from: DSLAOwner}), DSLAOwner);
    await proxy.transferOwnership(newOwner, {from: DSLAOwner});
    assert.equal(await proxy.owner({from: DSLAOwner}), newOwner);
  })

  it('should be possible only for owner to set crowdsale address', async function () {
    const proxy = await this.project.createProxy(DSLA, { initArgs: [DSLAOwner] });

    const notOwner = accounts[2]
    assert.notEqual(notOwner, DSLAOwner);

    const oldCrowdsaleAddress = '0x0000000000000000000000000000000000000000'
    const newCrowdsaleAddress = accounts[4]

    assert.notEqual(newCrowdsaleAddress, oldCrowdsaleAddress);

    assertRevert(proxy.setCrowdsaleAddress(newCrowdsaleAddress, {from: notOwner}));

    assert.equal(await proxy.crowdsaleAddress({from: DSLAOwner}), oldCrowdsaleAddress);
    await proxy.setCrowdsaleAddress(newCrowdsaleAddress, {from: DSLAOwner});
    assert.equal(await proxy.crowdsaleAddress({from: DSLAOwner}), newCrowdsaleAddress);
  })

  it('should be possible only for owner and crowdsale address to transfer during time lock period', async function () {
    // TODO
  })
})
