<template>
  <form v-on:submit.prevent="submit">
    <RFormSection :title="$t('carbonfootprintitaly.subtitleProduct')">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'product'">
          <RFieldLabel :isError="field.error">{{ field.label }}</RFieldLabel>
          <input
                  v-if="field.type == 'text'"
                  type="text"
                  v-model="field.value"
                  class="container-full"
                  :class="{ error: field.error }"
          />
          <input
                  v-if="field.type == 'number'"
                  type="number"
                  v-model="field.value"
                  class="container-full"
                  :class="{ error: field.error }"
          />
          <flat-pickr
                  v-if="field.type == 'date'"
                  v-model="field.value"
                  :config="field.config"
                  class="flatpickr"
                  :class="{ error: field.error }"
          />
          <file-pond
                  v-if="field.type == 'files'"
                  :name="name"
                  allow-multiple="true"
                  accepted-file-types="image/jpeg, image/png"
                  :label-idle="$t('carbonfootprintitaly.dragImages')"
                  v-bind:server="upload"
                  v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>



    <RFormSection :title="$t('carbonfootprintitaly.subtitleCompany')">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'company'">
          <RFieldLabel :isError="field.error">{{ field.label }}</RFieldLabel>
          <input
                  v-if="field.type == 'text'"
                  type="text"
                  v-model="field.value"
                  class="container-full"
                  :class="{ error: field.error }"
          />
          <input
                  v-if="field.type == 'number'"
                  type="number"
                  v-model="field.value"
                  class="container-full"
                  :class="{ error: field.error }"
          />
          <flat-pickr
                  v-if="field.type == 'date'"
                  v-model="field.value"
                  :config="field.config"
                  class="flatpickr"
                  :class="{ error: field.error }"
          />
          <file-pond
                  v-if="field.type == 'files'"
                  :name="name"
                  allow-multiple="true"
                  accepted-file-types="image/jpeg, image/png"
                  :label-idle="$t('carbonfootprintitaly.dragImages')"
                  v-bind:server="upload"
                  v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>



    <RFormSection :title="$t('carbonfootprintitaly.subtitle')">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="!field.group">
          <RFieldLabel :isError="field.error">{{ field.label }}</RFieldLabel>
          <input
            v-if="field.type == 'text'"
            type="text"
            v-model="field.value"
            class="container-full"
            :class="{ error: field.error }"
          />
          <input
            v-if="field.type == 'number'"
            type="number"
            v-model="field.value"
            class="container-full"
            :class="{ error: field.error }"
          />
          <flat-pickr
            v-if="field.type == 'date'"
            v-model="field.value"
            :config="field.config"
            class="flatpickr"
            :class="{ error: field.error }"
          />
          <file-pond
            v-if="field.type == 'files'"
            :name="name"
            allow-multiple="true"
            accepted-file-types="image/jpeg, image/png"
            :label-idle="$t('carbonfootprintitaly.dragImages')"
            v-bind:server="upload"
            v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>



    <RFormSection :title="$t('carbonfootprintitaly.subtitleGHG')">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'ghg'">
          <RFieldLabel :isError="field.error">{{ field.label }}</RFieldLabel>
          <input
                  v-if="field.type == 'text'"
                  type="text"
                  v-model="field.value"
                  class="container-full"
                  :class="{ error: field.error }"
          />
          <input
                  v-if="field.type == 'number'"
                  type="number"
                  v-model="field.value"
                  class="container-full"
                  :class="{ error: field.error }"
          />
          <flat-pickr
                  v-if="field.type == 'date'"
                  v-model="field.value"
                  :config="field.config"
                  class="flatpickr"
                  :class="{ error: field.error }"
          />
          <file-pond
                  v-if="field.type == 'files'"
                  :name="name"
                  allow-multiple="true"
                  accepted-file-types="image/jpeg, image/png"
                  :label-idle="$t('carbonfootprintitaly.dragImages')"
                  v-bind:server="upload"
                  v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>

  </form>
</template>

<script>
import robonomicsVC from "robonomics-vc";
import vueFilePond from "vue-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import flatPickr from "vue-flatpickr-component";
// import { Russian } from "flatpickr/dist/l10n/ru.js";

const FilePond = vueFilePond(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
);

export default {
  mixins: [robonomicsVC.mixins.form],
  data() {
    return {
      fields: {


        registration_n: {
          label: this.$t("carbonfootprintitaly.registrationNumber"),
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: 'product'
        },
        name: {
          label: this.$t("carbonfootprintitaly.productName"),
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: 'product'
        },
        photo_product: {
          label: this.$t("carbonfootprintitaly.productPhotoField"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: 'product'
        },



        company_name: {
          label: "Company name",
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: 'company'
        },
        company_contact: {
          label: "Company contact",
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: 'company'
        },
        company_website: {
          label: "Company website",
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: 'company'
        },
        company_product: {
          label: this.$t("carbonfootprintitaly.companyImageField"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: 'company'
        },

        // email: {
        //   label: "Email",
        //   value: "",
        //   type: "text",
        //   rules: [
        //     value => {
        //       return (
        //         !robonomicsVC.validators.require(value) || /.+@.+/.test(value)
        //       );
        //     }
        //   ],
        //   error: false
        // },








        registration_of: {
          label: "Registration of",
          value: "",
          type: "date",
          rules: ["require"],
          error: false,
          config: {
            dateFormat: "d/m/Y"
            // locale: Russian
          }
        },
        du: {
          label: "D.U.",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        cfp: {
          label: "CFP (g CO2e/d.u)",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        reference_year: {
          label: "Reference year",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        system_boundaries: {
          label: "System boundaries",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        modules_excluded: {
          label: "Modules excluded",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        production_plants: {
          label: "Production plants included",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        reference_pcr: {
          label: "Reference PCR",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        cfp_study_report: {
          label: "CFP Study report",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        version: {
          label: "Version",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        notes: {
          label: "Notes",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        verified: {
          label: "Verified by",
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        images: {
          label: this.$t("carbonfootprintitaly.imagesField"),
          items: {},
          type: "files",
          rules: [],
          error: false
        },


        // ghg
        ghg_fossil: {
          label: this.$t("carbonfootprintitaly.ghgFossil"),
          value: "",
          type: "number",
          rules: ["require"],
          error: false,
          group: 'ghg'
        },
        ghg_emissions: {
          label: this.$t("carbonfootprintitaly.ghgEmissions"),
          value: "",
          type: "number",
          rules: ["require"],
          error: false,
          group: 'ghg'
        },
        ghg_removals: {
          label: this.$t("carbonfootprintitaly.ghgRemovals"),
          value: "",
          type: "number",
          rules: ["require"],
          error: false,
          group: 'ghg'
        },
        ghg_resulting: {
          label: this.$t("carbonfootprintitaly.ghgResulting"),
          value: "",
          type: "number",
          rules: ["require"],
          error: false,
          group: 'ghg'
        },
        ghg_aircraft: {
          label: this.$t("carbonfootprintitaly.ghgAircraft"),
          value: "",
          type: "number",
          rules: ["require"],
          error: false,
          group: 'ghg'
        },
      },


      upload: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          if (
            Object.prototype.hasOwnProperty.call(this.fields, fieldName) &&
            Object.prototype.hasOwnProperty.call(
              this.fields[fieldName],
              "value"
            )
          ) {
            this.fields[fieldName].value = file;
          } else {
            this.fields[fieldName].items[file.name] = file;
          }
          load();
          return {
            abort: () => {
              abort();
            }
          };
        },
        revert: null
      }
    };
  },
  components: {
    FilePond,
    flatPickr
  },
  methods: {
    removefile(a, file) {
      if (this.fields.images.items[file.filename]) {
        delete this.fields.images.items[file.filename];
      }
    }
  }
};
</script>
