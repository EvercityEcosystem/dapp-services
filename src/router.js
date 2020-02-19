import Services from "@/views/Services";
import Issuing from "@/views/Issuing";
import Offsetting from "@/views/Offsetting";
import Mauritius from "@/views/Mauritius";
import Khimprom from "@/views/Khimprom";
import SwissKrono from "@/views/SwissKrono";
import Nudao from "@/views/Nudao";
import Agridatax from "@/views/Agridatax";
import Validator from "@/views/Validator";
import Liability from "@/views/Liability";
import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "services",
      component: Services,
      props: true
    },
    {
      path: "/issuing",
      name: "issuing",
      component: Issuing
    },
    {
      path: "/offsetting",
      name: "offsetting",
      component: Offsetting
    },
    {
      path: "/mauritius",
      name: "mauritius",
      component: Mauritius
    },
    {
      path: "/khimprom",
      name: "khimprom",
      component: Khimprom
    },
    {
      path: "/swiss-krono",
      name: "swissKrono",
      component: SwissKrono
    },
    {
      path: "/nudao",
      name: "nudao",
      component: Nudao
    },
    {
      path: "/agridatax",
      name: "agridatax",
      component: Agridatax
    },
    {
      path: "/validator",
      name: "validator",
      component: Validator
    },
    {
      path: "/liability/:liability",
      name: "liability",
      component: Liability,
      props: true
    },
    { path: "*", redirect: "/" }
  ]
});
