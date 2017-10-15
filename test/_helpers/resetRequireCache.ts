declare let exports: any;
declare let module: any;
declare let require: any;


// TODO : resolve real path to avoid overlaps


function resolveName(name, object) {
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].indexOf(name) !== -1) {
            return keys[i];
        }
    }
}


export default function (...names) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        names.forEach((name) => {
            name = resolveName(names, require.cache);
            delete require.cache[name];
        });
    }
}
