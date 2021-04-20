<template>
  <Page>
    <h2>{{ $t("validator.title") }}</h2>
    <section v-if="ready" class="section-light section-centered">
      <div>
        <section v-if="passport.status == 'load'">
          <div class="loader">
            <div class="loader-ring align-vertical m-r-15"></div>
            <b class="align-vertical t-style_uppercase">{{
              $t("validator.awaiting")
            }}</b>
          </div>
        </section>
        <section v-else-if="passport.status == 'liability'">
          <section>
            <div class="form-item form-line-label">
              <label>{{ $t("validator.passport.liability") }}</label>
              <RChainExplorer :address="passport.liability" />
            </div>
          </section>
          <div class="loader">
            <div class="loader-ring align-vertical m-r-15"></div>
            <b class="align-vertical t-style_uppercase">{{
              $t("validator.load")
            }}</b>
          </div>
        </section>
        <div v-else>
          <Passport :data="passport" />
          <section v-if="passport.status != 'new'">
            <hr />
            <h2>{{ $t("validator.status") }}</h2>
            <div v-if="passport.status == 'confirm'" class="form-item d-table">
              <div class="d-table--cell align-vertical">
                <div class="m-r-15 loader-ring"></div>
              </div>
              <div class="d-table--cell align-vertical">
                {{ $t("validator.awaiting_confirmation") }}
              </div>
            </div>
            <div v-if="passport.status == 'drop'" class="form-item d-table">
              <div class="d-table--cell align-vertical">
                <div class="m-r-15 i-stop"></div>
              </div>
              <div class="d-table--cell align-vertical">
                {{ $t("validator.rejected") }}
              </div>
            </div>
            <div v-if="passport.status == 'finish'" class="form-item d-table">
              <div class="d-table--cell align-vertical">
                <div class="m-r-15 i-check green"></div>
              </div>
              <div class="d-table--cell align-vertical">
                {{ $t("validator.confirmed") }}
              </div>
            </div>
          </section>
          <section v-if="passport.status == 'new'">
            <div class="form-line-btns">
              <button
                class="btn-big btn-green"
                @click="confirm(passport.liability, true)"
                :disabled="$wait.is(actionTx)"
              >
                <span>{{ $t("validator.confirm") }}</span>
              </button>
              <button
                class="btn-big"
                v-if="!$wait.is(actionTx)"
                @click="confirm(passport.liability, false)"
              >
                <span>{{ $t("validator.reject") }}</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </section>
  </Page>
</template>

<script>
import { Liability } from "robonomics-js";
import Page from "../components/layout/Page";
import Passport from "../components/validator/Passport";
import { tools } from "../utils/ipfs";
import rosBag from "../utils/rosBag";
import config from "~config";

export default {
  components: { Page, Passport },
  data() {
    return {
      ready: false,
      account: "",
      actionTx: "",
      passport: {
        status: "load",
        liability: null,
        email: null,
        promisee: null,
        log: null,
        mvt: null,
        name: null,
        location: null,
        dateObject: null,
        type: null,
        info: null,
        power: null,
        koef: null,
        id: null,
        gos: null,
        token: null,
        tx: null,
        promisor: null,
        period_start: null,
        period_end: null,
        objective: null,
        result: null
      }
      // passport: {
      //   status: "drop",
      //   liability: "0x0",
      //   email: "null",
      //   promisee: "null",
      //   log: "null",
      //   mvt: "null",
      //   name: "null",
      //   location: "null",
      //   dateObject: "null",
      //   type: "null",
      //   info: "null",
      //   power: "null",
      //   koef: "null",
      //   id: "null",
      //   gos: "null",
      //   token: "null",
      //   tx: "null",
      //   promisor: "null",
      //   period_start: "null",
      //   period_end: "null",
      //   objective: "null",
      //   result: "null"
      // }
      // passport: {
      //   status: "new",
      //   liability: "0x0",
      //   email: "null",
      //   promisee: "null",
      //   log: "null",
      //   mvt: "null",
      //   name: "null",
      //   location: "null",
      //   dateObject: "null",
      //   type: "null",
      //   info: "null",
      //   power: "null",
      //   koef: "null",
      //   id: "null",
      //   gos: "null",
      //   token: "null",
      //   tx: "null",
      //   promisor: "null",
      //   period_start: "null",
      //   period_end: "null",
      //   objective: "null",
      //   result: "null"
      // }
    };
  },
  mounted() {
    document.title = this.$t("title");

    if (this.$robonomics.account) {
      this.account = this.$robonomics.account.address;
      const cf = config.chain.get();
      this.$robonomics.onResult(msg => {
        console.log("result unverified", msg);
        if (this.passport.liability === null) {
          const liability = new Liability(
            this.$robonomics.web3,
            msg.liability,
            "0x0000000000000000000000000000000000000000"
          );
          liability.getInfo().then(info => {
            console.log("info2", info);
            if (
              info.model === config.ROBONOMICS.model.issuing &&
              info.validator ===
                this.$robonomics.web3.toChecksumAddress(cf.validator.issuing)
            ) {
              this.passport.liability = this.$robonomics.web3.toChecksumAddress(
                liability.address
              );
              this.passport.promisor = info.promisor;
              this.passport.result = msg.result;
              this.passport.objective = info.objective;
              this.passport.status = "liability";
              this.rosbag();
            }
          });
        }
      });
      this.ready = true;
    } else {
      this.$store.dispatch("chain/accessAccount", false);
    }
  },
  methods: {
    async rosbagObjective() {
      const r = await tools.cat(this.passport.objective);
      rosBag(
        new Blob([r]),
        bag => {
          this.passport[bag.topic.replace(/\//, "")] = bag.message.data;
        },
        {}
      ).then(() => {
        this.passport.status = "new";
      });
    },
    async rosbag() {
      const li = this.passport.liability;
      const r = await tools.cat(this.passport.result);
      rosBag(new Blob([r]), bag => {
        if (bag.topic === "/liability/eth_" + li + "/total_production") {
          this.passport.mvt = bag.message.data;
        } else if (bag.topic === "/liability/eth_" + li + "/token") {
          this.passport.token = bag.message.data;
        } else if (bag.topic === "/liability/eth_" + li + "/txhash") {
          this.passport.tx = bag.message.data;
        } else if (bag.topic === "/liability/eth_" + li + "/period_start") {
          this.passport.period_start = new Date(
            Number(bag.message.data) * 1000
          ).toDateString();
        } else if (bag.topic === "/liability/eth_" + li + "/period_end") {
          this.passport.period_end = new Date(
            Number(bag.message.data) * 1000
          ).toDateString();
        }
      }).then(() => {
        this.rosbagObjective();
      });
    },
    confirm(address, status) {
      if (!status) {
        this.passport.status = "drop";
        return;
      }
      this.$robonomics
        .sendResult({
          liability: address,
          success: true,
          result: this.passport.result
        })
        .then(() => {
          this.passport.status = "confirm";
          const liability = new Liability(
            this.$robonomics.web3,
            address,
            "0x0000000000000000000000000000000000000000"
          );
          liability.onResult().then(() => {
            this.passport.status = "finish";
          });
        });
    }
  }
};
</script>
