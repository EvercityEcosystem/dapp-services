<template>
  <fragment>
    <section class="section-light section-centered">
      <h2>Registration</h2>
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
                <div class="d-table--cell align-vertical">Message broadcast</div>
              </div>
              <div class="form-item d-table" :class="{disabled: demand.status < 4}">
                <div class="d-table--cell align-vertical">
                  <div
                    class="m-r-15"
                    :class="{'i-check': demand.status >= 4, 'green': demand.status >= 4, 'i-stop': demand.status < 4}"
                  ></div>
                </div>
                <div class="d-table--cell align-vertical">Service responded to demand</div>
              </div>
              <div class="form-item d-table" :class="{disabled: demand.status < 4}">
                <div class="d-table--cell align-vertical">
                  <div
                    class="m-r-15"
                    :class="{'i-check': demand.status >= 6, 'green': demand.status >= 6, 'loader-ring': demand.status == 4 || demand.status == 5, 'i-stop': demand.status < 4}"
                  ></div>
                </div>
                <div class="d-table--cell align-vertical">
                  A smart contract has been created, we are waiting for the robot to execute the service.
                  <a
                    v-if="demand.status >= 6"
                    :href="demand.liability | urlExplorer"
                    target="_blank"
                  >View contact.</a>
                </div>
              </div>
              <div class="form-item d-table" :class="{disabled: demand.status < 6}">
                <div class="d-table--cell align-vertical">
                  <div
                    class="m-r-15"
                    :class="{'i-check': demand.status == 8, 'green': demand.status == 8, 'loader-ring': demand.status == 6 || demand.status == 7, 'i-stop': demand.status < 6}"
                  ></div>
                </div>
                <div class="d-table--cell align-vertical">Smart contract is executed!</div>
              </div>
            </section>
          </div>

          <button
            v-if="!demand || demand.status < statuses.RESULT"
            class="container-full btn-big"
            :disabled="btn || (demand && demand.status != statuses.EMPTY && demand.status != statuses.RESULT)"
            @click="order"
          >Order</button>

          <a
            v-if="demand && demand.status == statuses.RESULT"
            :href="demand.result.result | urlIpfs"
            target="_blank"
            class="container-full btn-big btn-green"
          >
            <span class="i-file"></span>
            <span>View result</span>
          </a>
        </div>
      </section>
    </section>
  </fragment>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Form from "./Form";
import config from "../../config";
import getIpfs from "../../utils/ipfs";

function getBuf(file) {
  return new Promise(resolve => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
      const fileBuffer = new Buffer(
        fr.result.substr(fr.result.indexOf(",") + 1),
        "base64"
      );
      resolve(fileBuffer);
    };
  });
}
export default {
  components: {
    Form
  },
  data() {
    return {
      id: 0,
      nonce: 0,
      btn: false
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
      if (newDemand && newDemand.status === this.statuses.EMPTY) {
        this.btn = false;
      }
    }
  },
  created() {
    this.$robonomics.factory.call
      .nonceOf(this.$robonomics.account.address)
      .then(r => {
        this.nonce = Number(r);
      });
  },
  methods: {
    async getObjective() {
      const ipfs = await getIpfs();
      const files = [
        {
          path: "/files/addresses.txt",
          content: new Buffer(this.$refs.regForm.form.fields.addresses.value)
        }
      ];
      const meta = await getBuf(this.$refs.regForm.form.fields.meta.value);
      files.push({
        path: "/files/meta.txt",
        content: meta
      });
      const keys = Object.keys(this.$refs.regForm.form.fields.images.items);
      for (let i = 0; i < keys.length; i++) {
        files.push({
          path: "/files/" + keys[i],
          content: await getBuf(
            this.$refs.regForm.form.fields.images.items[keys[i]]
          )
        });
      }
      const r = await ipfs.add(files);
      const hash = r[0].hash;
      await axios.get(`${config.GATEWAY}${hash}`);
      return hash;
    },
    order() {
      if (this.$refs.regForm.validateForm()) {
        this.btn = true;
        this.$robonomics.web3.eth.getBlock("latest", (e, r) => {
          if (e) {
            this.btn = false;
            return;
          }
          this.getObjective()
            .then(objective => {
              const demand = {
                model: config.ROBONOMICS.model.registration,
                objective,
                token: this.$robonomics.xrt.address,
                cost: 0,
                lighthouse: this.$robonomics.lighthouse.address,
                validator: config.ROBONOMICS.validator,
                validatorFee: 0,
                deadline: r.number + 1000,
                nonce: this.nonce
              };

              this.$store.dispatch("sender/send", demand).then(id => {
                this.id = id;
              });
            })
            .catch(() => {
              this.btn = false;
            });
        });
      }
    }
  }
};
</script>
