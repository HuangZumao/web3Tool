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
exports.BitgetWsClient = exports.Listenner = void 0;
const events_1 = require("events");
const util_1 = require("../util");
const config_1 = require("../config");
const ws_1 = __importDefault(require("ws"));
const Console = __importStar(require("console"));
const WsLoginReq_1 = require("../model/ws/WsLoginReq");
const WsBaseReq_1 = require("../model/ws/WsBaseReq");
const contant_1 = require("../contant");
class Listenner {
}
exports.Listenner = Listenner;
class BitgetWsClient extends events_1.EventEmitter {
    constructor(callBack, apiKey, apiSecret, passphrase) {
        super();
        this.websocketUri = config_1.API_CONFIG.WS_URL;
        this.callBack = callBack;
        this.socket = new ws_1.default(config_1.API_CONFIG.WS_URL, {});
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.passphrase = passphrase;
        this.socket.on('open', () => this.onOpen());
        this.socket.on('close', (code, reason) => this.onClose(code, reason));
        this.socket.on('message', data => this.onMessage(data));
    }
    login() {
        const timestamp = Math.floor(Date.now() / 1000);
        let sign = (0, util_1.encrypt)('GET', '/user/verify', null, timestamp, this.apiSecret);
        if (config_1.API_CONFIG.SIGN_TYPE === contant_1.BIZ_CONSTANT.RSA) {
            sign = (0, util_1.encryptRSA)('GET', '/user/verify', null, timestamp, this.apiSecret);
        }
        const wsLoginReq = new WsLoginReq_1.WsLoginReq(this.apiKey, this.passphrase, timestamp.toString(), sign);
        const args = new Array();
        args.push(wsLoginReq);
        const request = new WsBaseReq_1.WsBaseReq('login', args);
        this.send(request);
    }
    subscribe(args) {
        const request = new WsBaseReq_1.WsBaseReq('subscribe', args);
        this.send(request);
    }
    unsubscribe(args) {
        const request = new WsBaseReq_1.WsBaseReq('unsubscribe', args);
        this.send(request);
    }
    send(messageObject) {
        const that = this;
        if (!this.socket)
            throw Error('socket is not open');
        const jsonStr = (0, util_1.toJsonString)(messageObject);
        Console.info('sendInfo:' + jsonStr);
        setInterval(() => {
            var _a;
            if (that.isOpen) {
                (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(jsonStr);
            }
        }, 1000);
    }
    onOpen() {
        this.isOpen = true;
        Console.info(`on open Connected to ${this.websocketUri}`);
        this.initTimer();
        this.emit('open');
    }
    initTimer() {
        this.interval = setInterval(() => {
            if (this.socket) {
                this.socket.send('ping');
            }
        }, 5000);
    }
    onMessage(data) {
        var _a;
        if (typeof data === 'string') {
            (_a = this.callBack) === null || _a === void 0 ? void 0 : _a.reveice(data);
        }
    }
    onClose(code, reason) {
        Console.log(`Websocket connection is closed.code=${code},reason=${reason}`);
        this.socket = undefined;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.emit('close');
    }
    close() {
        if (this.socket) {
            Console.log(`Closing websocket connection...`);
            this.socket.close();
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
            this.socket = undefined;
        }
    }
}
exports.BitgetWsClient = BitgetWsClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Z2V0V3NDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYml0Z2V0L3dzL0JpdGdldFdzQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFvQztBQUNwQyxrQ0FBMEQ7QUFDMUQsc0NBQXFDO0FBQ3JDLDRDQUEyQjtBQUMzQixpREFBbUM7QUFDbkMsdURBQWtEO0FBQ2xELHFEQUFnRDtBQUVoRCx3Q0FBd0M7QUFFeEMsTUFBc0IsU0FBUztDQUU5QjtBQUZELDhCQUVDO0FBRUQsTUFBYSxjQUFlLFNBQVEscUJBQVk7SUFVNUMsWUFBWSxRQUFrQixFQUFDLE1BQWMsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ2hGLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBVSxDQUFDLE1BQU0sQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksWUFBUyxDQUFDLG1CQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBRTdCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RF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