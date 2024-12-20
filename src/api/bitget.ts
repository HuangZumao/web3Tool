import { SpotWalletApi } from "../bitget/v2/SpotWalletApi";
import { bitget } from "../constant";
import { BitgetApi } from "../bitget/BitgetApi";
import { Request, Response } from "express";
const spotWalletApiInstance = new SpotWalletApi(
  bitget.apiKey,
  bitget.secretKey,
  bitget.passphrase,
);
const BitgetApiInstance = new BitgetApi(
  bitget.apiKey,
  bitget.secretKey,
  bitget.passphrase,
);
class bitgetApi {
  async getCoins(req: Request, res: Response) {
    try {
      let params = {};
      if (req.query.coin) params = { coin: req.query.coin };
      const { data } = await BitgetApiInstance.get(
        "/api/v2/spot/public/coins",
        params,
      );
      console.log(data);
      const coins: any[] = [];
      data.forEach((item: any) => {
        item.chains.forEach((chain: any) => {
          console.log(item);
          coins.push({
            coin: item.coin,
            chain: chain.chain,
            fee: chain.withdrawFee,
            logoLink: chain.browserUrl,
          });
        });
      });
      res.json(coins);
    } catch (error) {
      console.log(error);
    }
  }
  async getCoinBalance(req: Request, res: Response) {
    try {
      const { data } = await BitgetApiInstance.get(
        "/api/v2/spot/account/assets",
        req.query || {},
      );
      res.json(
        data.map((item: any) => ({ coin: item.coin, balance: item.available })),
      );
    } catch (error) {
      console.log(error);
    }
  }
  async withdrawal(req: Request, res: Response) {
    try {
      const body = req.body;
      const form: any = {
        coin: body.coin,
        transferType: "on_chain",
        chain: body.chain,
        address: body.address,
        size: body.size,
      };
      if (Object.values(form).find((item: any) => !item)) {
        res.json({
          code: 400,
          msg: "参数错误",
        });
        return;
      }
      const { data } = await spotWalletApiInstance.withdrawal(form);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new bitgetApi();
