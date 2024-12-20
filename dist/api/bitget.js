"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitgetApiInstance = exports.spotWalletApiInstance = void 0;
const SpotWalletApi_1 = require("../bitget/v2/SpotWalletApi");
const constant_1 = require("../constant");
const BitgetApi_1 = require("../bitget/BitgetApi");
exports.spotWalletApiInstance = new SpotWalletApi_1.SpotWalletApi(constant_1.bitget.apiKey, constant_1.bitget.secretKey, constant_1.bitget.passphrase);
exports.BitgetApiInstance = new BitgetApi_1.BitgetApi(constant_1.bitget.apiKey, constant_1.bitget.secretKey, constant_1.bitget.passphrase);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0Z2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS9iaXRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOERBQXdEO0FBQ3hELDBDQUFtQztBQUNuQyxtREFBOEM7QUFDakMsUUFBQSxxQkFBcUIsR0FBRyxJQUFJLDZCQUFhLENBQUMsaUJBQU0sQ0FBQyxNQUFNLEVBQUUsaUJBQU0sQ0FBQyxTQUFTLEVBQUUsaUJBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUM3RixRQUFBLGlCQUFpQixHQUFHLElBQUkscUJBQVMsQ0FBQyxpQkFBTSxDQUFDLE1BQU0sRUFBRSxpQkFBTSxDQUFDLFNBQVMsRUFBRSxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBIn0=