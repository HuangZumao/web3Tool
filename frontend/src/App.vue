<script setup>
import { message } from "ant-design-vue";
import { reactive, ref, watch } from "vue";
import axios from "axios";
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
const handleSubmit = async () => {
  try {
    if (Object.values(form.value).find((item) => !item))
      return message.error("请完善信息");
    loading.subMap = {};
    loading.submitLoading = true;
    await axios({
      method: "post",
      url: `/api/${platform.value}/withdrawal`,
      headers: {
        "Content-Type": "application/json",
      },
      data: form.value,
    });
    message.success("操作成功");
  } catch (e) {
  } finally {
    loading.submitLoading = false;
  }
};
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
    >
      <a-select-option v-for="item in chains" :value="item.chain">
        <div class="flex">
          <img class="w-20px object-contain" :src="item.logoLink" />
          <div>{{ item.chain }}</div>
        </div>
        <div>手续费：{{ item.fee }}{{ form.coin }}</div>
      </a-select-option>
    </a-select>
    <a-textarea
      v-if="form.coin"
      class="mb1"
      placeholder="输入地址，换行"
      v-model:value="form.address"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
    <div v-if="form.address" class="mb1">
      <div
        v-for="item in Array.from(
          new Set(form.address.split('\n').filter((item) => item)),
        )"
      >
        <a-tag>{{ item }}</a-tag>
      </div>
    </div>
    <a-input-number
      placeholder="输入数量"
      v-model:value="form.size"
    ></a-input-number>
    <div class="mb1"></div>
    <a-button @click="handleSubmit">确认</a-button>
  </div>
</template>

<style scoped></style>
