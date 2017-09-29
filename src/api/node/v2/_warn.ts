export default function (message?) {
    console.warn('API v2 is experimental, please mind that!');
    message && console.warn(message);
}
