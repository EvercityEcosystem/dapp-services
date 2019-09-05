<template>
  <form>
    <section>
      <div class="form-item form-line-label" :class="{disabled: isDisabled}">
        <label for="inputdata-co2_volume">
          {{$t('mauritius.form.energy')}} *
          <span
            v-if="form.fields.co2_volume.error"
            class="input-msg"
          >Check if data correct, please.</span>
        </label>
        <input
          :disabled="isDisabled"
          v-model="form.fields.co2_volume.value"
          class="container-full"
          :class="{ error: form.fields.co2_volume.error }"
          type="text"
          required
        />
      </div>
    </section>
  </form>
</template>

<script>
export default {
  props: {
    isDisabled: {
      default: false
    }
  },
  data() {
    return {
      form: {
        fields: {
          co2_volume: {
            value: "",
            rules: ["require", "min"],
            error: false
          }
        },
        error: false
      }
    };
  },
  methods: {
    validateForm() {
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
    }
  }
};
</script>
