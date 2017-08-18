module.exports = function (config) {
    'use strict';

    const vendors = [
        'node_modules/blakejs/index.js',
        'node_modules/blakejs/blake2b.js',
        'node_modules/blakejs/blake2s.js',
        'node_modules/blakejs/util.js',
        'node_modules/crypto-js/index.js',
        'node_modules/crypto-js/core.js',
        'node_modules/crypto-js/x64-core.js',
        'node_modules/crypto-js/lib-typedarrays.js',
        'node_modules/crypto-js/enc-utf16.js',
        'node_modules/crypto-js/enc-base64.js',
        'node_modules/crypto-js/md5.js',
        'node_modules/crypto-js/sha1.js',
        'node_modules/crypto-js/sha256.js',
        'node_modules/crypto-js/sha224.js',
        'node_modules/crypto-js/sha512.js',
        'node_modules/crypto-js/sha384.js',
        'node_modules/crypto-js/sha3.js',
        'node_modules/crypto-js/ripemd160.js',
        'node_modules/crypto-js/hmac.js',
        'node_modules/crypto-js/pbkdf2.js',
        'node_modules/crypto-js/evpkdf.js',
        'node_modules/crypto-js/cipher-core.js',
        'node_modules/crypto-js/mode-cfb.js',
        'node_modules/crypto-js/mode-ctr.js',
        'node_modules/crypto-js/mode-ctr-gladman.js',
        'node_modules/crypto-js/mode-ofb.js',
        'node_modules/crypto-js/mode-ecb.js',
        'node_modules/crypto-js/pad-ansix923.js',
        'node_modules/crypto-js/pad-iso10126.js',
        'node_modules/crypto-js/pad-iso97971.js',
        'node_modules/crypto-js/pad-zeropadding.js',
        'node_modules/crypto-js/pad-nopadding.js',
        'node_modules/crypto-js/format-hex.js',
        'node_modules/crypto-js/aes.js',
        'node_modules/crypto-js/tripledes.js',
        'node_modules/crypto-js/rc4.js',
        'node_modules/crypto-js/rabbit.js',
        'node_modules/crypto-js/rabbit-legacy.js'
    ];

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['commonjs', 'mocha', 'chai'],

        files: [
            ...vendors,
            { pattern: 'src/**/*.js' },
            { pattern: 'test/**/*.js' }
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: vendors.reduce((map, file) => {
            map[file] = ['commonjs'];
            return map;
        }, {
            'src/**/*.js': ['commonjs'],
            'test/**/*.js': ['commonjs']
        }),

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values:
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        client: {
            mocha: {
                reporter: 'html', // change Karma's debug.html to the mocha web reporter
                ui: 'bdd'
            }
        }

    });
};