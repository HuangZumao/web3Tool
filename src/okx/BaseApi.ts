import getSigner, {apiHeader, toJsonString, sortByKey} from './util';
import {API_CONFIG} from './config';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import * as Console from 'console';
import {proxyConfig} from '../constant'
export class BaseApi{
    protected signer: (
        httpMethod: string,
        url: string,
        qsOrBody: NodeJS.Dict<any> | null,
        locale?: string
    ) => apiHeader

    constructor(
        apiKey: string,
        secretKey: string,
        passphrase: string,
        httpConfig: AxiosRequestConfig = {timeout: 3000}
    ) {
        this.axiosInstance = axios.create({
            baseURL: API_CONFIG.API_URL,
            proxy:proxyConfig,
            ...httpConfig
        })
        this.axiosInstance.interceptors.request.use((data) => {
            // if(data.data){
            //     data.data = toJsonString(data.data);
            // }
            if(data.params){
                data.params = sortByKey(data.params)
            }
            return data;
        })

        this.axiosInstance.interceptors.response.use(
            (data) => {
                return data.data;
            },
            (err) => {
                console.log(err.response)
                // Console.error(err.response.data)
                // throw err.response.data
                return err.response.data;
            }
        )
        this.signer = getSigner(apiKey, secretKey ,passphrase)
    }

    axiosInstance: AxiosInstance
}