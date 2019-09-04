<template>
  <fragment>
    <section class="section-light section-centered">
      <h2>{{$t('offsetting.title')}}</h2>
      <Form :isDisabled="objective != null" ref="regForm" />
      <div v-if="error">{{error}}</div>
      <section>
        <div>
          <div v-if="offer">
            <p>
              {{$t('offsetting.agent')}}:
              <LinkExplorer :text="offer.sender" />
            </p>
            <p>
              {{$t('offsetting.objective')}}:
              <LinkExplorer :text="offer.objective" type="ipfs" />
            </p>
            <p>
              {{$t('offsetting.token')}}:
              <LinkExplorer :text="offer.token" category="token" />
            </p>

            <div v-if="cost > 0" style="margin-bottom:10px">
              {{$t('offsetting.cost')}}: {{cost | fromWei(tokenInfo.decimals, tokenInfo.symbol)}} |
              {{$t('offsetting.balance')}}: {{balance | fromWei(tokenInfo.decimals, tokenInfo.symbol)}} |
              {{$t('offsetting.approved')}}: {{allowance | fromWei(tokenInfo.decimals, tokenInfo.symbol)}}
            </div>
            <button
              v-if="allowance < cost && !demand"
              class="container-full btn-big"
              :disabled="loadingApprove || balance < cost"
              @click="sendApproveTrade"
            >{{$t('offsetting.approve')}}</button>

            <div v-if="demand">
              <section v-if="demand.status >= 2">
                <div class="form-item d-table">
                  <div class="d-table--cell align-vertical">
                    <div
                      class="m-r-15"
                      :class="{'i-check': demand.status >= 6, 'green': demand.status >= 6, 'loader-ring': demand.status == 3 || demand.status == 4 || demand.status == 5, 'i-stop': demand.status < 3}"
                    ></div>
                  </div>
                  <div class="d-table--cell align-vertical">
                    {{$t('offsetting.contract')}}
                    <a
                      v-if="demand.status >= 6"
                      :href="demand.liability | urlExplorer"
                      target="_blank"
                    >{{$t('offsetting.view_contract')}}</a>
                  </div>
                </div>
                <div class="form-item d-table" :class="{disabled: demand.status < 6}">
                  <div class="d-table--cell align-vertical">
                    <div
                      class="m-r-15"
                      :class="{'i-check': demand.status == 8, 'green': demand.status == 8, 'loader-ring': demand.status == 6 || demand.status == 7, 'i-stop': demand.status < 6}"
                    ></div>
                  </div>
                  <div class="d-table--cell align-vertical">{{$t('offsetting.executed')}}</div>
                </div>
              </section>
            </div>
            <div v-if="demand && demand.status == statuses.RESULT">
              <div v-if="burn.value > 0">
                {{$t('offsetting.burn')}}:
                <b>{{burn.value | fromWei(burn.decimals, burn.symbol)}}</b>
              </div>
              <div v-else class="form-item d-table">
                <div class="d-table--cell align-vertical">
                  <div class="m-r-15 loader-ring"></div>
                </div>
                <div class="d-table--cell align-vertical">{{$t('offsetting.load_result')}}</div>
              </div>
            </div>

            <button
              v-if="allowance >= cost && (!demand || demand.status < statuses.RESULT)"
              class="container-full btn-big"
              :disabled="demand && demand.status != statuses.EMPTY && demand.status != statuses.RESULT"
              @click="order"
            >{{$t('offsetting.order')}}</button>
          </div>
          <button
            v-else
            class="container-full btn-big"
            @click="request"
            :disabled="objective != null"
          >{{$t('offsetting.request')}}</button>
        </div>
      </section>
    </section>
  </fragment>
</template>

<script>
import { mapState } from "vuex";
import { Token } from "robonomics-js";
import Form from "./Form";
import config from "../../config";
import { genRosbagIpfs, readRosbagIpfs } from "../../utils/utils";

export default {
  components: {
    Form
  },
  data() {
    return {
      offer: null,
      objective: null,
      id: 0,
      nonce: 0,

      token: null,
      tokenInfo: {
        symbol: "",
        decimals: 0
      },
      cost: 0,
      balance: 0,
      allowance: 0,
      burn: {
        value: 0,
        token: null,
        decimals: 0,
        symbol: ""
      },
      loadingApprove: false,
      error: null
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
        this.fetchData();
        this.parseResult(newDemand.liability, newDemand.result.result);
      }
    }
  },
  created() {
    document.title = this.$t("offsetting.title") + " | " + this.$t("title");
    this.$robonomics.factory.call
      .nonceOf(this.$robonomics.account.address)
      .then(r => {
        this.nonce = Number(r);
      });

    this.$robonomics.onResult(msg => {
      if (
        msg.liability === this.$robonomics.account.address &&
        msg.result === this.objective
      ) {
        this.objective = null;
        this.error = "Energy consumption very small.";
      }
    });

    this.$robonomics.onOffer(config.ROBONOMICS.model.offsetting, msg => {
      if (msg.objective === this.objective) {
        this.error = null;
        this.offer = msg;
        this.cost = this.offer.cost;
        this.initToken(this.offer.token).then(this.fetchData);
      }
    });
  },
  methods: {
    async initToken(address) {
      this.token = new Token(this.$robonomics.web3, address);
      this.tokenInfo.decimals = await this.token.call.decimals();
      this.tokenInfo.symbol = await this.token.call.symbol();
    },
    async fetchData() {
      this.balance = await this.token.call.balanceOf(
        this.$robonomics.account.address
      );
      this.allowance = await this.token.call.allowance(
        this.$robonomics.account.address,
        this.$robonomics.factory.address
      );
    },
    sendApproveTrade() {
      this.loadingApprove = true;
      return this.token.send
        .approve(this.$robonomics.factory.address, this.cost, {
          from: this.$robonomics.account.address
        })
        .then(() => {
          this.loadingApprove = false;
          return this.fetchData();
        })
        .catch(() => {
          this.loadingApprove = false;
        });
    },
    parseResult(liability, hash) {
      readRosbagIpfs(
        hash,
        bag => {
          if (bag.topic === `/liability/eth_${liability}/offset`) {
            this.burn.value = bag.message.data;
          } else if (bag.topic === `/liability/eth_${liability}/offset_token`) {
            this.burn.token = new Token(
              this.$$robonomics.web3,
              bag.message.data
            );
          }
        },
        {
          topics: [
            `/liability/eth_${liability}/offset`,
            `/liability/eth_${liability}/offset_token`
          ]
        }
      ).then(async () => {
        this.burn.decimals = await this.burn.token.call.decimals();
        this.burn.symbol = await this.burn.token.call.symbol();
      });
    },
    getObjective() {
      const payload = {};
      Object.keys(this.$refs.regForm.form.fields).forEach(field => {
        payload[field] = this.$refs.regForm.form.fields[field].value;
      });
      return genRosbagIpfs(payload);
    },
    order() {
      const demand = {
        model: this.offer.model,
        objective: this.offer.objective,
        token: this.offer.token,
        cost: this.offer.cost,
        lighthouse: this.offer.lighthouse,
        validator: this.offer.validator,
        validatorFee: 0,
        deadline: this.offer.deadline,
        nonce: this.nonce
      };
      this.$store
        .dispatch("sender/send", { demand, hasOffer: true, timeout: false })
        .then(id => {
          this.id = id;
        });
    },
    request() {
      this.objective = null;
      this.error = null;
      if (this.$refs.regForm.validateForm()) {
        this.$robonomics.web3.eth.getBlock("latest", (e, r) => {
          if (e) {
            return;
          }
          this.getObjective().then(objective => {
            const demand = {
              model: config.ROBONOMICS.model.offsetting,
              objective,
              token: config.ROBONOMICS.token.offsetting,
              cost: 0,
              lighthouse: this.$robonomics.lighthouse.address,
              validator: config.ROBONOMICS.validator.offsetting,
              validatorFee: 0,
              deadline: r.number + 1000,
              nonce: this.nonce
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
