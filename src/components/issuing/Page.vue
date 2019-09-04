<template>
  <fragment>
    <section class="section-light section-centered">
      <h2>{{$t('issuing.title')}}</h2>
      <Form ref="regForm" />
      <section>
        <div>
          <div v-if="demand">
            <section v-if="demand.status >= 2">
              <div class="form-item d-table" :class="{disabled: demand.status < 2}">
                <div class="d-table--cell align-vertical">
                  <div
                    class="m-r-15"
                    :class="{'i-check': demand.status >= 3, 'green': demand.status >= 3, 'loader-ring': demand.status == 2 || demand.status == 3, 'i-stop': demand.status < 2}"
                  ></div>
                </div>
                <div class="d-table--cell align-vertical">{{$t('issuing.broadcast')}}</div>
              </div>
              <div class="form-item d-table" :class="{disabled: demand.status < 4}">
                <div class="d-table--cell align-vertical">
                  <div
                    class="m-r-15"
                    :class="{'i-check': demand.status >= 4, 'green': demand.status >= 4, 'i-stop': demand.status < 4}"
                  ></div>
                </div>
                <div class="d-table--cell align-vertical">{{$t('issuing.responded')}}</div>
              </div>
              <div class="form-item d-table" :class="{disabled: demand.status < 4}">
                <div class="d-table--cell align-vertical">
                  <div
                    class="m-r-15"
                    :class="{'i-check': demand.status >= 6, 'green': demand.status >= 6, 'loader-ring': demand.status == 4 || demand.status == 5, 'i-stop': demand.status < 4}"
                  ></div>
                </div>
                <div class="d-table--cell align-vertical">
                  {{$t('issuing.contract')}}
                  <a
                    v-if="demand.status >= 6"
                    :href="demand.liability | urlExplorer"
                    target="_blank"
                  >{{$t('issuing.view_contract')}}</a>
                </div>
              </div>
              <div class="form-item d-table" :class="{disabled: demand.status < 6}">
                <div class="d-table--cell align-vertical">
                  <div
                    class="m-r-15"
                    :class="{'i-check': demand.status == 8, 'green': demand.status == 8, 'loader-ring': demand.status == 6 || demand.status == 7, 'i-stop': demand.status < 6}"
                  ></div>
                </div>
                <div class="d-table--cell align-vertical">{{$t('issuing.executed')}}</div>
              </div>
            </section>
          </div>

          <button
            v-if="!demand || demand.status < statuses.RESULT"
            class="container-full btn-big"
            :disabled="demand && demand.status != statuses.EMPTY && demand.status != statuses.RESULT"
            @click="order"
          >{{$t('issuing.order')}}</button>
          <div v-if="demand && demand.status === statuses.RESULT">
            {{$t('issuing.available')}}: {{sert.available | fromWei(sert.decimals, sert.symbol)}}
            <br />
            {{$t('issuing.balance')}}: {{sert.balance | fromWei(sert.decimals, sert.symbol)}}
            <br />
            <button
              class="container-full btn-big"
              :disabled="sert.available<=0 || watchMint"
              @click="mint"
            >{{$t('issuing.get_sertificate')}}</button>
          </div>
        </div>
      </section>
    </section>
  </fragment>
</template>

<script>
import { mapState } from "vuex";
import { watchTx } from "robonomics-js/lib/contract/utils/tools";
import Form from "./Form";
import config from "../../config";
import { genRosbagIpfs } from "../../utils/utils";
import ABI_EMITER from "../../abi/emitter.json";
import ABI_TOKEN from "../../abi/token.json";

export default {
  components: {
    Form
  },
  data() {
    return {
      liability: null,
      sert: {
        available: 0,
        balance: 0,
        decimals: 0,
        symbol: ""
      },
      emitter: null,
      watchMint: false,
      id: 0,
      nonce: 0
    };
  },
  computed: {
    ...mapState("sender", ["statuses"]),
    demand() {
      return this.$store.getters["sender/demandById"](this.id);
    }
  },
  watch: {
    demand: function(newDemand) {
      if (newDemand && newDemand.status === this.statuses.RESULT) {
        this.liability = newDemand.liability;
        this.getToken(result => {
          if (result[0] !== "0x0000000000000000000000000000000000000000") {
            this.sert.available = Number(result[1]);
            this.getBalance(result[0]);
          }
        });
      }
    }
  },
  created() {
    document.title = this.$t("issuing.title") + " | " + this.$t("title");
    this.emitter = this.$robonomics.web3.eth
      .contract(ABI_EMITER)
      .at(config.ROBONOMICS.emitter);
    this.$robonomics.factory.call
      .nonceOf(this.$robonomics.account.address)
      .then(r => {
        this.nonce = Number(r);
      });
  },
  methods: {
    getObjective() {
      const payload = {};
      Object.keys(this.$refs.regForm.form.fields).forEach(field => {
        payload[field] = this.$refs.regForm.form.fields[field].value;
      });
      return genRosbagIpfs(payload);
    },
    order() {
      if (this.$refs.regForm.validateForm()) {
        this.$robonomics.web3.eth.getBlock("latest", (e, r) => {
          if (e) {
            return;
          }
          this.getObjective().then(objective => {
            const demand = {
              model: config.ROBONOMICS.model.issuing,
              objective,
              token: this.$robonomics.xrt.address,
              cost: config.ROBONOMICS.price,
              lighthouse: this.$robonomics.lighthouse.address,
              validator: config.ROBONOMICS.validator.issuing,
              validatorFee: 0,
              deadline: r.number + 1000,
              nonce: this.nonce
            };

            this.$store.dispatch("sender/send", demand).then(id => {
              this.id = id;
            });
          });
        });
      }
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
                console.log("e", e);
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
