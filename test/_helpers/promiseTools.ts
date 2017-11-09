export function waterfall(array: Array<(...args) => any>): Promise<any> {

    let promise = Promise.resolve();

    for (let func of array) {
        promise = promise.then(func);
    }

    return promise;

}
