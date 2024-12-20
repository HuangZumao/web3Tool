// 不检查ts
// @ts-nocheck

// 领水  0x477B8766251C98aD00BE7b2CE64F8a4649003d9C
import axios from "axios";

/*
curl ^"https://faucet.testnet.humanity.org/api/claim^" ^
-H ^"accept: *!/!*^" ^
-H ^"accept-language: zh-CN,zh;q=0.9^" ^
-H ^"content-type: application/json^" ^
-H ^"origin: https://faucet.testnet.humanity.org^" ^
-H ^"priority: u=1, i^" ^
-H ^"referer: https://faucet.testnet.humanity.org/^" ^
-H ^"sec-ch-ua: ^\^"Google Chrome^\^";v=^\^"131^\^", ^\^"Chromium^\^";v=^\^"131^\^", ^\^"Not_A Brand^\^";v=^\^"24^\^"^" ^
-H ^"sec-ch-ua-mobile: ?0^" ^
-H ^"sec-ch-ua-platform: ^\^"Windows^\^"^" ^
-H ^"sec-fetch-dest: empty^" ^
-H ^"sec-fetch-mode: cors^" ^
-H ^"sec-fetch-site: same-origin^" ^
-H ^"user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36^" ^
--data-raw ^"^{^\^"address^\^":^\^"0x477B8766251C98aD00BE7b2CE64F8a4649003d9C^\^"^}^"*/
// 模拟浏览器上访问
const getClamie = async () => {
  try {
    const { data } = await axios({
      method: "post",
      url: "https://faucet.testnet.humanity.org/api/claim",
      data: {
        address: "0x477B8766251C98aD00BE7b2CE64F8a4649003d9C",
      },
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "content-type": "application/json",
        origin: "https://faucet.testnet.humanity.org",
        priority: "u=1, i",
        referer: "https://faucet.testnet.humanity.org/",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
    });
    console.log("领取成功");

    // 随机2-10分钟能领取一次
    setTimeout(
      () => {
        getClamie();
      },
      Math.floor(Math.random() * 10 + 2) * 60 * 1000,
    );
  } catch (e) {
    console.log(e.response);
  }
};
getClamie();
