<template>
  <div>
    <button
      class="container-full btn-big"
      @click="submit"
      :disabled="objective != null"
    >{{$t('offsettingcommon.requestPrice')}}</button>
    <div v-if="responseError">{{responseError}}</div>
  </div>
</template>

<script>
import { genRosbagIpfs } from "../../utils/utils";

export default {
  props: ["model", "token", "validator", "submit", "onResponse"],
  data() {
    return {
      response: null,
      responseError: null,
      objective: null,
      onResult: null,
      onOffer: null
    };
  },
  methods: {
    getObjective(fields) {
      const payload = {};
      Object.keys(fields).forEach(field => {
        payload[field] = fields[field].value;
      });
      return genRosbagIpfs(payload);
    },
    listenResult() {
      if (this.onResult) {
        return;
      }
      this.onResult = this.$robonomics.onResult(msg => {
        if (
          msg.liability === this.$robonomics.account.address &&
          msg.result === this.objective
        ) {
          this.objective = null;
          this.responseError = "Energy consumption very small.";
        }
      });
      this.onOffer = this.$robonomics.onOffer(this.model, msg => {
        if (msg.objective === this.objective) {
          this.responseError = null;
          this.response = msg;
          this.onResponse(this.response);

          this.$robonomics.messenger.off(this.onResult);
          this.onResult = null;
          this.$robonomics.messenger.off(this.onOffer);
          this.onOffer = null;
        }
      });
    },
    requestPrice(e, fields) {
      this.objective = null;
      this.responseError = null;
      if (!e) {
        this.$robonomics.web3.eth.getBlock("latest", (e, r) => {
          if (e) {
            return;
          }
          this.getObjective(fields).then(objective => {
            this.listenResult();
            const demand = {
              model: this.model,
              objective,
              token: this.token,
              cost: 0,
              lighthouse: this.$robonomics.lighthouse.address,
              validator: this.validator,
              validatorFee: 0,
              deadline: r.number + 1000
            };
            this.$robonomics.sendDemand(demand, false, msg => {
              this.objective = msg.objective;
            });
          });
        });
      }
    }
  }
};
</script>
