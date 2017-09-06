declare let exports: any;
declare let module: any;
declare let require: any;
declare let global: any;


const fetchSubstitute = (function () {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        return require('node-fetch');
    } else {
        let g;
        if (typeof window !== 'undefined') {
            g = window;
        } else if (typeof global !== 'undefined') {
            g = global;
        } else if (typeof self !== 'undefined') {
            g = self;
        } else {
            g = this;
        }
        return g.fetch.bind(g);
    }
})();


export default fetchSubstitute;
