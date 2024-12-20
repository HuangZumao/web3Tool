"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotWalletApi = void 0;
const BaseApi_1 = require("../BaseApi");
class SpotWalletApi extends BaseApi_1.BaseApi {
    transfer(qsOrBody) {
        const url = '/api/v2/spot/wallet/transfer';
        const headers = this.signer('POST', url, qsOrBody);
        return this.axiosInstance.post(url, qsOrBody, { headers });
    }
    depositAddress(qsOrBody) {
        const url = '/api/v2/spot/wallet/deposit-address';
        const headers = this.signer('GET', url, qsOrBody);
        return this.axiosInstance.get(url, { headers, params: qsOrBody });
    }
    withdrawal(qsOrBody) {
        const url = '/api/v2/spot/wallet/withdrawal';
        const headers = this.signer('POST', url, qsOrBody);
        return this.axiosInstance.post(url, qsOrBody, { headers });
    }
    withdrawalRecords(qsOrBody) {
        const url = '/api/v2/spot/wallet/withdrawal-records';
        const headers = this.signer('GET', url, qsOrBody);
        return this.axiosInstance.get(url, { headers, params: qsOrBody });
    }
    depositRecords(qsOrBody) {
        const url = '/api/v2/spot/wallet/deposit-records';
        const headers = this.signer('GET', url, qsOrBody);
        return this.axiosInstance.get(url, { headers, params: qsOrBody });
    }
}
exports.SpotWalletApi = SpotWalletApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdFdhbGxldEFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaXRnZXQvdjIvU3BvdFdhbGxldEFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBbUM7QUFFbkMsTUFBYSxhQUFjLFNBQVEsaUJBQU87SUFFdEMsUUFBUSxDQUFDLFFBQWdCO1FBQ3JCLE1BQU0sR0FBRyxHQUFHLDhCQUE4QixDQUFDO1FBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNsRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBQzVELENBQUM7SUFFRCxjQUFjLENBQUMsUUFBZ0I7UUFDM0IsTUFBTSxHQUFHLEdBQUcscUNBQXFDLENBQUM7UUFDbEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFFRCxVQUFVLENBQUMsUUFBZ0I7UUFDdkIsTUFBTSxHQUFHLEdBQUcsZ0NBQWdDLENBQUM7UUFDN0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ2xELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELGlCQUFpQixDQUFDLFFBQWdCO1FBQzlCLE1BQU0sR0FBRyxHQUFHLHdDQUF3QyxDQUFDO1FBQ3JELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNqRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0lBRUQsY0FBYyxDQUFDLFFBQWdCO1FBQzNCLE1BQU0sR0FBRyxHQUFHLHFDQUFxQyxDQUFDO1FBQ2xELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNqRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0NBQ0o7QUEvQkQsc0NBK0JDIn0=