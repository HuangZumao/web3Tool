export interface apiHeader {
    "OK-ACCESS-SIGN": string;
    "OK-ACCESS-TIMESTAMP": number | string;
    "OK-ACCESS-KEY": string;
    "OK-ACCESS-PASSPHRASE": string;
}
/**
 * 获取签名器
 * @param apiKey
 * @param secretKey
 * @param passphrase
 */
export default function getSigner(apiKey?: string, secretKey?: string, passphrase?: string): (httpMethod: string, url: string, qsOrBody: NodeJS.Dict<any> | null, locale?: string) => {
    "OK-ACCESS-SIGN": string;
    "OK-ACCESS-TIMESTAMP": string;
    "OK-ACCESS-KEY": string;
    "OK-ACCESS-PASSPHRASE": string;
    "Content-Type": string;
};
/**
 * 加密算法
 * @param httpMethod
 * @param url
 * @param qsOrBody
 * @param timestamp
 * @param secretKey
 */
export declare function encrypt(httpMethod: string, url: string, qsOrBody: NodeJS.Dict<string | number> | null, timestamp: number | string, secretKey: string): string;
export declare function toJsonString(obj: object): string | null;
/**
 * RSA加密算法
 * @param httpMethod
 * @param url
 * @param qsOrBody
 * @param timestamp
 * @param secretKey
 */
export declare function encryptRSA(httpMethod: string, url: string, qsOrBody: NodeJS.Dict<string | number> | null, timestamp: number, secretKey: string): any;
export declare function sortByKey(dict: NodeJS.Dict<string | number>): any;
