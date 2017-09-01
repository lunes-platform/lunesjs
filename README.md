# Waves API [![npm version](https://badge.fury.io/js/waves-api.svg)](https://www.npmjs.com/package/waves-api) [![downloads/month](https://img.shields.io/npm/dm/waves-api.svg)](https://www.npmjs.com/package/waves-api)

Waves core features and API library for both Node.js and browser.

The latest and most actual version of this documentation [is hosted on GitHub](https://github.com/xenohunter/waves-api/blob/master/README.md).

## Installation

```
npm install waves-api --save
```

In Node.js:

```
const WavesAPI = require('waves-api');
```

In browser:

```
<script src="./node_modules/waves-api/dist/waves-api.min.js"></script>
```

You can use `waves-api` even within Web Workers.

## Usage

```
const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
```

### Seed

You can create a new random seed:

```
const seed = Waves.Seed.create();

console.log(seed.phrase); // 'hole law front bottom then mobile fabric under horse drink other member work twenty boss'
console.log(seed.address); // '3Mr5af3Y7r7gQej3tRtugYbKaPr5qYps2ei'
console.log(seed.keyPair); // { privateKey: 'HkFCbtBHX1ZUF42aNE4av52JvdDPWth2jbP88HPTDyp4', publicKey: 'AF9HLq2Rsv2fVfLPtsWxT7Y3S9ZTv6Mw4ZTp8K8LNdEp' }
```

That seed may be encrypted with a password:

```
const password = '0123456789';
const encrypted = seed.encrypt(password);

console.log(encrypted); // 'U2FsdGVkX1+5TpaxcK/eJyjht7bSpjLYlSU8gVXNapU3MG8xgWm3uavW37aPz/KTcROK7OjOA3dpCLXfZ4YjCV3OW2r1CCaUhOMPBCX64QA/iAlgPJNtfMvjLKTHZko/JDgrxBHgQkz76apORWdKEQ=='
```

And decrypted (with the same password, of course):

```
const restoredPhrase = Waves.Seed.decryptSeedPhrase(encrypted, password);

console.log(restoredPhrase); // 'hole law front bottom then mobile fabric under horse drink other member work twenty boss'
```

Being called with a wrong password `Waves.Seed.decryptSeedPhrase()` throws an exception.

You also can create a `Seed` object from an existing seed:

```
const anotherSeed = Waves.Seed.fromExistingPhrase('a seed which was backed up some time ago');

console.log(seed.phrase); // 'a seed which was backed up some time ago'
console.log(seed.address); // '3N3dy1P8Dccup5WnYsrC6VmaGHF6wMxdLn4'
console.log(seed.keyPair); // { privateKey: '2gSboTPsiQfi1i3zNtFppVJVgjoCA9P4HE9K95y8yCMm', publicKey: 'CFr94paUnDSTRk8jz6Ep3bzhXb9LKarNmLYXW6gqw6Y3' }
```

### Node API

Right now only the first version of Node API is available. If you want to contribute to the new versions of Waves API please see [the section below](#see-also).

#### Sending transactions

You will need a pair of keys from an account with a balance to send transactions:

```
const seed = Waves.Seed.fromExistingPhrase('a seed from an account with some funds');
```

##### Issue transaction

```
const issueData = {

    name: 'Your token name',
    description: 'Some words about it',

    // With given options you'll have 100000.00000 tokens
    quantity: 10000000000,
    precision: 5,

    // This flag defines whether additional emission is possible
    reissuable: false,

    fee: 100000000,
    timestamp: Date.now()

};

Waves.API.Node.v1.assets.issue(issueData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Transfer transaction

```
const transferData = {

    // An arbitrary address; mine, in this example
    recipient: '3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8',

    // ID of a token, or WAVES
    assetId: 'WAVES',
    
    // The real amount is the given number divided by 10^(precision of the token)
    amount: 10000000,

    // The same rules for these two fields
    feeAssetId: 'WAVES',
    fee: 100000,

    // 140 bytes of data (it's allowed to use Uint8Array here) 
    attachment: '',
    
    timestamp: Date.now()

};

Waves.API.Node.v1.assets.transfer(transferData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Reissue transaction

```
const reissueData = {

    // Asset ID which is to be additionnaly emitted
    assetId: '5xN8XPkKi7RoYUAT5hNKC26FKCcX6Rj6epASpgFEYZss',

    // Additional quantity is the given number divided by 10^(precision of the token)
    quantity: 100000000,

    reissuable: false,
    fee: 100000000,
    timestamp: Date.now()

};

Waves.API.Node.v1.assets.reissue(reissueData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Lease transaction

```
const leaseData = {

    recipient: '5xN8XPkKi7RoYUAT5hNKC26FKCcX6Rj6epASpgFEYZss',

    // Both amount and fee are the given numbers divided by 10^8 (8 is Waves precision)
    amount: 100000000,
    fee: 100000,

    timestamp: Date.now()

};

Waves.API.Node.v1.leasing.lease(leaseData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Cancel Leasing transaction

```
const cancelLeasingData = {

    // Related Lease transaction ID
    transactionId: '2kPvxtAit2nsumxBL7xYjvaWYmvmMfDL5oPgs4nZsHvZ',

    fee: 100000,
    timestamp: Date.now()

};

Waves.API.Node.v1.leasing.cancelLeasing(cancelLeasingData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Create Alias transaction

```
const createAliasData = {

    // That's a kind of a nickname you attach to your address
    alias: 'xenohunter',

    fee: 100000,
    timestamp: Date.now()

};

Waves.API.Node.v1.aliases.createAlias(createAliasData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

#### Getting the information from Node

The most used GET requests are those related to balances and transactions history.

##### Waves balance

There are two types of Waves balance: simple, with optional `confirmations` parameter, and detailed, showing different types of Waves balance.

With the first type, without additional arguments, you get the current balance on an address:

```
Waves.API.Node.v1.addresses.balance('3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8').then((balance) => {
    console.log(balance);
});
```

If you pass an optional `confirmations` argument, you get the balance with N confirmations, i.e. the balance as it was N blocks ago from the moment:

```
Waves.API.Node.v1.addresses.balance('3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8', 100).then((balance) => {
    console.log(balance);
});
```

For the second type, there is a separate method:

```
Waves.API.Node.v1.addresses.balanceDetails('3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8').then((balanceDetails) => {
   console.log(balanceDetails);
});
```

##### Transactions

Every transaction in the blockchain has its own ID. You can both get one by ID, or get a list of all recent transactions.

```
Waves.API.Node.v1.transactions.get('Bn2opYvcmYAMCaJHKP1uXYCHFGnAyrzGoiboBLT8RALt').then((tx) => {
    console.log(tx);
});
```

To get the list you need to provide an address which is either the sender or the recipient of the transactions in the resulting list:

```
Waves.API.Node.v1.transactions.getList('3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8').then((txList) => {
    console.log(txList);
}):
```

One of the concepts in most blockchains is UTX, unconfirmed transactions pool. During the time between blocks appearance, transactions from users are stored in it.

There are methods to get the size of UTX pool and UTX pool itself (note that the address is not needed here):

```
Waves.API.Node.v1.transactions.utxSize().then((utxSize) => {
    console.log(utxSize);
});

Waves.API.Node.v1.transactions.utxGetList().then((utxList) => {
    console.log(utxList);
});
```

Also if a transaction is still in UTX pool and you know its ID, you can get only it from UTX:

```
Waves.API.Node.v1.transactions.utxGet('Bn2opYvcmYAMCaJHKP1uXYCHFGnAyrzGoiboBLT8RALt').then((tx) => {
    console.log(tx);
});
```

##### Aliases

Aside from creating an alias, you also can get the list of aliases bound to an address, or get the address related to the given alias.

```
Waves.API.Node.v1.aliases.byAddress('3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8').then((aliasesList) => {
    console.log(aliasesList);
});

Waves.API.Node.v1.aliases.byAlias('xenohunter').then((address) => {
    console.log(address);
});
```

##### Blocks

Everything is simple here. You can get the whole block by its signature (`get()`) or height (`at()`). Method `height()` returns the current height of the Waves blockchain. The names of the remaining methods speak for themselves.

```
Waves.API.Node.v1.blocks.get(signature).then((block) => console.log(block));

Waves.API.Node.v1.blocks.at(height).then((block) => console.log(block));

Waves.API.Node.v1.blocks.height().then((currentHeight) => console.log(currentHeight));

Waves.API.Node.v1.blocks.first().then((firstBlock) => console.log(firstBlock));

Waves.API.Node.v1.blocks.last().then((lastBlock) => console.log(lastBlock));
```

## Tests

```
cd ./node_modules/waves-api/
npm install
npm run test # to run tests in Node.js
npm run test-browser # to run test in Chrome browser
```

Test configuration may be changed in the _./node_modules/waves-api/karma.conf.js_ file.

## Tools

* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
* [Karma](https://karma-runner.github.io/1.0/index.html) - Test runner
* [Chai](http://chaijs.com/) - Assertion library

## Authors

* [**Phil Filippak**](https://github.com/xenohunter) - *Initial work*
* [**Daniil Tsigelnitskiy**](https://github.com/tsigel) - *TypeScript expertise*

See also the list of [contributors](https://github.com/xenohunter/waves-api/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## See also

* [Waves API design repository](https://github.com/wavesplatform/swagger-api-design)
