import { IHash, IWavesConfig } from '../interfaces';

import { DEFAULT_BASIC_CONFIG } from './constants';


const config: IWavesConfig = Object.create(null);

function checkRequiredFields(conf) {
    if (!conf.networkByte) throw new Error('Missing network byte');
    if (!conf.nodeAddress) throw new Error('Missing node address');
    if (!conf.matcherAddress) throw new Error('Missing matcher address');
}


export default {

    getNetworkByte(): number {
        return config.networkByte;
    },

    getNodeAddress(): string {
        return config.nodeAddress;
    },

    getMatcherAddress(): string {
        return config.matcherAddress;
    },

    getMinimumSeedLength(): number {
        return config.minimumSeedLength;
    },

    getRequestParams(): IHash<any> {
        return {
            offset: config.requestOffset,
            limit: config.requestLimit
        };
    },

    get() {
        return { ...config };
    },

    set(newConfig: Partial<IWavesConfig>) {

        newConfig = { ...DEFAULT_BASIC_CONFIG, ...newConfig };
        Object.keys(newConfig).forEach((key) => {
            config[key] = newConfig[key];
        });

        checkRequiredFields(config);

    },

    clear() {
        Object.keys(config).forEach((key) => {
            delete config[key];
        });
    }

}
