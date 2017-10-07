import config from '../../../config';


export default function (array, offset, limit) {
    const requestParams = config.getRequestParams();
    offset = offset || requestParams.offset;
    limit = limit || requestParams.limit;
    return array.slice(offset, offset + limit);
};
