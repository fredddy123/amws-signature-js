const encoding = require('encoding');

const CHARACTER_ENCODING = 'UTF-8';
const ALGORITHM = 'HmacSHA256';

const secretKey = 'Your secret key';
const serviceUrl = 'https://mws.amazonservices.com/';

const e = urlEncode;

let parameters = `AWSAccessKeyId=${e('Your Access Key Id')}&`
    + `Action=${e('GetFeedSubmissionList')}&`
    + `MWSAuthToken=${e('Your MWS Auth Token')}&`
    + `SellerId=${e('Your Seller Id')}&`
    + `SignatureMethod=${e(ALGORITHM)}&`
    + `SignatureVersion=${e('2')}&`
    + `SubmittedFromDate=${e('2013-05-01T12:00:00Z')}&`
    + `Timestamp=${e('2013-05-02T16:00:00Z')}&`
    + `Version=${e('2009-01-01')}`;

const formattedParameters = calculateStringToSignV2(parameters, serviceUrl);

const signature = sign(formattedParameters, secretKey);

parameters += `&Signature=${signature}`;

const result = calculateStringToSignV2(parameters, serviceUrl);

console.log('result', result);

function urlEncode(value = '') {
    let encoded;

    try {
        encoded = encoding
            .convert(value, 'Latin_1', CHARACTER_ENCODING)
            .toString()
            .replace(/\s/g, '%20')
            .replace('+', '%20')
            .replace('*', '%2A')
            .replace('%7E','~');
    } catch (e) {
        console.error(e);
    }

    return encoded;
}

function calculateStringToSignV2(parameters, serviceUrl) {
    return `POST\n`
        + `${serviceUrl.replace('https://', '').slice(0, -1)}\n`
        + `/\n`
        + `${parameters}`;
}

function sign(data, secretKey) {
    //  ... code
    return 'example';
}
