import { okx } from "../constant";
import { OkxApi } from "../okx/okxApi";
import { Request, Response } from "express";
export const okxApiInstance = new OkxApi(
  okx.apiKey,
  okx.secretKey,
  okx.passphrase,
);

class okxApi {
  async getCoins(req: Request, res: Response) {
    try {
      let params = {};
      if (req.query.coin) params = { ccy: req.query.coin };
      const { data } = await okxApiInstance.get(
        "/api/v5/asset/currencies",
        params,
      );
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async getCoinBalance(req: Request, res: Response) {
    try {
      const { data } = await okxApiInstance.get(
        "/api/v5/asset/balances",
        req.query || {},
      );
      res.json(
        data.map((item: any) => ({ coin: item.ccy, balance: item.bal })),
      );
    } catch (error) {
      console.log(error);
    }
  }
  async withdrawal(req: Request, res: Response) {
    try {
      const body = req.body;
      const form: any = {
        ccy: body.coin,
        dest: "4",
        chain: body.chain,
        toAddr: body.address,
        amt: body.size,
      };
      if (Object.values(form).find((item: any) => !item)) {
        res.json({
          code: 400,
          msg: "参数错误",
        });
        return;
      }
      const res2 = await okxApiInstance.post("/api/v5/asset/withdrawal", form);
      console.log(res2);
      res.json(res2);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new okxApi();
