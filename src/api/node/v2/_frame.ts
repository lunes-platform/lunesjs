import config from '../../../config';


export default function (array, offset, limit) {
    if (limit === 0) {
        return array.slice(offset);
    } else {
        const requestParams = config.getRequestParams();
        offset = offset || requestParams.offset;
        limit = limit || requestParams.limit;
        return array.slice(offset, offset + limit);
    }
};
