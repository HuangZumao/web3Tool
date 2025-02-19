<script setup>
import { message } from "ant-design-vue";
import { computed, reactive, ref, watch } from "vue";
import axios from "axios";
import { sleep } from "./utils/index.js";
const showMessage = () => {
  message.success("hello");
};
const platform = ref("okx");
let chainMap = {};
const getCoins = async () => {
  try {
    const { data } = await axios({
      method: "get",
      url: `/api/${platform.value}/getCoinBalance`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    myCoins.value = data;
    if (!data.length) {
      message.error("没有可用的币");
    }
  } catch (e) {
  } finally {
  }
};
const myCoins = ref([]);
const form = ref({ coin: null, chain: null });
const loading = reactive({
  chainLoading: false,
  balLoading: false,
});
const chains = ref([]);
watch(
  () => form.value.coin,
  async () => {
    form.value.chain = null;
    if (chainMap[form.value.coin])
      return (chains.value = chainMap[form.value.coin]);
    try {
      const { data } = await axios({
        method: "get",
        url: `/api/${platform.value}/getCoins`,
        headers: {
          "Content-Type": "application/json",
        },
        params: { coin: form.value.coin },
      });
      if (!data.length) return message.error("没有可用的链");
      chainMap[form.value.coin] = data;
      chains.value = data;
    } catch (e) {}
  },
);
const addressInput = ref("");
const addressArr = ref([]);
watch(addressInput, (newV) => {
  if (!newV) addressArr.value = [];
  addressArr.value = Array.from(
    new Set(newV.split("\n").filter((item) => item)),
  ).map((item) => {
    return {
      address: item,
    };
  });
});
const handleWithdrawal = async (item) => {
  try {
    item.sleeping = item.waitTime;
    await sleep(item.sleeping * 1000);
    item.sleeping = 0;
    item.loading = true;
    await axios({
      method: "post",
      url: `/api/${platform.value}/withdrawal`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        coin: form.value.coin,
        size: item.size,
        chain: form.value.chain,
        address: item.address,
      },
    });
    item.success = true;
  } catch (e) {
    item.error = e.message;
  } finally {
    item.loading = false;
  }
};
const handleAdd = () => {
  if (Object.values(form.value).find((item) => !item))
    return message.error("请完善信息");
  if (!addressArr.value.length) return message.error("请输入地址");
  const { minCoin, maxCoin, minTime, maxTime } = form.value;
  addressArr.value.forEach((item) => {
    item.size = Number(
      (minCoin + (maxCoin - minCoin) * Math.random()).toFixed(5),
    );
    item.waitTime = Math.random() * (maxTime - minTime) + minTime;
  });
};
const handleSubmit = async (address) => {
  try {
    loading.submitLoading = true;
    if (Object.values(form.value).find((item) => !item))
      return message.error("请完善信息");
    if (!addressArr.value.length) return message.error("请输入地址");
    await Promise.all(
      addressArr.value.map((item) => {
        return handleWithdrawal(item);
      }),
    );
  } catch (e) {
  } finally {
    loading.submitLoading = false;
  }
};
const totalCoins = computed(() => {
  return addressArr.value.reduce((pre, cur) => pre + cur.size, 0);
});
</script>

<template>
  <div>
    <div>
      <a-radio-group size="large" v-model:value="platform">
        <a-radio-button value="okx">Okx</a-radio-button>
        <a-radio-button value="bitget">Bitget</a-radio-button>
      </a-radio-group>
    </div>
    <a-button
      :loading="loading.balLoading"
      class="mt1"
      type="primary"
      @click="getCoins"
      >Get Coins</a-button
    >
    <div>
      <a-tag v-for="item in myCoins" @click="form.coin = item.coin">
        {{ item.coin }}-{{ item.balance }}
      </a-tag>
    </div>
    <a-select
      v-if="myCoins.length"
      v-model:value="form.coin"
      style="width: 300px"
      placeholder="选择币种"
      :options="myCoins.map((item) => ({ label: item.coin, value: item.coin }))"
    ></a-select>
    <div class="mb1"></div>
    <a-select
      placeholder="选择网络"
      v-if="form.coin"
      v-model:value="form.chain"
      style="width: 300px"
      @change="
        (value, option) => {
          form.fee = option.fee;
        }
      "
    >
      <a-select-option
        v-for="item in chains"
        :value="item.chain"
        :fee="item.fee"
      >
        <div class="flex">
          <img class="w-20px object-contain" :src="item.logoLink" />
          <div>{{ item.chain }}</div>
        </div>
        <div>手续费：{{ item.fee }}{{ form.coin }}</div>
        <div>最小提币数：{{ item.minWd }}</div>
      </a-select-option>
    </a-select>
    <a-textarea
      v-if="form.coin"
      class="mb1"
      placeholder="输入地址，换行"
      v-model:value="addressInput"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
    <div v-if="addressInput" class="mb1">
      <div v-for="item in addressArr" :key="item.address">
        <a-tag>{{ item.address }}</a-tag>
        <a-tag v-if="item.sleeping">等待中---{{ item.sleeping }}s</a-tag>
        <a-tag v-if="item.loading">提现中 <a-spin></a-spin></a-tag>
        <a-tag v-if="item.success" color="success">成功</a-tag>
        <a-tag v-if="item.error" color="error">失败{{ item.error }}</a-tag>
        <a-input
          class="w-100px"
          v-model:value="item.size"
          placeholder="提币数"
        ></a-input>
        <a-input
          class="w-100px ml-1"
          v-model:value="item.waitTime"
          placeholder="睡眠时间"
        ></a-input>
      </div>
    </div>
    <div>
      输入数量:
      <a-input-number
        placeholder="最小"
        v-model:value="form.minCoin"
      ></a-input-number
      >-
      <a-input-number
        placeholder="最大"
        v-model:value="form.maxCoin"
      ></a-input-number>

      间隔时间
      <a-input-number
        placeholder="最小"
        v-model:value="form.minTime"
      ></a-input-number
      >-
      <a-input-number
        placeholder="最大"
        v-model:value="form.maxTime"
      ></a-input-number>
      <a-button class="ml-2" @click="handleAdd"> 确认</a-button>
    </div>

    <div class="mb1">
      总coin：{{ totalCoins }} 总gas：{{ form.fee * addressArr.length }}
      <br />
      共需: {{ totalCoins + form.fee * addressArr.length }}
    </div>

    <a-button @click="handleSubmit">提币</a-button>
  </div>
</template>

<style scoped></style>
