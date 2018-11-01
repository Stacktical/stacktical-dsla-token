import { TestHelper } from 'zos';
import assertRevert from './helpers/assertRevert';
import { increaseTimeTo, duration } from './helpers/increaseTime';

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

    const newOwner = accounts[2];
    assert.notEqual(newOwner, DSLAOwner);

    // Not current owner cannot transfer ownership
    assertRevert(proxy.transferOwnership(newOwner, {from: newOwner}));

    // Current owner transfers ownership
    assert.equal(await proxy.owner({from: DSLAOwner}), DSLAOwner);
    await proxy.transferOwnership(newOwner, {from: DSLAOwner});
    assert.equal(await proxy.owner({from: DSLAOwner}), newOwner);
  })

  it('should be possible only for owner to set crowdsale address', async function () {
    const proxy = await this.project.createProxy(DSLA, { initArgs: [DSLAOwner] });

    const notOwner = accounts[2];
    assert.notEqual(notOwner, DSLAOwner);

    const oldCrowdsaleAddress = '0x0000000000000000000000000000000000000000';
    const newCrowdsaleAddress = accounts[4];

    assert.notEqual(newCrowdsaleAddress, oldCrowdsaleAddress);

    // Not owner cannot set crowdsale address
    assertRevert(proxy.setCrowdsaleAddress(newCrowdsaleAddress, {from: notOwner}));

    // Owner can set new crowdsale address
    assert.equal(await proxy.crowdsaleAddress({from: DSLAOwner}), oldCrowdsaleAddress);
    await proxy.setCrowdsaleAddress(newCrowdsaleAddress, {from: DSLAOwner});
    assert.equal(await proxy.crowdsaleAddress({from: DSLAOwner}), newCrowdsaleAddress);
  })

  it('should be possible only for owner and crowdsale address to transfer during time lock period', async function () {
    const proxy = await this.project.createProxy(DSLA, { initArgs: [DSLAOwner] });

    const transferAmount = 5000000000;
    const crowdsaleAddress = accounts[2];
    const recipient = accounts[3];

    // Set crowdsale address
    await proxy.setCrowdsaleAddress(crowdsaleAddress, {from: DSLAOwner});
    assert.equal(await proxy.crowdsaleAddress({from: DSLAOwner}), crowdsaleAddress);

    // Check initial balances
    assert.equal(await proxy.balanceOf(DSLAOwner, {from: DSLAOwner}), initialSupply);
    assert.equal(await proxy.balanceOf(crowdsaleAddress, {from: DSLAOwner}), 0);
    assert.equal(await proxy.balanceOf(recipient, {from: DSLAOwner}), 0);

    // Owner transfer
    await proxy.transfer(crowdsaleAddress, transferAmount, {from: DSLAOwner});
    assert.equal(await proxy.balanceOf(DSLAOwner, {from: DSLAOwner}), initialSupply - transferAmount);
    assert.equal(await proxy.balanceOf(crowdsaleAddress, {from: DSLAOwner}), transferAmount);

    // Crowdsale address transfer
    await proxy.transfer(recipient, transferAmount, {from: crowdsaleAddress});
    assert.equal(await proxy.balanceOf(crowdsaleAddress, {from: DSLAOwner}), 0);
    assert.equal(await proxy.balanceOf(recipient, {from: DSLAOwner}), transferAmount);

    // Transfer before unlockDate
    assertRevert(proxy.transfer(DSLAOwner, transferAmount, {from: recipient}));
    assert.equal(await proxy.balanceOf(recipient, {from: DSLAOwner}), transferAmount);
    assert.equal(await proxy.balanceOf(DSLAOwner, {from: DSLAOwner}), initialSupply - transferAmount);

    var latestBlockTime = await web3.eth.getBlock('latest').timestamp;
    assert(latestBlockTime < unlockDate);

    // Increase block time to after the unlockDate
    await increaseTimeTo(unlockDate + duration.minutes(10));

    // Transfer after unlockdate
    var latestBlockTime = await web3.eth.getBlock('latest').timestamp;
    assert(latestBlockTime > unlockDate);

    await proxy.transfer(DSLAOwner, transferAmount, {from: recipient});
    assert.equal(await proxy.balanceOf(recipient, {from: DSLAOwner}), 0);
    assert.equal(await proxy.balanceOf(DSLAOwner, {from: DSLAOwner}), initialSupply);
  })
})
