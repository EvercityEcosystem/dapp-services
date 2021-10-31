<template>
  <Page>
    <section class="section-light section-centered">
      <h2>{{ $t("carbonfootprintitaly.title") }}</h2>
      <template v-if="polkadot === null">...</template>
      <template v-else-if="block && ext">
        <Passport :block="block" :ext="ext" />
      </template>
      <template v-else>
        <Form ref="form" @onSubmit="onSubmit" />
        <button
          class="container-full btn-big"
          :disabled="isWork"
          @click="submit"
        >
          {{ $t("carbonfootprintitaly.order") }}
        </button>
        <div
          v-if="success"
          class="green"
          style="margin-top:20px;text-align:center"
        >
          <hr />
          <b>Success</b>&nbsp;
          <a
            :href="
              `https://parachain.robonomics.network/?rpc=wss%3A%2F%2Fipci.rpc.robonomics.network#/explorer/query/${tx.block}`
            "
            target="_blank"
          >
            View explorer
          </a>
          &nbsp;
          <router-link
            :to="{
              name: 'carbonfootprintitaly-view',
              params: { block: tx.block, ext: tx.tx }
            }"
          >
            Passport
          </router-link>
        </div>
      </template>
    </section>
  </Page>
</template>

<script>
import { stringToHex } from "@polkadot/util";
import Page from "@/components/layout/Page";
import token from "@/mixins/token";
import Form from "./Form";
import Passport from "./Passport";
import configService from "../config";
import { genRosbagFile, rosbagToIpfs } from "@/utils/utils";
import { addByFile } from "../add";
import model from "../model";
import { init } from "../../../utils/polkadot";
import Modal from "./Modal";
import { tools } from "@/utils/ipfs";

export default {
  mixins: [token],
  props: ["block", "ext"],
  data() {
    return {
      model: configService.model,
      polkadot: null,
      isWork: false,
      success: false,
      tx: null
    };
  },
  components: {
    Page,
    Form,
    Passport
  },
  async created() {
    this.polkadot = await init(configService.substrate);
  },
  methods: {
    submit() {
      this.$refs.form.submit();
    },
    async onSubmit({ error, fields}) {
      window.console.log(await this.getObjective(fields));

      if (!error) {
        this.isWork = true;

        try {
          const accounts = await this.polkadot.utils.getAccounts();

          this.$modal.show(
            Modal,
            {
              accounts: accounts,
              onSend: async address => {
                const objectivePayload = await this.getObjective({
                  ...fields
                });
                const rosbag = await genRosbagFile(objectivePayload);
                const objective = await rosbagToIpfs(rosbag);

                this.tx = await this.polkadot.utils.send(
                  address,
                  stringToHex(objective)
                );
                await this.pinPassport(address, this.tx, rosbag, fields);
                this.success = true;
                this.$modal.hide("modal-select-account");
              }
            },
            { name: "modal-select-account", height: "auto" },
            {
              "before-close": () => {
                this.isWork = false;
              }
            }
          );
        } catch (e) {
          console.log(e);
          this.isWork = false;
        }
      }
    },
    async pinPassport(sender, tx, passport, fields) {
      await tools.pinFileToPinata(passport, `passport-${sender}-${tx.block}`);
      let i = 1;
      for (let field in fields) {
        if (fields[field].type === "file") {
          await tools.pinFileToPinata(
            fields[field].value,
            `passport-${sender}-${tx.block}-i${i}`
          );
          i++;
        } else if (fields[field].type === "files") {
          for (let name in fields[field].items) {
            await tools.pinFileToPinata(
              fields[field].items[name],
              `passport-${sender}-${tx.block}-i${i}`
            );
            i++;
          }
        }
      }
    },
    async getObjective(fields) {
      const payload = {};
      for (let field in fields) {
        const fieldHash = model.rosbag_scheme.find(
          item => item.suffix === `/${field}_hash`
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
        } else if (fields[field].type === "table") {
          payload[field] = JSON.stringify(fields[field].items);
        } else {
          payload[field] = fields[field].value;
          if (fieldHash) {
            payload[`${field}_hash`] = fields[field].value;
          }
        }
      }
      return payload;
    }
  }
};
</script>
