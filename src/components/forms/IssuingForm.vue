<template>
  <form>
    <section>
      <div class="form-section-title">{{ $t("issuing.form.group1") }}</div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.email") }}
          <span v-if="form.fields.email.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <input
          v-model="form.fields.email.value"
          class="container-full"
          :class="{ error: form.fields.email.error }"
          type="text"
        />
      </div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.promisee") }}
          <span v-if="form.fields.promisee.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <input
          v-model="form.fields.promisee.value"
          class="container-full"
          :class="{ error: form.fields.promisee.error }"
          type="text"
        />
      </div>
    </section>
    <section>
      <div class="form-section-title">{{ $t("issuing.form.group2") }}</div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.log") }}
          <span v-if="form.fields.log.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <file-pond
          name="test"
          ref="pond"
          :label-idle="$t('issuing.form.file')"
          v-bind:server="upload"
          v-on:init="handleFilePondInit"
        />
        <input
          v-model="form.fields.log.value"
          class="container-full"
          :class="{ error: form.fields.log.error }"
          type="text"
        />
      </div>
    </section>
    <section>
      <div class="form-section-title">{{ $t("issuing.form.group3") }}</div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.name") }}
          <span v-if="form.fields.name.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <input
          v-model="form.fields.name.value"
          class="container-full"
          :class="{ error: form.fields.name.error }"
          type="text"
        />
      </div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.location") }}
          <span v-if="form.fields.location.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <input
          v-model="form.fields.location.value"
          class="container-full"
          :class="{ error: form.fields.location.error }"
          type="text"
        />
      </div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.dateObject") }}
          <span v-if="form.fields.dateObject.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <flat-pickr
          v-model="form.fields.dateObject.value"
          :config="form.fields.dateObject.config"
          class="flatpickr"
          :class="{ error: form.fields.dateObject.error }"
        ></flat-pickr>
      </div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.type") }}
          <span v-if="form.fields.type.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <input
          v-model="form.fields.type.value"
          class="container-full"
          :class="{ error: form.fields.type.error }"
          type="text"
        />
      </div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.info") }}
          <span v-if="form.fields.info.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <input
          v-model="form.fields.info.value"
          class="container-full"
          :class="{ error: form.fields.info.error }"
          type="text"
        />
      </div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.power") }}
          <span v-if="form.fields.power.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <input
          v-model="form.fields.power.value"
          :class="{ error: form.fields.power.error }"
          type="text"
        />
      </div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.koef") }}
          <span v-if="form.fields.koef.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <input
          v-model="form.fields.koef.value"
          :class="{ error: form.fields.koef.error }"
          type="text"
        />
      </div>
      <div class="form-item form-line-label">
        <label>
          {{ $t("issuing.form.id") }}
          <span v-if="form.fields.id.error" class="input-msg"
            >Check if data correct, please.</span
          >
        </label>
        <input
          v-model="form.fields.id.value"
          :class="{ error: form.fields.id.error }"
          type="text"
        />
      </div>
      <div class="form-item">
        <input v-model="form.fields.checkbox.value" type="checkbox" />
        <label>{{ $t("issuing.form.checkbox") }}</label>
      </div>
      <div v-if="form.fields.checkbox.value" class="form-item form-line-label">
        <label>{{ $t("issuing.form.gos") }}</label>
        <textarea
          class="container-full"
          v-model="form.fields.gos.value"
          rows="1"
          :class="{ error: form.fields.gos.error }"
        />
      </div>
    </section>
  </form>
</template>

<script>
import axios from "axios";
import vueFilePond from "vue-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import flatPickr from "vue-flatpickr-component";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import config from "~config";
import { tools } from "../../utils/ipfs";
import "filepond/dist/filepond.min.css";

const FilePond = vueFilePond(FilePondPluginFileEncode);

export default {
  components: {
    FilePond,
    flatPickr
  },
  data() {
    return {
      upload: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          const fr = new FileReader();
          fr.readAsDataURL(file);
          fr.onload = () => {
            const fileBuffer = new Buffer(
              fr.result.substr(fr.result.indexOf(",") + 1),
              "base64"
            );
            tools
              .add(fileBuffer)
              .then(r => {
                const hash = r.toString();
                axios
                  .get(`${config.GATEWAY}${hash}`)
                  .then(() => {
                    this.form.fields.log.value = hash;
                    load(hash);
                  })
                  .catch(e => {
                    console.log(e);
                    error(e);
                  });
              })
              .catch(e => {
                console.log(e);
                error(e);
              });
          };
          return {
            abort: () => {
              abort();
            }
          };
        },
        revert: (uniqueFileId, load) => {
          this.form.fields.log.value = "";
          load();
        }
      },
      form: {
        fields: {
          email: {
            value: "",
            rules: ["require", "email"],
            error: false
          },
          log: {
            value: "",
            rules: ["require"],
            error: false
          },
          promisee: {
            value: "",
            rules: ["require"],
            error: false
          },
          type: {
            value: "",
            rules: ["require"],
            error: false
          },
          info: {
            value: "",
            rules: ["require"],
            error: false
          },
          power: {
            value: "",
            rules: ["require"],
            error: false
          },
          gos: {
            value: "",
            rules: [],
            error: false
          },
          koef: {
            value: "",
            rules: ["require"],
            error: false
          },
          name: {
            value: "",
            rules: ["require"],
            error: false
          },
          location: {
            value: "",
            rules: ["require"],
            error: false
          },
          id: {
            value: "",
            rules: ["require"],
            error: false
          },
          dateObject: {
            value: "",
            rules: ["require"],
            error: false,
            config: {
              dateFormat: "d.m.Y",
              locale: Russian
            }
          },
          checkbox: {
            value: "",
            rules: [],
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
          } else if (
            rule === "email" &&
            !/.+@.+/.test(this.form.fields[field].value)
          ) {
            this.form.fields[field].error = true;
            this.form.error = true;
          }
        });
      }
      return !this.form.error;
    },
    handleFilePondInit() {
      console.log("FilePond has initialized");
    }
  }
};
</script>
