<template>
  <div>
    <button
      class="container-full btn-big"
      @click="submit"
      :disabled="objective != null || isRun"
    >
      {{ $t("carbonfootprintitaly.requestPrice") }}
    </button>
    <div v-if="responseError">{{ responseError }}</div>
  </div>
</template>

<script>
import { genRosbagIpfs } from "@/utils/utils";
import { addByFile } from "../add";
import model from "../model";

export default {
  props: ["model", "token", "validator", "submit", "onResponse"],
  data() {
    return {
      response: null,
      responseError: null,
      objective: null,
      onResult: null,
      onOffer: null,
      isRun: false,
    };
  },
  methods: {
    async getObjective(fields) {
      const payload = {};
      for (let field in fields) {
        const fieldHash = model.rosbag_scheme.find(
          (item) => item.suffix === `/${field}_hash`
        );
        if (fields[field].type === "file") {
          payload[field] = await addByFile(fields[field].value);
          if (fieldHash) {
            payload[`${field}_hash`] = payload[field];
          }
        } else if (fields[field].type === "files") {
          payload[field] = [];
          if (fieldHash) {
            payload[`${field}_hash`] = [];
          }
          for (let name in fields[field].items) {
            const hash = await addByFile(fields[field].items[name]);
            payload[field].push(hash);
            if (fieldHash) {
              payload[`${field}_hash`].push(hash);
            }
          }
        } else {
          payload[field] = fields[field].value;
          if (fieldHash) {
            payload[`${field}_hash`] = fields[field].value;
          }
        }
      }
      return genRosbagIpfs(payload);
    },
    listenResult() {
      if (this.onResult) {
        return;
      }
      this.onResult = this.$robonomics.onResult((msg) => {
        if (
          msg.liability === this.$robonomics.account.address &&
          msg.result === this.objective
        ) {
          this.objective = null;
          this.responseError = "Energy consumption very small.";
        }
      });
      this.onOffer = this.$robonomics.onOffer(this.model, (msg) => {
        console.log("offer", msg);
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
      this.isRun = true;
      this.objective = null;
      this.responseError = null;
      if (!e) {
        this.$robonomics.web3.eth.getBlock("latest", (e, r) => {
          if (e) {
            this.isRun = false;
            return;
          }
          this.getObjective(fields)
            .then((objective) => {
              this.listenResult();
              const demand = {
                model: this.model,
                objective,
                token: this.token,
                cost: 0,
                lighthouse: this.$robonomics.lighthouse.address,
                validator: this.validator,
                validatorFee: 0,
                deadline: r.number + 1000,
              };
              this.$robonomics.sendDemand(demand, false, (msg) => {
                this.objective = msg.objective;
              });
            })
            .catch(() => {
              this.isRun = false;
            });
        });
      } else {
        this.isRun = false;
      }
    },
  },
};
</script>
