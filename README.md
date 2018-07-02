# Waves API [![npm version](https://badge.fury.io/js/%40waves%2Fwaves-api.svg)](https://www.npmjs.com/package/@waves/waves-api) [![downloads/month](https://img.shields.io/npm/dm/%40waves%2Fwaves-api.svg)](https://www.npmjs.com/package/@waves/waves-api)

Waves Platform core features and Waves API library for both Node.js and browser.

The latest and most actual version of this documentation [is hosted on GitHub](https://github.com/wavesplatform/waves-api/blob/master/README.md).

## Installation

```
npm install @waves/waves-api --save
```

In Node.js:

```
const WavesAPI = require('@waves/waves-api');
```

In browser:

```
<script src="./node_modules/@waves/waves-api/dist/waves-api.min.js"></script>
```

You can use `@waves/waves-api` even within Web Workers.

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

Although the structure and naming of this API may seem strange, they reflect those of the backend Node API.

First, a quick introduction into the structure:

* addresses
    * balance — your regular WAVES balance
    * balanceDetails — the details on your WAVES balance ([see below](#different-types-of-waves-balance))
* aliases
    * byAlias — Waves address related to a given alias
    * byAddress — a list of aliases related to a given Waves address
    * createAlias — POST-method to create an alias for your Waves address
* assets
    * balances — your token balances
    * balance — your balance for a given token
    * distribution — the distribution of a given token between addresses
    * issue — POST-method to create your own token
    * transfer — POST-method to send send some amount of a given token or WAVES
    * reissue — POST-method to emit an additional quantity of a given token
    * burn — POST-method to burn some amount of a given token
* blocks
    * get — get a block by its signature (ID)
    * at — get the block at a certain height
    * first — get the first block
    * last — get the last block
    * height — get the current height of the blockchain
* leasing
    * lease — POST-method to lease your WAVES
    * cancelLeasing — POST-method to cancel a given Lease transaction
    * getAllActiveLeases — get all your active Lease transactions
* transactions
    * get — get a transaction by its signature (ID)
    * getList — get the list of last N transactions for a given Waves address
    * utxSize — get the current size of the unconfirmed transactions pool
    * utxGet — get an unconfirmed transaction by its signature (ID)
    * utxGetList — get the list of unconfirmed transactions for a given Waves address
* utils
    * time — get the current Node timestamp

#### Sending transactions

You will need a pair of keys from an account with a balance to send transactions:

```
const seed = Waves.Seed.fromExistingPhrase('a seed from an account with some funds');
```

##### Issue transaction

This is the way to create your own token which can be traded, distributed amongst users and used for your business purposes.

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

Waves.API.Node.assets.issue(issueData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Transfer transaction

The Transfer transaction allows you to send WAVES or any token you possess to another Waves address. 

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

Waves.API.Node.assets.transfer(transferData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Reissue transaction

Despite this transaction name, it allows you to issue an additional amount of a token which was initially issued by you.

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

Waves.API.Node.assets.reissue(reissueData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Burn transaction

Here you can burn any amount of token which was issued by you *and is still on your balance*.

```
const burnData = {

    // Asset ID and its quantity to be burned
    assetId: '5xN8XPkKi7RoYUAT5hNKC26FKCcX6Rj6epASpgFEYZss',
    quantity: 20000000000,

    fee: 100000,
    timestamp: Date.now()

};

Waves.API.Node.assets.burn(burnData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Lease transaction

This is the way you can lease your WAVES to a different address.

```
const leaseData = {

    recipient: '5xN8XPkKi7RoYUAT5hNKC26FKCcX6Rj6epASpgFEYZss',

    // Both amount and fee may be presented as divided by 10^8 (8 is Waves precision)
    amount: 1000000000, // 10 Waves
    fee: 100000, // 0.001 Waves

    timestamp: Date.now()

};

Waves.API.Node.leasing.lease(leaseData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Cancel Leasing transaction

This transaction gives you a mean to cancel previously sent Lease transactions.

```
const cancelLeasingData = {

    // Related Lease transaction ID
    transactionId: '2kPvxtAit2nsumxBL7xYjvaWYmvmMfDL5oPgs4nZsHvZ',

    fee: 100000,
    timestamp: Date.now()

};

Waves.API.Node.leasing.cancelLeasing(cancelLeasingData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

##### Create Alias transaction

A Waves address can have aliases — short readable names which can be used instead of address. This transaction creates an alias. 

```
const createAliasData = {

    // That's a kind of a nickname you attach to your address
    alias: 'xenohunter',

    fee: 100000,
    timestamp: Date.now()

};

Waves.API.Node.aliases.createAlias(createAliasData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
```

#### Getting the information from Node

The most used GET requests are those related to balances and transactions history.

##### Waves balance

There are two types of Waves balance: simple, with optional `confirmations` parameter, and detailed, showing different types of Waves balance.

With the first type, without additional arguments, you get the current balance on an address:

```
Waves.API.Node.addresses.balance('3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8').then((balance) => {
    console.log(balance);
});
```

If you pass an optional `confirmations` argument, you get the balance with N confirmations, i.e. the balance as it was N blocks ago from the moment:

```
Waves.API.Node.addresses.balance('3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8', 100).then((balance) => {
    console.log(balance);
});
```

For the second type, there is a separate method:

```
Waves.API.Node.addresses.balanceDetails('3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8').then((balanceDetails) => {
   console.log(balanceDetails);
});
```

##### Token balances

You can get the list of all balances on an address:

```
Waves.API.Node.assets.balances(address).then((balancesList) => {
   console.log(balancesList);
});
```

You also can get the balance of a given token:

```
Waves.API.Node.assets.balance(address, assetId).then((balance) => {
   console.log(balance);
});
```

##### Token distribution

A very useful method allowing you to get a map with balances of all addresses in possession of a token:

```
Waves.API.Node.assets.distribution(assetId).then((distributionMap) => {
   console.log(distributionMap);
});
```

##### Transactions

Every transaction in the blockchain has its own ID. You can both get one by ID, or get a list of all recent transactions.

```
Waves.API.Node.transactions.get('Bn2opYvcmYAMCaJHKP1uXYCHFGnAyrzGoiboBLT8RALt').then((tx) => {
    console.log(tx);
});
```

To get the list you need to provide an address which is either the sender or the recipient of the transactions in the resulting list:

```
Waves.API.Node.transactions.getList('3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8').then((txList) => {
    console.log(txList);
}):
```

One of the concepts in most blockchains is UTX, unconfirmed transactions pool. During the time between blocks appearance, transactions from users are stored in it.

There are methods to get the size of UTX pool and UTX pool itself (note that the address is not needed here):

```
Waves.API.Node.transactions.utxSize().then((utxSize) => {
    console.log(utxSize);
});

Waves.API.Node.transactions.utxGetList().then((utxList) => {
    console.log(utxList);
});
```

Also if a transaction is still in UTX pool and you know its ID, you can get only it from UTX:

```
Waves.API.Node.transactions.utxGet('Bn2opYvcmYAMCaJHKP1uXYCHFGnAyrzGoiboBLT8RALt').then((tx) => {
    console.log(tx);
});
```

##### Aliases

Aside from creating an alias, you also can get the list of aliases bound to an address, or get the address related to the given alias.

```
Waves.API.Node.aliases.byAddress('3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8').then((aliasesList) => {
    console.log(aliasesList);
});

Waves.API.Node.aliases.byAlias('xenohunter').then((address) => {
    console.log(address);
});
```

##### Blocks

Everything is simple here. You can get the whole block by its signature (`get()`) or height (`at()`). Method `height()` returns the current height of the Waves blockchain. The names of the remaining methods speak for themselves.

```
Waves.API.Node.blocks.get(signature).then((block) => console.log(block));

Waves.API.Node.blocks.at(height).then((block) => console.log(block));

Waves.API.Node.blocks.height().then((currentHeight) => console.log(currentHeight));

Waves.API.Node.blocks.first().then((firstBlock) => console.log(firstBlock));

Waves.API.Node.blocks.last().then((lastBlock) => console.log(lastBlock));
```

### Configuration

The configuration is changeable even during the runtime. The structure of the config is following:

```
const newConfig = {

    // The byte allowing to distinguish networks (mainnet, testnet, devnet, etc)
    networkByte: Waves.constants.MAINNET_BYTE,

    // Node and Matcher addresses, no comments here
    nodeAddress: 'https://nodes.wavesnodes.com',
    matcherAddress: 'https://nodes.wavesnodes.com/matcher',

    // If a seed phrase length falls below that value an error will be thrown
    minimumSeedLength: 50

};
```

All fields are optional, only filled ones will be replaced.

You can change the config like that:

```
Waves.config.set(newConfig);
```

### Tools

#### Get address from public key

```
const address = Waves.tools.getAddressFromPublicKey('GL6Cbk3JnD9XiBRK5ntCavSrGGD5JT9pXSRkukcEcaSW');
console.log(address); // '3N1JKsPcQ5x49utR79Maey4tbjssfrn2RYp'
```

## Common pitfalls

### Precision and coins-to-tokens transformation

In Waves blockchain different tokens have different precision, i.e. number of decimal digits. For example, it would be 10.00 USD and 10.00000000 BTC. That distinction allows to create tokens for various purposes but also makes things harder to understand sometimes.

Two words have emerged: _token_ and _coin_. Token is used to refer to the whole part of the amount. Coin describes the smallest value which is possible for a given token. For USD _token_ would be one dollar, and _coin_ would be one cent. If you are familiar with Bitcoin you could have encountered the word _Satoshi_ which refers to one hundred millionth of a single Bitcoin.

In the blockchain every token is stored with its explicitly specified precision and amount of coins. Every transaction is signed and stored in the blockchain in its coin representation. So if you send 2 USD tokens to someone, you really send 200 USD token coins instead.

The same goes for the fees, and issue transactions, and leasing amounts, and so on.

Waves precision equals 8. Therefore there are `100000000 * 10^8` of Waves coins (Wavelets) in Waves blockchain.

### Reissuability and the additive nature of it

The amount in reissue transactions refer not to the final amount of asset after reissuing but to the amount which will be added to the current token amount.

### Waves ID in the library and in the blockchain

One of the trickiest things about Waves blockchain is that Waves ID equals empty string. In the first version on Node API it also equals to empty string. That is an unobvious and potentially dangerous behavior. Therefore in this library Waves ID strictly equals string `WAVES`. Please mind that fact.

### Fee asset choice for transfer transactions

There is only one type of transactions (currently) in which we can use arbitrary tokens as fees. The only limitation is that the Node to which you connect must support the token you use as fees. Please note that transactions with the Waves fee will be prior over transactions with fees in other tokens.

### Impossibility of transactions with the absolutely same data

Transaction IDs are built from all the data in a transaction except the signature. That process is deterministic. So there cannot be two transactions with the absolutely same data.

### Delays in the leasing process

For the security reasons all leased Waves take effect only after 1000 blocks. Don't worry when your generating balance isn't updated right away.

### Mess with balances in the first version of API

It happened so that Waves balance and token balances are served through different API methods in the first version of Waves API. That's not very useful and we designed the new version otherwise.

### Different types of Waves balance

There is the most understandable type of Waves balance. It is the regular balance. It is served through `Waves.API.Node.addresses.balance()`. There are also several types of Waves balance related to leasing and the delays in its processing.

1. *Regular* — that's how much Waves you have, including those you leased;
2. *Available* — the same as _regular_ only without Waves you leased;
3. *Effective* — _available_ plus those Waves which is leased to you;
4. *Generating* — the minimal _effective_ for last 1000 blocks;
5. *Leased* — the amount you leased to other addresses.

Available balance you can lease and spend.

Generating balance gives you mining power.

## Tests

```
cd ./node_modules/@waves/waves-api/
npm install
npm run test # to run tests in Node.js
npm run test-browser # to run test in Chrome browser
```

Test configuration may be changed in the _./node_modules/@waves/waves-api/karma.conf.js_ file.

## Tools

* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
* [Karma](https://karma-runner.github.io/1.0/index.html) - Test runner
* [Chai](http://chaijs.com/) - Assertion library

## Authors

* [**Phil Filippak**](https://github.com/xenohunter) - *Initial work*
* [**Daniil Tsigelnitskiy**](https://github.com/tsigel) - *TypeScript expertise*

See also the list of [contributors](https://github.com/wavesplatform/waves-api/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
