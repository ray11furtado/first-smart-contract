const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);
const { bytecode } = require('../compile');
const inter = require('../compile').interface;

let accounts;
let inbox;
const INITIAL_STRING = 'Hi There';
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(inter))
  // We Parse interface because compiler returns JSON
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] }) // deploy contract
    .send({ from: accounts[0], gas: '1000000' }); // who is sending the contract, sends contract to network
  // Use one account to depoly contract
});

describe('Inbox', () => {
  it('deploays a contract', () => {
    assert.ok(inbox.options.address); // Makes sure there is an address
  });

  it('has initial message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it('can change message', async () => {
    const newMessage = 'Hello Goodbye';
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});
