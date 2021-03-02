<template>
  <div>
    <div v-if="value > 0">
      {{ $t("offsettingcommon.burn") }}:
      <b>{{ value | fromWei(decimals, symbol) }}</b>
    </div>
    <div v-else class="form-item d-table">
      <div class="d-table--cell align-vertical">
        <div class="m-r-15 loader-ring"></div>
      </div>
      <div class="d-table--cell align-vertical">
        {{ $t("offsettingcommon.load_result") }}
      </div>
    </div>
  </div>
</template>

<script>
import { Token } from "robonomics-js";
import { readRosbagIpfs } from "../../utils/utils";

export default {
  props: ["liability", "hash"],
  data() {
    return {
      value: 0,
      token: null,
      decimals: 0,
      symbol: ""
    };
  },
  created() {
    this.parseResult();
  },
  methods: {
    parseResult() {
      readRosbagIpfs(
        this.hash,
        bag => {
          if (bag.topic === `/liability/eth_${this.liability}/offset`) {
            this.value = bag.message.data;
          } else if (
            bag.topic === `/liability/eth_${this.liability}/offset_token`
          ) {
            this.token = new Token(this.$robonomics.web3, bag.message.data);
          }
        },
        {
          topics: [
            `/liability/eth_${this.liability}/offset`,
            `/liability/eth_${this.liability}/offset_token`
          ]
        }
      ).then(async () => {
        if (this.token) {
          this.decimals = await this.token.methods.decimals().call();
          this.symbol = await this.token.methods.symbol().call();
        }
      });
    }
  }
};
</script>
