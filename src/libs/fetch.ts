declare let exports: any;
declare let module: any;
declare let require: any;
declare let global: any;

let fetchSubstitute;
(function () {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = require('node-fetch');
    } else {
        var g;
        if (typeof window !== 'undefined') {
            g = window
        } else if (typeof global !== 'undefined') {
            g = global
        } else if (typeof self !== 'undefined') {
            g = self
        } else {
            g = this
        }
        fetchSubstitute = g.fetch.bind(g);
    }
})();

export default fetchSubstitute;
