<template>
  <fragment>
    <span class="t-sm">{{ $t("carbonfootprintitaly.liability") }}</span>
    <blockquote>
      <a
        class="t-lg content-overflow"
        :href="address | urlChainExplorer"
        target="_blank"
        >{{ address }}</a
      >
    </blockquote>
    <template v-if="passport">
      <section v-if="passport.email">
        <div class="form-section-title">
          {{ $t("carbonfootprintitaly.subtitle") }}
        </div>
        <section v-if="passport.email">
          <span class="t-sm">{{ $t("carbonfootprintitaly.email") }}:</span>
          <br />
          <span>{{ passport.email }}</span>
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
        <a
          class="i-share"
          href="javascript:;"
          title="Share the link"
          v-clipboard:copy="getLink()"
        ></a>
      </div>
    </template>
    <div v-else class="loader">
      <RLoader />&nbsp;
      <b class="align-vertical t-style_uppercase">{{
        $t("carbonfootprintitaly.loading")
      }}</b>
    </div>
  </fragment>
</template>

<script>
import { Liability } from "robonomics-js";
import iconv from "iconv-lite";
import { readRosbagIpfs } from "@/utils/utils";

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
  props: ["address"],
  data() {
    return {
      passport: null
    };
  },
  created() {
    const liability = new Liability(
      this.$robonomics.web3,
      this.address,
      this.address
    );
    liability.getInfo().then(info => {
      this.rosbagObjective(info.objective);
    });
  },
  mounted() {
    loadScript("https://platform.twitter.com/widgets.js");
  },
  computed: {
    metaSlice: function() {
      return (
        this.passport.meta.slice(0, 6) + "..." + this.passport.meta.slice(-4)
      );
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
            passport: this.address
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
