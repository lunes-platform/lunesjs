import WavesError from './WavesError';


export default class WavesRequestError extends WavesError {

    constructor(url, data) {
        super(`Server request to '${url}' has failed`, data);
        this.name = 'WavesRequestError';
    }

}
