const tests = [];
for (let file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({

    baseUrl: '/base',

    paths: {

        '../dist/waves-api.min': 'dist/waves-api.min',
        '../../dist/waves-api.min': 'dist/waves-api.min',
        'crypto-js': 'tmp-browser/node_modules/crypto-js/index',
        'core': 'tmp-browser/node_modules/crypto-js/core',
        'x64-core': 'tmp-browser/node_modules/crypto-js/x64-core',
        'lib-typedarrays': 'tmp-browser/node_modules/crypto-js/lib-typedarrays',
        'enc-utf16': 'tmp-browser/node_modules/crypto-js/enc-utf16',
        'enc-base64': 'tmp-browser/node_modules/crypto-js/enc-base64',
        'md5': 'tmp-browser/node_modules/crypto-js/md5',
        'sha1': 'tmp-browser/node_modules/crypto-js/sha1',
        'sha256': 'tmp-browser/node_modules/crypto-js/sha256',
        'sha224': 'tmp-browser/node_modules/crypto-js/sha224',
        'sha512': 'tmp-browser/node_modules/crypto-js/sha512',
        'sha384': 'tmp-browser/node_modules/crypto-js/sha384',
        'sha3': 'tmp-browser/node_modules/crypto-js/sha3',
        'ripemd160': 'tmp-browser/node_modules/crypto-js/ripemd160',
        'hmac': 'tmp-browser/node_modules/crypto-js/hmac',
        'pbkdf2': 'tmp-browser/node_modules/crypto-js/pbkdf2',
        'evpkdf': 'tmp-browser/node_modules/crypto-js/evpkdf',
        'cipher-core': 'tmp-browser/node_modules/crypto-js/cipher-core',
        'mode-cfb': 'tmp-browser/node_modules/crypto-js/mode-cfb',
        'mode-ctr': 'tmp-browser/node_modules/crypto-js/mode-ctr',
        'mode-ctr-gladman': 'tmp-browser/node_modules/crypto-js/mode-ctr-gladman',
        'mode-ofb': 'tmp-browser/node_modules/crypto-js/mode-ofb',
        'mode-ecb': 'tmp-browser/node_modules/crypto-js/mode-ecb',
        'pad-ansix923': 'tmp-browser/node_modules/crypto-js/pad-ansix923',
        'pad-iso10126': 'tmp-browser/node_modules/crypto-js/pad-iso10126',
        'pad-iso97971': 'tmp-browser/node_modules/crypto-js/pad-iso97971',
        'pad-zeropadding': 'tmp-browser/node_modules/crypto-js/pad-zeropadding',
        'pad-nopadding': 'tmp-browser/node_modules/crypto-js/pad-nopadding',
        'format-hex': 'tmp-browser/node_modules/crypto-js/format-hex',
        'aes': 'tmp-browser/node_modules/crypto-js/aes',
        'tripledes': 'tmp-browser/node_modules/crypto-js/tripledes',
        'rc4': 'tmp-browser/node_modules/crypto-js/rc4',
        'rabbit': 'tmp-browser/node_modules/crypto-js/rabbit',
        'rabbit-legacy': 'tmp-browser/node_modules/crypto-js/rabbit-legacy'

    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start

});
