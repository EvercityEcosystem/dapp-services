<template>
  <fragment>
    <span class="t-sm">{{ $t("carbonfootprintitaly.liability") }}</span>
    <blockquote>
      <a
        class="t-lg content-overflow"
        :href="`https://ui.ipci.io/#/explorer/query/${block}`"
        target="_blank"
      >
        {{ block | metaSlice }}/{{ ext | metaSlice }}
      </a>
    </blockquote>
    <template v-if="passport">
      <section v-if="passport.company_name">
        <div class="form-section-title">
          {{ $t("carbonfootprintitaly.subtitle") }}
        </div>
        <section v-if="passport.company_name">
          <span class="t-sm">
            {{ $t("carbonfootprintitaly.companyName") }}:
          </span>
          <br />
          <span>{{ passport.company_name }}</span>
        </section>
      </section>
      <hr class="ptint-hidden" />
      <div class="icons-line ptint-hidden">
        <a
          class="i-print"
          href="#"
          title="Print Passport"
          onclick="window.print();return false;"
        ></a>
        <a class="i-twitter" :href="getLinkTwitter()" title="Tweet"></a>
      </div>
    </template>
    <div v-else class="loader">
      <RLoader />&nbsp;
      <b class="align-vertical t-style_uppercase">
        {{ $t("carbonfootprintitaly.loading") }}
      </b>
    </div>
  </fragment>
</template>

<script>
import iconv from "iconv-lite";
import { readRosbagIpfs } from "@/utils/utils";
import { init } from "../../../utils/polkadot";
import { hexToString } from "@polkadot/util";

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export default {
  props: ["block", "ext"],
  data() {
    return {
      passport: null
    };
  },
  async created() {
    const polkadot = await init();
    polkadot.api.rpc.chain.getBlock(this.block, block => {
      block.block.extrinsics.forEach(item => {
        if (
          item.method.section === "datalog" &&
          item.method.method === "record" &&
          item.hash.toString() === this.ext
        ) {
          const objective = hexToString(item.method.args[0].toString());
          this.rosbagObjective(objective);
        }
      });
    });
  },
  mounted() {
    loadScript("https://platform.twitter.com/widgets.js");
  },
  filters: {
    metaSlice: function(v) {
      return v ? v.slice(0, 6) + "..." + v.slice(-4) : "";
    }
  },
  methods: {
    rosbagObjective(hash) {
      const passport = {};
      readRosbagIpfs(hash, bag => {
        if (bag.message.data === "") {
          return;
        }
        const topic = bag.topic.replace(/\//, "");
        passport[topic] = iconv.decode(
          Buffer.from(bag.message.data, "ascii"),
          "utf-8"
        );
      }).then(() => {
        this.passport = passport;
      });
    },
    getLink() {
      return `${window.location.origin}/${
        this.$router.resolve({
          name: "carbonfootprintitaly-view",
          params: {
            block: this.block,
            ext: this.ext
          }
        }).href
      }`;
    },
    getLinkTwitter() {
      return `https://twitter.com/intent/tweet?text=${window.encodeURIComponent(
        this.getLink()
      )}&ref_src=twsrc%5Etfw`;
    }
  }
};
</script>
