import config from '../../../config';


export default function (array, offset, limit) {
    const requestOptions = config.getRequestDefaults();
    offset = offset || requestOptions.offset;
    limit = limit || requestOptions.limit;
    return array.slice(offset, offset + limit);
};
