import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON } from '../../utils/request';


const fetch = createFetchWrapper(PRODUCTS.MATCHER, VERSIONS.V1, processJSON);


export default {

    getMatcherKey() {
        return fetch('/');
    }

};
