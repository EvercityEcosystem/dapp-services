<template>
  <Page>
    <section class="section-light section-centered">
      <h2>{{ $t("khimprom.title") }}</h2>
      <Form ref="form" :onSubmit="onSubmit" />
      <Request
        v-if="!response"
        ref="request"
        :model="model"
        :token="token"
        :validator="validator"
        :submit="submit"
        :onResponse="onResponse"
      />
      <template v-else>
        <Response
          :sender="response.sender"
          :objective="response.objective"
          :token="response.token"
        />
        <Approve
          v-if="response.cost > 0"
          :address="response.token"
          :from="$robonomics.account.address"
          :to="$robonomics.factory.address"
          :initAmountWei="cost"
        />
        <Order
          v-if="
            myAllowance >= cost && (!demand || demand.status < statuses.RESULT)
          "
          :offer="response"
          :onDemand="onDemand"
        />
        <Steps
          v-if="demand"
          :status="demand.status"
          :liability="demand.liability"
        />
        <BurnResult
          v-if="demand && demand.status == statuses.RESULT"
          :liability="demand.liability"
          :hash="demand.result.result"
        />
      </template>
    </section>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import Page from "@/components/layout/Page";
import Form from "@/components/forms/KhimpromForm";
import Approve from "@/components/approve/Main";
import Steps from "@/components/Steps";
import Request from "@/components/offsetting/Request";
import Response from "@/components/offsetting/Response";
import Order from "@/components/offsetting/Order";
import BurnResult from "@/components/offsetting/BurnResult";
import { number } from "../utils/tools";
import token from "@/mixins/token";
import config from "~config";

export default {
  mixins: [token],
  data() {
    return {
      response: null,
      allowance: 0,
      demandId: 0,
      model: config.ROBONOMICS.model.khimprom
    };
  },
  components: {
    Page,
    Form,
    Request,
    Response,
    Approve,
    Order,
    Steps,
    BurnResult
  },
  computed: {
    ...mapState("sender", ["statuses"]),
    demand() {
      return this.$store.getters["sender/demandById"](this.demandId);
    },
    cost() {
      return number.numToString(this.response.cost);
    },
    myAllowance: function() {
      if (this.response) {
        return this.allowance(
          this.response.token,
          this.$robonomics.account.address,
          this.$robonomics.factory.address
        );
      }
      return 0;
    }
  },
  created() {
    document.title = this.$t("khimprom.title") + " | " + this.$t("title");

    const configChain = config.chain.get();
    this.token = configChain.token.khimprom;
    this.validator = configChain.validator.khimprom;
  },
  methods: {
    submit() {
      this.$refs.form.submit();
    },
    onSubmit(e, fields) {
      this.$refs.request.requestPrice(e, fields);
    },
    onResponse(msg) {
      this.response = msg;
    },
    onDemand(demandId) {
      this.demandId = demandId;
    }
  }
};
</script>
