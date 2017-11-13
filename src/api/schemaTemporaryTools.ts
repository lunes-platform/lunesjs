export function stub(partType) {
    if (partType === 'string') {
        return () => '[recipient address will be here when the API v2 is implemented]';
    } else if (partType === 'number') {
        return () => -1;
    } else {
        throw new Error(`No stub for the "${partType}" type of part`);
    }
}

export function stringConversion(n) {
    return (typeof n === 'number') ? String(n) : null;
}
