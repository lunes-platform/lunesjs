# Waves API [![npm version](https://badge.fury.io/js/waves-api.svg)](https://www.npmjs.com/package/waves-api) [![downloads/month](https://img.shields.io/npm/dm/waves-api.svg)](https://www.npmjs.com/package/waves-api)

Waves core features and API library for both Node.js and browser.

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

You also can create a `Seed` object from an existing seed:

```
const anotherSeed = Waves.Seed.fromExistingPhrase('a seed which was backed up some time ago');

console.log(seed.phrase); // 'a seed which was backed up some time ago'
console.log(seed.address); // '3N3dy1P8Dccup5WnYsrC6VmaGHF6wMxdLn4'
console.log(seed.keyPair); // { privateKey: '2gSboTPsiQfi1i3zNtFppVJVgjoCA9P4HE9K95y8yCMm', publicKey: 'CFr94paUnDSTRk8jz6Ep3bzhXb9LKarNmLYXW6gqw6Y3' }
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
