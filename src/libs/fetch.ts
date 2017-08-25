declare const process: any;
declare const require: any;

let fetchSubstitute;

// Check for process.pid to prevent Browserify from tricking us
if (typeof process !== 'undefined' && typeof process.pid === 'number') {
    fetchSubstitute = require('node-fetch');
} else {
    fetchSubstitute = self.fetch.bind(self);
}

export default fetchSubstitute;
