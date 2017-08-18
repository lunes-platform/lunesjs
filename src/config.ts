import { IWavesConfig } from './interfaces';


const config: IWavesConfig = Object.create(null);

export default {

    get() {
        return { ...config };
    },

    set(newConfig) {
        Object.keys(newConfig).forEach((key) => {
            config[key] = newConfig[key];
        });
    }

}
