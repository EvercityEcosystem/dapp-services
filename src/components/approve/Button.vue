<template>
  <button
    class="container-full btn-big"
    :disabled="loadingApprove || balance < cost"
    @click="sendApproveTrade"
  >
    {{ $t("approve.approve") }}
  </button>
</template>

<script>
import { Token } from "robonomics-js";

export default {
  props: ["address", "cost", "onInit", "onFetch"],
  data() {
    return {
      token: null,
      symbol: "",
      decimals: 0,
      balance: 0,
      allowance: 0,
      loadingApprove: false
    };
  },
  mounted() {
    this.initToken(this.address).then(this.fetchData);
  },
  methods: {
    async initToken(address) {
      this.token = new Token(this.$robonomics.web3, address);
      this.decimals = await this.token.methods.decimals().call();
      this.symbol = await this.token.methods.symbol().call();
      if (this.onInit) {
        this.onInit({
          decimals: this.decimals,
          symbol: this.symbol
        });
      }
    },
    async fetchData() {
      this.balance = await this.token.methods
        .balanceOf(this.$robonomics.account.address)
        .call();
      this.allowance = await this.token.methods
        .allowance(
          this.$robonomics.account.address,
          this.$robonomics.factory.address
        )
        .call();
      if (this.onFetch) {
        this.onFetch({
          balance: this.balance,
          allowance: this.allowance
        });
      }
    },
    sendApproveTrade() {
      this.loadingApprove = true;
      return this.token.methods
        .approve(this.$robonomics.factory.address, this.cost)
        .send({
          from: this.$robonomics.account.address
        })
        .then(() => {
          this.loadingApprove = false;
          return this.fetchData();
        })
        .catch(() => {
          this.loadingApprove = false;
        });
    }
  }
};
</script>
