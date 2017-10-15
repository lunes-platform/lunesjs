declare let exports: any;
declare let module: any;
declare let require: any;

import Response from './getResponse';


const originalFetch = (() => {
    if (typeof window !== 'undefined') {
        return window.fetch.bind(window);
    } else if (typeof self !== 'undefined') {
        return self.fetch.bind(self);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        return require('node-fetch');
    } else {
        throw new Error('Your environment is not defined');
    }
})();


export const mockableFetch = (() => {

    let usedFetch = originalFetch;

    return {

        fetch(input) {
            if (!usedFetch) throw new Error('Fetch is not mocked');
            return usedFetch(input);
        },

        mockWith(func) {
            if (typeof func !== 'function') throw new Error('Fetch must be a function');
            usedFetch = func;
        },

        replyWith(data) {
            usedFetch = () => Promise.resolve(new Response(data));
        },

        useOriginal() {
            usedFetch = originalFetch;
        }

    };

})();


if (typeof window !== 'undefined') {
    window.fetch = mockableFetch.fetch;
} else if (typeof self !== 'undefined') {
    self.fetch = mockableFetch.fetch;
} else if (typeof exports === 'object' && typeof module !== 'undefined') {
    const mock = require('mock-require');
    mock('node-fetch', mockableFetch.fetch);
} else {
    throw new Error('Your environment is not defined');
}
