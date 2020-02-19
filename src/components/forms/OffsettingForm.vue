<template>
  <form v-on:submit.prevent="submit">
    <section>
      <div class="form-item form-line-label" :class="{disabled: isDisabled}">
        <label for="inputdata-geo">
          {{$t('offsetting.form.location')}} *
          <span
            v-if="form.fields.geo.error"
            class="input-msg"
          >Check if data correct, please.</span>
        </label>
        <select
          :disabled="isDisabled"
          v-model="form.fields.geo.value"
          class="container-full"
          :class="{ error: form.fields.geo.error }"
        >
          <option>===</option>
          <option v-for="(item, k) in countries" :key="k" :value="item">{{item}}</option>
        </select>
      </div>
      <div class="form-item form-line-label" :class="{disabled: isDisabled}">
        <label for="inputdata-power_kwh">
          {{$t('offsetting.form.energy')}} *
          <span
            v-if="form.fields.power_kwh.error"
            class="input-msg"
          >Check if data correct, please.</span>
        </label>
        <input
          :disabled="isDisabled"
          v-model="form.fields.power_kwh.value"
          class="container-full"
          :class="{ error: form.fields.power_kwh.error }"
          type="text"
          required
        />
      </div>
    </section>
  </form>
</template>

<script>
import axios from "axios";
import countries from "../../utils/countries";

export default {
  props: {
    onSubmit: {
      type: Function
    },
    isDisabled: {
      default: false
    }
  },
  data() {
    return {
      countries: countries,
      form: {
        fields: {
          geo: {
            value: "",
            rules: ["require"],
            error: false
          },
          power_kwh: {
            value: "",
            rules: ["require", "min"],
            error: false
          }
        },
        error: false
      }
    };
  },
  mounted() {
    axios.get("https://api.ipify.org?format=json").then(r => {
      axios.get(`https://ipapi.co/${r.data.ip}/country_name/`).then(r => {
        this.form.fields.geo.value = r.data;
      });
    });
  },
  methods: {
    validate() {
      this.form.error = false;
      for (let field in this.form.fields) {
        this.form.fields[field].error = false;
        this.form.fields[field].rules.forEach(rule => {
          if (rule === "require" && !this.form.fields[field].value) {
            this.form.fields[field].error = true;
            this.form.error = true;
          } else if (rule === "min" && !(this.form.fields[field].value >= 1)) {
            this.form.fields[field].error = true;
            this.form.error = true;
          }
        });
      }
      return !this.form.error;
    },
    submit() {
      this.validate();
      if (this.onSubmit) {
        this.onSubmit(this.form.error, this.form.fields);
      }
    }
  }
};
</script>
