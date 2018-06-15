declare const require: Function;


let result;
if (typeof chai !== 'undefined') {
    result = chai;
} else {
    result = require('chai');
}


export const assert = result.assert;
export const expect = result.expect;
export const should = result.should;
