<template>
  <div class="sidebar flexcols">
    <div class="sidebar-col sidebar-col--sm">
      <div class="sidebar-col-in">
        <section>
          <router-link to="/">
            <img class="theme-day" alt="dApp logo" src="assets/i/logo-dapp-ipci-light.svg" />
            <img class="theme-night" alt="dApp logo" src="assets/i/logo-dapp-ipci-dark.svg" />
          </router-link>
        </section>
        <section>
          <a class="sidebar-i--lg js-sidebar-link" href="javascript:;" on-toggle="#sidebar-nav1">
            <i class="i-menu"></i>
          </a>
          <a
            class="sidebar-i--lg js-sidebar-link"
            href="javascript:;"
            on-toggle="#sidebar-lang"
          >{{$i18n.locale.toUpperCase()}}</a>
          <div id="themeMode">
            <a class="sidebar-i--lg" href="javascript:;" @click="toggleTheme()">
              <i class="i-day" v-show="theme === 'light'"></i>
              <i class="i-night" v-show="theme === 'dark'"></i>
            </a>
          </div>
        </section>
        <section class="sidebar-col--bottom">
          <a class="sidebar-i--lg js-sidebar-link" href="javascript:;" on-toggle="#sidebar-user">
            <i class="i-user"></i>
          </a>
          <a class="sidebar-i--lg js-sidebar-link" href="javascript:;" on-toggle="#sidebar-info">?</a>
        </section>
      </div>
    </div>
    <div class="sidebar-col sidebar-col-padding js-sidebar-content" id="sidebar-nav1">
      <div class="sidebar-col-in">
        <section>
          <nav class="nav-vertical">
            <router-link to="/" active-class="active" exact>
              <span class="i-app align-vertical"></span>
              <span class="align-vertical">{{ $t('menu.services') }}</span>
            </router-link>
          </nav>
        </section>
      </div>
    </div>
    <div class="sidebar-col sidebar-col-padding js-sidebar-content" id="sidebar-lang">
      <div class="sidebar-col-in">
        <section>
          <LangSwitcher :loadContent="loadContent" />
        </section>
      </div>
    </div>
    <div class="sidebar-col sidebar-col-padding js-sidebar-content" id="sidebar-user">
      <Wallet />
    </div>
    <div class="sidebar-col sidebar-col-padding js-sidebar-content" id="sidebar-info">
      <div class="sidebar-col-in">
        <section>
          <p>
            <a href="https://ipci.io/" target="_blank">DAO IPCI</a>
            <br />Blockchain technology for carbon markets, environmental assets and liabilities
          </p>
          <p>
            Works with
            <a href="https://robonomics.network/" target="_blank">Robonomomics.network</a>
          </p>
          <p>
            <b>Disclaimer:</b>DApp IPCI has started in the summer of 2016 and is in the stage of development. If you found bugs or have questions, please contact
            <a
              href="mailto:help@ipci.io"
            >help@ipci.io</a>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LangSwitcher from "./LangSwitcher";
import Wallet from "./Wallet";

export default {
  props: ["loadContent"],
  components: {
    LangSwitcher,
    Wallet
  },
  computed: {
    ...mapState("theme", ["theme"])
  },
  mounted() {
    window.init();
  },
  methods: {
    toggleTheme() {
      if (this.theme === "light") {
        this.$store.dispatch("theme/setTheme", "dark");
      } else {
        this.$store.dispatch("theme/setTheme", "light");
      }
    }
  }
};
</script>
