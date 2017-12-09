import logger from '../../../utils/logger';


export default function (message?) {
    logger.warn('API v2 is experimental, please mind that');
    message && logger.warn(message);
}
