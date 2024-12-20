"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApi = void 0;
const util_1 = __importStar(require("./util"));
const config_1 = require("./config");
const axios_1 = __importDefault(require("axios"));
const Console = __importStar(require("console"));
const constant_1 = require("../constant");
class BaseApi {
    constructor(apiKey, secretKey, passphrase, httpConfig = { timeout: 3000 }) {
        this.axiosInstance = axios_1.default.create(Object.assign({ baseURL: config_1.API_CONFIG.API_URL, proxy: constant_1.proxyConfig }, httpConfig));
        this.axiosInstance.interceptors.request.use((data) => {
            if (data.data) {
                data.data = (0, util_1.toJsonString)(data.data);
            }
            if (data.params) {
                data.params = (0, util_1.sortByKey)(data.params);
                // Console.log('sort_params:', data.params)
            }
            Console.log('request:', data.data || data.params);
            return data;
        });
        this.axiosInstance.interceptors.response.use((data) => {
            return data.data;
        }, (err) => {
            console.log(err);
            // Console.error(err.response.data)
            // throw err.response.data
            return err.response.data;
        });
        this.signer = (0, util_1.default)(apiKey, secretKey, passphrase);
    }
}
exports.BaseApi = BaseApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaXRnZXQvQmFzZUFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMkU7QUFDM0UscUNBQW9DO0FBQ3BDLGtEQUErRDtBQUMvRCxpREFBbUM7QUFDbkMsMENBQXVDO0FBQ3ZDLE1BQWEsT0FBTztJQVNoQixZQUNJLE1BQWMsRUFDZCxTQUFpQixFQUNqQixVQUFrQixFQUNsQixhQUFpQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUM7UUFFaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxlQUFLLENBQUMsTUFBTSxpQkFDN0IsT0FBTyxFQUFFLG1CQUFVLENBQUMsT0FBTyxFQUMzQixLQUFLLEVBQUMsc0JBQVcsSUFDZCxVQUFVLEVBQ2YsQ0FBQTtRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNqRCxJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQztnQkFDVixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUEsbUJBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUNELElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBQSxnQkFBUyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDcEMsMkNBQTJDO1lBQy9DLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNoRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3hDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQyxFQUNELENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLG1DQUFtQztZQUNuQywwQkFBMEI7WUFDMUIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUM3QixDQUFDLENBQ0osQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBQSxjQUFTLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUMxRCxDQUFDO0NBR0o7QUEvQ0QsMEJBK0NDIn0=