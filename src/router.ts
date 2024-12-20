import express from "express";
import okxApi from "./api/okx";
import bitgetApi from "./api/bitget";
const router = express.Router();
router.get("/okx/getCoins", okxApi.getCoins);
router.get("/okx/getCoinBalance", okxApi.getCoinBalance);
router.post("/okx/withdrawal", okxApi.withdrawal);

router.get("/bitget/getCoins", bitgetApi.getCoins);
router.get("/bitget/getCoinBalance", bitgetApi.getCoinBalance);
router.post("/bitget/withdrawal", bitgetApi.withdrawal);
export default router;
