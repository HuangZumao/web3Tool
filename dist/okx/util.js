"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSigner;
exports.encrypt = encrypt;
exports.toJsonString = toJsonString;
exports.encryptRSA = encryptRSA;
exports.sortByKey = sortByKey;
const querystring_1 = require("querystring");
const crypto_1 = require("crypto");
/**
 * 获取签名器
 * @param apiKey
 * @param secretKey
 * @param passphrase
 */
function getSigner(apiKey = "", secretKey = "", passphrase = "") {
    return (httpMethod, url, qsOrBody, locale = "zh-CN") => {
        const timestamp = new Date().toISOString();
        let signString = encrypt(httpMethod, url, qsOrBody, timestamp, secretKey);
        return {
            "OK-ACCESS-SIGN": signString,
            "OK-ACCESS-TIMESTAMP": timestamp,
            "OK-ACCESS-KEY": apiKey,
            "OK-ACCESS-PASSPHRASE": passphrase,
            "Content-Type": "application/json",
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
    if (qsOrBody && httpMethod === "GET") {
        qsOrBody = sortByKey(qsOrBody);
    }
    if (qsOrBody && Object.keys(qsOrBody).length === 0) {
        qsOrBody = null;
    }
    // const qsOrBodyStr = qsOrBody ? httpMethod === 'GET' ? '?' + stringify(qsOrBody) : toJsonString(qsOrBody) : ''
    const qsOrBodyStr = qsOrBody
        ? httpMethod === "GET"
            ? "?" + unescapedStringify(qsOrBody)
            : toJsonString(qsOrBody)
        : "";
    const preHash = String(timestamp) + httpMethod + url + qsOrBodyStr;
    const mac = (0, crypto_1.createHmac)("sha256", secretKey);
    const preHashToMacBuffer = mac.update(preHash).digest();
    return preHashToMacBuffer.toString("base64");
}
function unescapedStringify(formDataDict) {
    const encodedData = Object.keys(formDataDict)
        .map((eachKey) => {
        return eachKey + "=" + formDataDict[eachKey];
    })
        .join("&");
    return encodedData;
}
function toJsonString(obj) {
    if (obj == null) {
        return null;
    }
    let json = JSON.stringify(obj);
    Object.keys(obj)
        .filter((key) => key[0] === "_")
        .forEach((key) => {
        json = json.replace(key, key.substring(1));
    });
    const reg = new RegExp('"_', "g");
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
    const qsOrBodyStr = qsOrBody
        ? httpMethod === "GET"
            ? "?" + (0, querystring_1.stringify)(qsOrBody)
            : toJsonString(qsOrBody)
        : "";
    const preHash = String(timestamp) + httpMethod + url + qsOrBodyStr;
    const NodeRSA = require("node-rsa");
    const priKey = new NodeRSA(secretKey);
    const sign = priKey.sign(preHash, "base64", "UTF-8");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9va3gvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWtCQSw0QkFzQkM7QUFVRCwwQkEwQkM7QUFXRCxvQ0FhQztBQVVELGdDQWtCQztBQUVELDhCQWVDO0FBakpELDZDQUF3QztBQUN4QyxtQ0FBb0M7QUFXcEM7Ozs7O0dBS0c7QUFDSCxTQUF3QixTQUFTLENBQy9CLFNBQWlCLEVBQUUsRUFDbkIsWUFBb0IsRUFBRSxFQUN0QixhQUFxQixFQUFFO0lBRXZCLE9BQU8sQ0FDTCxVQUFrQixFQUNsQixHQUFXLEVBQ1gsUUFBaUMsRUFDakMsTUFBTSxHQUFHLE9BQU8sRUFDaEIsRUFBRTtRQUNGLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0MsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUxRSxPQUFPO1lBQ0wsZ0JBQWdCLEVBQUUsVUFBVTtZQUM1QixxQkFBcUIsRUFBRSxTQUFTO1lBQ2hDLGVBQWUsRUFBRSxNQUFNO1lBQ3ZCLHNCQUFzQixFQUFFLFVBQVU7WUFDbEMsY0FBYyxFQUFFLGtCQUFrQjtTQUNuQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFnQixPQUFPLENBQ3JCLFVBQWtCLEVBQ2xCLEdBQVcsRUFDWCxRQUE2QyxFQUM3QyxTQUEwQixFQUMxQixTQUFpQjtJQUVqQixVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLElBQUksUUFBUSxJQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDRCxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNuRCxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxnSEFBZ0g7SUFDaEgsTUFBTSxXQUFXLEdBQUcsUUFBUTtRQUMxQixDQUFDLENBQUMsVUFBVSxLQUFLLEtBQUs7WUFDcEIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7WUFDcEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDMUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVQLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQztJQUVuRSxNQUFNLEdBQUcsR0FBRyxJQUFBLG1CQUFVLEVBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN4RCxPQUFPLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxZQUEwQztJQUNwRSxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNmLE9BQU8sT0FBTyxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVELFNBQWdCLFlBQVksQ0FBQyxHQUFXO0lBQ3RDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDYixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7U0FDL0IsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDZixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFnQixVQUFVLENBQ3hCLFVBQWtCLEVBQ2xCLEdBQVcsRUFDWCxRQUE2QyxFQUM3QyxTQUFpQixFQUNqQixTQUFpQjtJQUVqQixVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLE1BQU0sV0FBVyxHQUFHLFFBQVE7UUFDMUIsQ0FBQyxDQUFDLFVBQVUsS0FBSyxLQUFLO1lBQ3BCLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBQSx1QkFBUyxFQUFDLFFBQVEsQ0FBQztZQUMzQixDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUMxQixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1AsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDO0lBQ25FLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLElBQWtDO0lBQzFELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUM5QixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWQsTUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO0lBQ3pCLDJDQUEyQztJQUMzQyw2Q0FBNkM7SUFDN0MsSUFBSTtJQUNKLEtBQUssTUFBTSxJQUFJLElBQUksTUFBTSxFQUFFLENBQUM7UUFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyJ9