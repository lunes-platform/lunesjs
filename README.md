## Waves API [![npm version](https://badge.fury.io/js/waves-api.svg)](https://www.npmjs.com/package/waves-api) [![downloads/month](https://img.shields.io/npm/dm/waves-api.svg)](https://www.npmjs.com/package/waves-api)

Waves core features and API library for both Node.js and browser.

## Installation

```
npm install waves-api --save
```

In Node.js:
```
const WavesAPI = require('waves-api');
const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
```

In browser:
```
<script src="./node_modules/waves-api/dist/waves-api.min.js"></script>
```
```
var Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
```

You can use `waves-api` even within Web Workers.

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
