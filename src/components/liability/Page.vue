<template>
  <fragment>
    <section class="section-light section-centered">
      <h2>Пилотная выдача зеленых сертификатов в Сколково</h2>
      <section>
        <Passport :data="passport" />
        <div v-if="status">
          Balance: {{sert.balance | fromWei(sert.decimals, sert.symbol)}}
          <button
            class="container-full btn-big"
            :disabled="sert.available<=0 || watchMint"
            @click="mint"
          >get sertificate</button>
        </div>
        <div v-else class="form-item d-table">
          <div class="d-table--cell align-vertical">
            <div class="m-r-15 loader-ring"></div>
          </div>
          <div class="d-table--cell align-vertical">Smart contract is executed!</div>
        </div>
      </section>
    </section>
  </fragment>
</template>

<script>
import { Liability } from "robonomics-js";
import { watchTx } from "robonomics-js/lib/contract/utils/tools";
import iconv from "iconv-lite";
import Passport from "./Passport";
import { readRosbagIpfs } from "../../utils/utils";
import config from "../../config";
import ABI_EMITER from "../../abi/emitter.json";
import ABI_TOKEN from "../../abi/token.json";

export default {
  props: ["liability"],
  components: { Passport },
  data() {
    return {
      sert: {
        available: 0,
        balance: 0,
        decimals: 0,
        symbol: ""
      },
      passport: {
        objective: null,
        result: null,
        tx: null,
        token: null,
        promisor: null,
        email: null,
        log: null,
        mvt: null,
        period_start: null,
        period_end: null,
        promisee: null,
        type: null,
        info: null,
        power: null,
        gos: null,
        koef: null,
        name: null,
        location: null,
        id: null,
        dateObject: null
      },
      emitter: null,
      watchMint: false,
      status: 0
    };
  },
  created() {
    document.title = this.$t("liability.title") + " | " + this.$t("title");

    this.emitter = this.$robonomics.web3.eth
      .contract(ABI_EMITER)
      .at(config.ROBONOMICS.emitter);

    this.passport.liability = this.liability;
    const liability = new Liability(
      this.$robonomics.web3,
      this.liability,
      this.liability
    );
    liability
      .getInfo()
      .then(info => {
        this.passport.promisor = info.promisor;
        this.passport.result = info.result;
        this.passport.objective = info.objective;
        this.rosbagObjective();
        if (this.passport.result) {
          this.rosbagResult();
        } else {
          liability.onResult().then(result => {
            this.passport.result = result;
            this.rosbagResult();
          });
        }
      })
      .catch(() => {
        this.status = 0;
      });
  },
  methods: {
    rosbagObjective() {
      readRosbagIpfs(this.passport.objective, bag => {
        this.passport[bag.topic.replace(/\//, "")] = iconv.decode(
          Buffer.from(bag.message.data, "ascii"),
          "utf-8"
        );
      });
    },
    rosbagResult() {
      const li = this.passport.liability;
      readRosbagIpfs(this.passport.result, bag => {
        if (bag.topic === "/liability/eth_" + li + "/total_production") {
          this.passport.mvt = bag.message.data;
        } else if (bag.topic === "/liability/eth_" + li + "/token") {
          this.passport.token = bag.message.data;
        } else if (bag.topic === "/liability/eth_" + li + "/tx") {
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
        this.status = 1;

        this.getToken(result => {
          if (result[0] !== "0x0000000000000000000000000000000000000000") {
            this.sert.available = Number(result[1]);
            this.getBalance(result[0]);
          }
        });
      });
    },
    getToken(cb) {
      this.emitter.certificates(this.liability, (e, value) => {
        if (e) {
          console.log(e);
          return;
        }
        cb(value);
      });
    },
    getBalance(address) {
      const token = this.$robonomics.web3.eth.contract(ABI_TOKEN).at(address);
      token.balanceOf(this.$robonomics.account.address, (e, value) => {
        if (e) {
          console.log(e);
          return;
        }
        this.sert.balance = Number(value);
        token.symbol((e, symbol) => {
          if (e) {
            console.log(e);
            return;
          }
          this.sert.symbol = symbol;
          token.decimals((e, decimals) => {
            if (e) {
              console.log(e);
              return;
            }
            this.sert.decimals = Number(decimals);
          });
        });
      });
    },
    mint() {
      this.getToken(result => {
        if (result[0] !== "0x0000000000000000000000000000000000000000") {
          this.getBalance(result[0]);
          this.emitter.claimCertificate(
            this.liability,
            {
              from: this.$robonomics.account.address
            },
            (e, tx) => {
              if (e) {
                console.log(e);
                return;
              }
              this.watchMint = true;
              watchTx(this.$robonomics.web3, tx).then(() => {
                this.watchMint = false;
                this.sert.available = 0;
                this.getBalance(result[0]);
              });
            }
          );
        }
      });
    }
  }
};
</script>
