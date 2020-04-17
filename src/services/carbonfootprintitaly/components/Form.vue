<template>
  <form v-on:submit.prevent="submit">

    <RFormSection :title="$t('carbonfootprintitaly.subtitle')">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'general'">
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


    <div class="controls">
      <button class="btn btn-primary"
              :disabled="isProduct"
              v-on:click="isProduct = true"
      >{{ $t('carbonfootprintitaly.controlProduct') }}</button>
      <button class="btn btn-primary"
              :disabled="!isProduct"
              v-on:click="isProduct = false"
      >{{ $t('carbonfootprintitaly.controlOrganization') }}</button>
    </div>


    <RFormSection :title="$t('carbonfootprintitaly.subtitleProduct')" v-if="isProduct">
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



    <RFormSection :title="$t('carbonfootprintitaly.subtitleCompany')" v-if="!isProduct">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'company'">
          <RFieldLabel :isError="field.error" v-html="field.label"></RFieldLabel>
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


    <RFormSection :title="$t('carbonfootprintitaly.subtitleCFP')" v-if="isProduct">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'cfp'">
          <RFieldLabel :isError="field.error" v-html="field.label"></RFieldLabel>
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


    <RFormSection :title="$t('carbonfootprintitaly.subtitleCFO')" v-if="!isProduct">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'cfo'">
          <RFieldLabel :isError="field.error" v-html="field.label"></RFieldLabel>
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


    <RFormSection :title="$t('carbonfootprintitaly.subtitleEmission')" v-if="!isProduct">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'emission'">
          <RFieldLabel :isError="field.error" v-html="field.label"></RFieldLabel>
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


    <RFormSection :title="$t('carbonfootprintitaly.subtitleOffset')" v-if="!isProduct">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'offset'">
          <RFieldLabel :isError="field.error" v-html="field.label"></RFieldLabel>
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


    <RFormSection :title="$t('carbonfootprintitaly.subtitleGHG')" v-if="isProduct">
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
<style>
  .controls button {
    margin-right: 15px;
  }
</style>
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
      isProduct: true,
      fields: {

        company_name: {
          label: this.$t("carbonfootprintitaly.companyName"),
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: 'general',
          showOnProduct: true,
          showOnOrganization: true
        },
        company_contact: {
          label: this.$t("carbonfootprintitaly.companyContacts"),
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: 'general',
          showOnProduct: true,
          showOnOrganization: true
        },
        company_website: {
          label: this.$t("carbonfootprintitaly.companyWebsite"),
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: 'general',
          showOnProduct: true,
          showOnOrganization: true
        },
        company_phone: {
          label: this.$t("carbonfootprintitaly.companyPhone"),
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: 'general',
          showOnProduct: true,
          showOnOrganization: true
        },
        company_headquarters: {
          label: this.$t("carbonfootprintitaly.companyHeadquarters"),
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: 'general',
          showOnProduct: true,
          showOnOrganization: true
        },
        company_logo: {
          label: this.$t("carbonfootprintitaly.companyLogoField"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: 'general',
          showOnProduct: true,
          showOnOrganization: true
        },



        company_reg_number: {
          label: this.$t("carbonfootprintitaly.companyRegNumber"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'company',
          showOnProduct: false,
          showOnOrganization: true
        },
        company_activity: {
          label: this.$t("carbonfootprintitaly.companyActivity"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'company',
          showOnProduct: false,
          showOnOrganization: true
        },
        company_base_year: {
          label: this.$t("carbonfootprintitaly.companyBaseYear"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'company',
          showOnProduct: false,
          showOnOrganization: true
        },
        company_base_total_footprint: {
          label: this.$t("carbonfootprintitaly.companyBaseTotalFootprint"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'company',
          showOnProduct: false,
          showOnOrganization: true
        },
        company_note: {
          label: this.$t("carbonfootprintitaly.companyNote"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'company',
          showOnProduct: false,
          showOnOrganization: true
        },
        company_photo: {
          label: this.$t("carbonfootprintitaly.companyPhotoField"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: 'company'
        },



        product_registration_n: {
          label: this.$t("carbonfootprintitaly.productRegNumber"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'product'
        },
        product_name: {
          label: this.$t("carbonfootprintitaly.productName"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'product'
        },
        product_description: {
          label: this.$t("carbonfootprintitaly.productDescription"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'product'
        },
        product_photo: {
          label: this.$t("carbonfootprintitaly.productPhotoField"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: 'product'
        },








        // footprint
        cfp_registration_date: {
          label: this.$t("carbonfootprintitaly.cfpRegDate"),
          value: "",
          type: "date",
          rules: [],
          error: false,
          group: 'cfp',
          config: {
            dateFormat: "d/m/Y"
            // locale: Russian
          },
        },
        cfp_du: {
          label: this.$t("carbonfootprintitaly.cfpDU"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'cfp',
        },
        cfp_value: {
          label: this.$t("carbonfootprintitaly.cfpValue"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'cfp',
        },
        cfp_chart: {
          label: this.$t("carbonfootprintitaly.cfpChart"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: 'cfp'
        },
        cfp_reference_year: {
          label: this.$t("carbonfootprintitaly.cfpReferenceYear"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'cfp'
        },
        cfp_system_boundaries: {
          label: this.$t("carbonfootprintitaly.cfpSystemBoundaries"),
          value: "",
          type: "text",
          group: 'cfp',
          rules: [],
          error: false
        },
        cfp_stages_excluded: {
          label: this.$t("carbonfootprintitaly.cfpStagesExcluded"),
          value: "",
          type: "text",
          group: 'cfp',
          rules: [],
          error: false
        },
        cfp_plants_included: {
          label: this.$t("carbonfootprintitaly.cfpPlantsIncluded"),
          value: "",
          type: "text",
          group: 'cfp',
          rules: [],
          error: false
        },
        cfp_reference_pcr: {
          label: this.$t("carbonfootprintitaly.cfpReferencePCR"),
          value: "",
          type: "text",
          group: 'cfp',
          rules: [],
          error: false
        },
        cfp_study_report: {
          label: this.$t("carbonfootprintitaly.cfpStudyReport"),
          value: "",
          type: "text",
          group: 'cfp',
          rules: [],
          error: false
        },
        cfp_version: {
          label: this.$t("carbonfootprintitaly.cfpVersion"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'cfp',
        },
        cfp_verification_statement: {
          label: this.$t("carbonfootprintitaly.cfpVerificationStatement"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: 'cfp'
        },



        cfo_registration_date: {
          label: this.$t("carbonfootprintitaly.cfoRegDate"),
          value: "",
          type: "date",
          rules: [],
          error: false,
          group: 'cfo',
          config: {
            dateFormat: "d/m/Y"
          },
        },
        cfo_reporting_year: {
          label: this.$t("carbonfootprintitaly.cfoReportingYear"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'cfo',
        },
        cfo_total_ghg: {
          label: this.$t("carbonfootprintitaly.cfoTotalGHG"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'cfo',
        },
        cfo_ghg_inventory: {
          label: this.$t("carbonfootprintitaly.cfoGHGInventory"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'cfo',
        },
        cfo_verified_by: {
          label: this.$t("carbonfootprintitaly.cfoVerifiedBy"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'cfo',
        },
        cfo_boundaries: {
          label: this.$t("carbonfootprintitaly.cfoBoundaries"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'cfo',
        },
        cfo_graph: {
          label: this.$t("carbonfootprintitaly.cfoGraph"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: 'cfo'
        },
        cfo_verification_statement: {
          label: this.$t("carbonfootprintitaly.cfoVerificationStatement"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: 'cfo'
        },


        // Emissions
        emission_direct_category_1: {
          label: this.$t("carbonfootprintitaly.emissionDirectCategory1"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'emission',
        },
        emission_direct_scope_1: {
          label: this.$t("carbonfootprintitaly.emissionDirectScope1"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'emission',
        },

        // Emissions
        emission_indirect_category_2: {
          label: this.$t("carbonfootprintitaly.emissionInDirectCategory2"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'emission',
        },
        emission_indirect_category_3: {
          label: this.$t("carbonfootprintitaly.emissionInDirectCategory3"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'emission',
        },
        emission_indirect_category_4: {
          label: this.$t("carbonfootprintitaly.emissionInDirectCategory4"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'emission',
        },
        emission_indirect_category_5: {
          label: this.$t("carbonfootprintitaly.emissionInDirectCategory5"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'emission',
        },
        emission_indirect_category_6: {
          label: this.$t("carbonfootprintitaly.emissionInDirectCategory6"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'emission',
        },
        emission_indirect_scope_2: {
          label: this.$t("carbonfootprintitaly.emissionInDirectScope2"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'emission',
        },
        emission_indirect_scope_3: {
          label: this.$t("carbonfootprintitaly.emissionInDirectScope3"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'emission',
        },


        // Offset
        offset_year: {
          label: this.$t("carbonfootprintitaly.offsetYear"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'offset',
        },
        offset_co2: {
          label: this.$t("carbonfootprintitaly.offsetCO2"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'offset',
        },
        offset_registry: {
          label: this.$t("carbonfootprintitaly.offsetRegistry"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'offset',
        },
        offset_project: {
          label: this.$t("carbonfootprintitaly.offsetProject"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: 'offset',
        },
        offset_reference: {
          label: this.$t("carbonfootprintitaly.offsetReference"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: 'offset',
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
