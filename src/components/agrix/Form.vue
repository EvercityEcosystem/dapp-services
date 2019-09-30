<template>
  <form>
    <section>
      <div class="form-section-title">Info</div>
      <div class="form-item form-line-label">
        <label for="inputdata-addresses">
          Farm address *
          <span
            v-if="form.fields.addresses.error"
            class="input-msg"
          >Check if data correct, please.</span>
        </label>
        <textarea
          v-model="form.fields.addresses.value"
          class="container-full"
          :class="{ error: form.fields.addresses.error }"
          rows="15"
          required
        />
      </div>
      <div class="form-item form-line-label">
        <label for="inputdata-meta">
          Attach farm meta data *
          <span
            v-if="form.fields.meta.error"
            class="input-msg"
          >Check if data correct, please.</span>
        </label>
        <file-pond
          name="meta"
          ref="pond"
          label-idle="Add file"
          v-bind:server="upload"
          v-on:init="handleFilePondInit"
        />
      </div>
      <div class="form-item form-line-label">
        <label for="inputdata-images">
          Attach satellite map images *
          <span
            v-if="form.fields.images.error"
            class="input-msg"
          >Check if data correct, please.</span>
        </label>
        <div>
          <file-pond
            name="images"
            ref="pond"
            allow-multiple="true"
            accepted-file-types="image/jpeg, image/png"
            label-idle="Add image files"
            v-bind:server="upload"
            v-on:init="handleFilePondInit"
            v-on:removefile="removefile"
          />
        </div>
      </div>
    </section>
  </form>
</template>

<script>
import vueFilePond from "vue-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";

const FilePond = vueFilePond(FilePondPluginFileEncode);

export default {
  components: {
    FilePond
  },
  data() {
    return {
      upload: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          if (
            this.form.fields.hasOwnProperty(fieldName) &&
            this.form.fields[fieldName].hasOwnProperty("value")
          ) {
            this.form.fields[fieldName].value = file;
          } else {
            this.form.fields[fieldName].items[file.name] = file;
          }
          load();
          return {
            abort: () => {
              abort();
            }
          };
        },
        revert: null
      },
      form: {
        fields: {
          addresses: {
            value: `DJ McCartin Farm
FarmID  RT-4794-0064
222.8 Hectares, Pastoral
440 Gorge Road, Omatane, RD 4, Taihape 4794, 117.8 Ha, Pastoral, B001
123 Hibberds Road, Taihape, 105.0 Ha, Pastoral. B002

Andrew Totman
FarmID RT-4794-0071
414 Omatane South Road, Omatane, RD 4, Taihape 5457, (414 Omatane Road, RD4, Taihape, B001)
751.6 Hectares, Pastoral, Omatane Road, RD4, Taihape
168.4 Ha, Pastoral, B002, Potaka Road, RD4, Taihape
1.6 Ha, Lifestyle, B003`,
            rules: ["require"],
            error: false
          },
          meta: {
            value: "",
            rules: ["require"],
            error: false
          },
          images: {
            items: {},
            rules: ["items"],
            // rules: [],
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
            rule === "items" &&
            Object.keys(this.form.fields[field].items).length === 0
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
    },
    removefile(a, file) {
      if (this.form.fields.images.items[file.filename]) {
        delete this.form.fields.images.items[file.filename];
      }
    }
  }
};
</script>
