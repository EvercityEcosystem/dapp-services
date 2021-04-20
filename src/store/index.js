import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import sender from "./modules/sender";
import theme from "./modules/theme";
import tokens from "./modules/tokens";
import msg from "./modules/msg";
import chain from "./modules/chain";

Vue.use(Vuex);

const debug = false;

export default new Vuex.Store({
  modules: {
    theme,
    sender,
    tokens,
    msg,
    chain
  },
  strict: true, // debug,
  plugins: debug ? [createLogger()] : []
});
