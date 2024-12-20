"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSigner;
exports.encrypt = encrypt;
exports.toJsonString = toJsonString;
exports.encryptRSA = encryptRSA;
exports.sortByKey = sortByKey;
const querystring_1 = require("querystring");
const crypto_1 = require("crypto");
const config_1 = require("./config");
const contant_1 = require("./contant");
/**
 * 获取签名器
 * @param apiKey
 * @param secretKey
 * @param timestamp
 * @param passphrase
 */
function getSigner(apiKey = '', secretKey = '', passphrase = '') {
    return (httpMethod, url, qsOrBody, locale = 'zh-CN') => {
        const timestamp = Date.now();
        let signString = encrypt(httpMethod, url, qsOrBody, timestamp, secretKey);
        if (config_1.API_CONFIG.SIGN_TYPE === contant_1.BIZ_CONSTANT.RSA) {
            signString = encryptRSA(httpMethod, url, qsOrBody, timestamp, secretKey);
        }
        return {
            'ACCESS-SIGN': signString,
            'ACCESS-TIMESTAMP': timestamp,
            'ACCESS-KEY': apiKey,
            'ACCESS-PASSPHRASE': passphrase,
            'Content-Type': 'application/json',
            Cookie: 'locale=' + locale,
            locale
        };
    };
}
/**
 * 加密算法
 * @param httpMethod
 * @param url
 * @param qsOrBody
 * @param timestamp
 * @param secretKey
 */
function encrypt(httpMethod, url, qsOrBody, timestamp, secretKey) {
    httpMethod = httpMethod.toUpperCase();
    if (qsOrBody && httpMethod === 'GET') {
        qsOrBody = sortByKey(qsOrBody);
    }
    if (qsOrBody && Object.keys(qsOrBody).length === 0) {
        qsOrBody = null;
    }
    // const qsOrBodyStr = qsOrBody ? httpMethod === 'GET' ? '?' + stringify(qsOrBody) : toJsonString(qsOrBody) : ''
    const qsOrBodyStr = qsOrBody ? httpMethod === 'GET' ? '?' + unescapedStringify(qsOrBody) : toJsonString(qsOrBody) : '';
    const preHash = String(timestamp) + httpMethod + url + qsOrBodyStr;
    const mac = (0, crypto_1.createHmac)('sha256', secretKey);
    const preHashToMacBuffer = mac.update(preHash).digest();
    return preHashToMacBuffer.toString('base64');
}
function unescapedStringify(formDataDict) {
    const encodedData = Object.keys(formDataDict).map((eachKey) => {
        return eachKey + '=' + formDataDict[eachKey];
    }).join('&');
    return encodedData;
}
function toJsonString(obj) {
    if (obj == null) {
        return null;
    }
    let json = JSON.stringify(obj);
    Object.keys(obj).filter(key => key[0] === '_').forEach(key => {
        json = json.replace(key, key.substring(1));
    });
    const reg = new RegExp('"_', 'g');
    return json.replace(reg, '"');
}
/**
 * RSA加密算法
 * @param httpMethod
 * @param url
 * @param qsOrBody
 * @param timestamp
 * @param secretKey
 */
function encryptRSA(httpMethod, url, qsOrBody, timestamp, secretKey) {
    httpMethod = httpMethod.toUpperCase();
    const qsOrBodyStr = qsOrBody ? httpMethod === 'GET' ? '?' + (0, querystring_1.stringify)(qsOrBody) : toJsonString(qsOrBody) : '';
    const preHash = String(timestamp) + httpMethod + url + qsOrBodyStr;
    const NodeRSA = require('node-rsa');
    const priKey = new NodeRSA(secretKey);
    const sign = priKey.sign(preHash, 'base64', 'UTF-8');
    return sign;
}
function sortByKey(dict) {
    const sorted = [];
    for (const key of Object.keys(dict)) {
        sorted[sorted.length] = key;
    }
    sorted.sort();
    const tempDict = {};
    // for(let i = 0; i < sorted.length; i++) {
    //     tempDict[sorted[i]] = dict[sorted[i]];
    // }
    for (const item of sorted) {
        tempDict[item] = dict[item];
    }
    return tempDict;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaXRnZXQvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXVCQSw0QkF1QkM7QUFVRCwwQkFnQkM7QUFVRCxvQ0FXQztBQVVELGdDQVFDO0FBRUQsOEJBZUM7QUFoSUQsNkNBQXFDO0FBQ3JDLG1DQUFpQztBQUVqQyxxQ0FBb0M7QUFDcEMsdUNBQXVDO0FBWXZDOzs7Ozs7R0FNRztBQUNILFNBQXdCLFNBQVMsQ0FDN0IsU0FBaUIsRUFBRSxFQUNuQixZQUFvQixFQUFFLEVBQ3RCLGFBQXFCLEVBQUU7SUFHdkIsT0FBTyxDQUFDLFVBQWtCLEVBQUUsR0FBVyxFQUFFLFFBQWlDLEVBQUUsTUFBTSxHQUFHLE9BQU8sRUFBRSxFQUFFO1FBQzVGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFFLElBQUksbUJBQVUsQ0FBQyxTQUFTLEtBQUssc0JBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM1QyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxTQUFTLENBQUMsQ0FBQTtRQUMzRSxDQUFDO1FBRUQsT0FBTztZQUNILGFBQWEsRUFBRSxVQUFVO1lBQ3pCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsWUFBWSxFQUFFLE1BQU07WUFDcEIsbUJBQW1CLEVBQUUsVUFBVTtZQUMvQixjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLE1BQU0sRUFBRSxTQUFTLEdBQUcsTUFBTTtZQUMxQixNQUFNO1NBQ1QsQ0FBQTtJQUNMLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLFVBQWtCLEVB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