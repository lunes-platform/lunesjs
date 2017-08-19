import converters from '../libs/converters';


function booleanToBytes(input): number[] {
    return input ? [1] : [0];
}

function bytesToByteArrayWithSize(input): number[] {

    if (!(input instanceof Array)) {
        input = Array.prototype.slice.call(input);
    }

    const lengthBytes = converters.int16ToBytes(input.length, true);
    return [...lengthBytes, ...input];

}

function longToByteArray(input): number[] {

    const bytes = new Array(7);
    for (let k = 7; k >= 0; k--) {
        bytes[k] = input & (255);
        input = input / 256;
    }

    return bytes;

}

function stringToByteArray(input): number[] {
    return converters.stringToByteArray(input);
}

function stringToByteArrayWithSize(input): number[] {

    const stringBytes = converters.stringToByteArray(input);
    const lengthBytes = converters.int16ToBytes(stringBytes.length, true);

    return [...lengthBytes, ...stringBytes];

}


export default {

    booleanToBytes,
    bytesToByteArrayWithSize,
    longToByteArray,
    stringToByteArray,
    stringToByteArrayWithSize

};
