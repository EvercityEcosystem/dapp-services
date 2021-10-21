<template>
  <form v-on:submit.prevent="submit">
    <RFormSection :title="$t('carbonfootprintitaly.subtitle')">
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'general' && checkMode(field)">
          <RFieldLabel :isError="field.error">{{ field.label }}</RFieldLabel>
          <input
              v-if="field.type === 'text' "
              type="text"
              v-model="field.value"
              class="container-full"
              :class="{ error: field.error }"
          />
          <input
              v-if="field.type === 'number'"
              type="number"
              v-model="field.value"
              class="container-full"
              :class="{ error: field.error }"
          />
          <flat-pickr
              v-if="field.type === 'date'"
              v-model="field.value"
              :config="field.config"
              class="flatpickr"
              :class="{ error: field.error }"
          />
          <file-pond
              v-if="field.type === 'files'"
              :name="name"
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png, image/tiff"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
          <file-pond
              v-if="field.type === 'file-pdf'"
              :name="name"
              allow-multiple="true"
              accepted-file-types="application/pdf"
              :label-idle="$t('carbonfootprintitaly.dragFile')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>

    <div class="controls">
      <button
          class="btn btn-primary"
          :disabled="mode === 'product'"
          v-on:click="mode = 'product'"
      >
        {{ $t("carbonfootprintitaly.controlProduct") }}
      </button>
      <button
          class="btn btn-primary"
          :disabled="mode === 'organization'"
          v-on:click="mode = 'organization'"
      >
        {{ $t("carbonfootprintitaly.controlOrganization") }}
      </button>
      <button
          class="btn btn-primary"
          :disabled="mode === 'neutrality'"
          v-on:click="mode = 'neutrality'"
      >
        {{ $t("carbonfootprintitaly.controlNeutrality") }}
      </button>
      <button
          class="btn btn-primary"
          :disabled="mode === 'reduction'"
          v-on:click="mode = 'reduction'"
      >
        {{ $t("carbonfootprintitaly.controlReduction") }}
      </button>
    </div>

    <RFormSection
        :title="$t('carbonfootprintitaly.subtitleProduct')"
        v-if="mode === 'product'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'product'">
          <RFieldLabel :isError="field.error">{{ field.label }}</RFieldLabel>
          <input
              v-if="field.type === 'text'"
              type="text"
              v-model="field.value"
              class="container-full"
              :class="{ error: field.error }"
          />
          <input
              v-if="field.type === 'number'"
              type="number"
              v-model="field.value"
              class="container-full"
              :class="{ error: field.error }"
          />
          <flat-pickr
              v-if="field.type === 'date'"
              v-model="field.value"
              :config="field.config"
              class="flatpickr"
              :class="{ error: field.error }"
          />
          <file-pond
              v-if="field.type === 'files'"
              :name="name"
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png, image/tiff"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>

    <RFormSection
        :title="$t('carbonfootprintitaly.subtitleCompany')"
        v-if="mode === 'organization' || mode === 'neutrality'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'company' && checkMode(field)">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
          <input
              v-if="field.type === 'text'"
              type="text"
              v-model="field.value"
              class="container-full"
              :class="{ error: field.error }"
          />
          <input
              v-if="field.type === 'number'"
              type="number"
              v-model="field.value"
              class="container-full"
              :class="{ error: field.error }"
          />
          <flat-pickr
              v-if="field.type === 'date'"
              v-model="field.value"
              :config="field.config"
              class="flatpickr"
              :class="{ error: field.error }"
          />
          <file-pond
              v-if="field.type === 'files'"
              :name="name"
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png, image/tiff"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>

    <!-- cfp product -->
    <RFormSection
        :title="$t('carbonfootprintitaly.subtitleCFP')"
        v-if="mode === 'product'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'cfp'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
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
              v-if="field.type === 'files'"
              :name="name"
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png, image/tiff, application/pdf"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>
    <!-- cfp organization -->
    <RFormSection
        :title="$t('carbonfootprintitaly.subtitleCFO')"
        v-if="mode === 'organization'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'cfo'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
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
              accepted-file-types="image/jpeg, image/png, image/tiff, application/pdf"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>
    <!-- cfp neutrality -->
    <RFormSection
        :title="$t('carbonfootprintitaly.CFP_CFO')"
        v-if="mode === 'neutrality'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'cfpn'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
          <input
              v-if="field.type === 'text'"
              type="text"
              v-model="field.value"
              class="container-full"
              :class="{ error: field.error }"
          />
          <input
              v-if="field.type === 'number'"
              type="number"
              v-model="field.value"
              class="container-full"
              :class="{ error: field.error }"
          />
          <flat-pickr
              v-if="field.type === 'date'"
              v-model="field.value"
              :config="field.config"
              class="flatpickr"
              :class="{ error: field.error }"
          />
          <file-pond
              v-if="field.type === 'files'"
              :name="name"
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png, image/tiff, application/pdf"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>
    <!-- reduction targets neutrality -->
    <RFormSection
        :title="$t('carbonfootprintitaly.reduction_targets')"
        v-if="mode === 'neutrality'"
    >
      <div class="mb-3" v-for="(item, index) in fields.reduction_targets.items" :key="index">
        <RFormField v-for="(field, name) in item" :key="name + '_reduction_targets'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
          <input
              v-if="field.type === 'text'"
              type="text"
              class="container-full"
              v-model="field.value"
              :class="{ error: field.error }"
          />
          <flat-pickr
              v-if="field.type === 'date'"
              v-model="field.value"
              :config="field.config"
              class="flatpickr"
              :class="{ error: field.error }"
          />
        </RFormField>
        <div class="d-flex justify-content-end">
          <button
              v-if="fields.reduction_targets.items.length > 1"
              v-on:click="removeFormArray('reduction_targets', index)" class="btn btn-outline">Remove</button>
        </div>
      </div>
      <div>
        <button v-on:click="addFormArray('reduction_targets')" class="btn btn-blue">+ Add</button>
      </div>
    </RFormSection>
    <!-- Reduction Projects neutrality -->
    <RFormSection
        :title="$t('carbonfootprintitaly.reduction_projects')"
        v-if="mode === 'neutrality'"
    >
      <div v-for="(item, index) in fields.reduction_projects.items" :key="index">
        <RFormField v-for="(field, name) in item" :key="name + '_reduction_projects'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
          <input
              v-if="field.type === 'text'"
              type="text"
              class="container-full"
              v-model="field.value"
              :class="{ error: field.error }"
          />
          <flat-pickr
              v-if="field.type === 'date'"
              v-model="field.value"
              :config="field.config"
              class="flatpickr"
              :class="{ error: field.error }"
          />
        </RFormField>
        <div class="d-flex justify-content-end">
          <button
              v-if="fields.reduction_projects.items.length > 1"
              v-on:click="removeFormArray('reduction_projects', index)" class="btn btn-outline">Remove</button>
        </div>
      </div>
      <div>
        <button v-on:click="addFormArray('reduction_projects')" class="btn btn-blue">+ Add</button>
      </div>
    </RFormSection>

    <!-- reduction Detailed information-->
    <RFormSection
        :title="$t('carbonfootprintitaly.detailedInformation')"
        v-if="mode === 'reduction'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'r_detailed'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
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
              v-if="field.type === 'files'"
              :name="name"
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png, image/tiff, application/pdf"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>
    <!-- reduction ExAnteYearInformation -->
    <RFormSection
        :title="$t('carbonfootprintitaly.ExAnteYearInformation')"
        v-if="mode === 'reduction'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'r_ex_ante_year'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
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
              v-if="field.type === 'files'"
              :name="name"
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png, image/tiff, application/pdf"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
          <select v-model="field.value" v-if="field.type == 'select'" class="container-full"
                  :class="{ error: field.error }">
            <option v-for="item in field.options" :key="item.title">{{ item.title }}</option>
          </select>
        </div>
      </RFormField>
    </RFormSection>
    <!-- reduction ExAntePostInformation -->
    <RFormSection
        :title="$t('carbonfootprintitaly.ExPostYearInformation')"
        v-if="mode === 'reduction'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'r_ex_post_year'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
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
              v-if="field.type === 'files'"
              :name="name"
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png, image/tiff, application/pdf"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
          <select v-model="field.value" v-if="field.type == 'select'" class="container-full"
                  :class="{ error: field.error }">
            <option v-for="item in field.options" :key="item.title">{{ item.title }}</option>
          </select>
        </div>
      </RFormField>
    </RFormSection>

    <RFormSection
        :title="$t('carbonfootprintitaly.subtitleEmission')"
        v-if="mode === 'organization'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'emission'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
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
              accepted-file-types="image/jpeg, image/png, image/tiff"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>

    <RFormSection
        :title="$t('carbonfootprintitaly.subtitleOffset')"
        v-if="mode === 'organization'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'offset'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
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
              accepted-file-types="image/jpeg, image/png, image/tiff"
              :label-idle="$t('carbonfootprintitaly.dragImages')"
              v-bind:server="upload"
              v-on:removefile="removefile"
          />
        </div>
      </RFormField>
    </RFormSection>

    <RFormSection
        :title="$t('carbonfootprintitaly.subtitleGHG')"
        v-if="mode === 'product'"
    >
      <RFormField v-for="(field, name) in fields" :key="name">
        <div v-if="field.group === 'ghg'">
          <RFieldLabel
              :isError="field.error"
              v-html="field.label"
          ></RFieldLabel>
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
              accepted-file-types="image/jpeg, image/png, image/tiff"
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
      model: null,
      mode: 'product',
      fields: {
        reduction_targets: {
          type: 'table',
          rules: [],
          items: []
        },
        reduction_projects: {
          type: 'table',
          items: [],
          rules: [],
        },
        company_name: {
          label: this.$t("carbonfootprintitaly.companyName"),
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: "general",
          show: ['product', 'organization', 'neutrality', 'reduction'],
        },
        company_contact: {
          label: this.$t("carbonfootprintitaly.companyContacts"),
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: "general",
          show: ['product', 'organization', 'neutrality', 'reduction'],
        },
        company_website: {
          label: this.$t("carbonfootprintitaly.companyWebsite"),
          value: "",
          type: "text",
          rules: ["require"],
          error: false,
          group: "general",
          show: ['product', 'organization', 'neutrality', 'reduction'],
        },
        company_phone: {
          label: this.$t("carbonfootprintitaly.companyPhone"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "general",
          show: ['product', 'organization', 'neutrality', 'reduction'],
        },
        company_headquarters: {
          label: this.$t("carbonfootprintitaly.companyHeadquarters"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "general",
          show: ['product', 'organization', 'neutrality', 'reduction'],
        },
        company_logo: {
          label: this.$t("carbonfootprintitaly.companyLogoField"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: "general",
          show: ['product', 'organization'],
        },
        verification_body: {
          label: this.$t("carbonfootprintitaly.verificationBody"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "general",
          show: ['neutrality'],
        },
        verification_certificate: {
          label: this.$t("carbonfootprintitaly.verificationCertificate"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "general",
          show: ['reduction'],
        },
        pas_certificate: {
          label: this.$t("carbonfootprintitaly.pasCertificate"),
          items: {},
          type: "file-pdf",
          fileTypes: "",
          rules: [],
          error: false,
          group: "general",
          show: ['neutrality'],
        },
        cfo_cfp_registration: {
          label: this.$t("carbonfootprintitaly.cfoCfpRegistration"),
          items: {},
          type: "text",
          rules: [],
          error: false,
          show: ['neutrality'],
          group: "company"
        },
        company_reg_number: {
          label: this.$t("carbonfootprintitaly.companyRegNumber"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "company",
          show: ['organization'],
          showOnProduct: false,
          showOnOrganization: true
        },
        company_activity: {
          label: this.$t("carbonfootprintitaly.companyActivity"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "company",
          show: ['organization', 'neutrality']
        },
        company_base_year: {
          label: this.$t("carbonfootprintitaly.companyBaseYear"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "company",
          show: ['organization'],
          showOnProduct: false,
          showOnOrganization: true
        },
        company_base_total_footprint: {
          label: this.$t("carbonfootprintitaly.companyBaseTotalFootprint"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "company",
          show: ['organization'],
          showOnProduct: false,
          showOnOrganization: true
        },
        company_note: {
          label: this.$t("carbonfootprintitaly.companyNote"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "company",
          show: ['organization'],
          showOnProduct: false,
          showOnOrganization: true
        },
        company_photo: {
          label: this.$t("carbonfootprintitaly.companyPhotoField"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          show: ['organization', 'neutrality'],
          group: "company"
        },
        product_registration_n: {
          label: this.$t("carbonfootprintitaly.productRegNumber"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "product"
        },
        product_name: {
          label: this.$t("carbonfootprintitaly.productName"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "product"
        },
        product_description: {
          label: this.$t("carbonfootprintitaly.productDescription"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "product"
        },
        product_photo: {
          label: this.$t("carbonfootprintitaly.productPhotoField"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: "product"
        },
        //footprint neutrality
        cfpn_registration_date: {
          label: this.$t("carbonfootprintitaly.cfpRegDate"),
          value: "",
          type: "date",
          rules: [],
          error: false,
          group: "cfpn",
          config: {
            dateFormat: "d/m/Y"
            // locale: Russian
          }
        },
        cfpn_du: {
          label: this.$t("carbonfootprintitaly.cfpDU"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfpn"
        },
        cfpn_value: {
          label: this.$t("carbonfootprintitaly.cfpnValue"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: "cfpn"
        },
        cfon_value: {
          label: this.$t("carbonfootprintitaly.cfonValue"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: "cfpn"
        },
        ghgn_value: {
          label: this.$t("carbonfootprintitaly.ghgnValue"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: "cfpn"
        },
        n_offseting_year: {
          label: this.$t("carbonfootprintitaly.nOffsetingYear"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: "cfpn"
        },
        cfpn_chart: {
          label: this.$t("carbonfootprintitaly.cfpChart"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: "cfpn"
        },
        // reduction about
        r_detail_info_name: {
          label: this.$t("carbonfootprintitaly.RDetailInfoName"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "r_detailed"
        },
        r_detail_info_descr: {
          label: this.$t("carbonfootprintitaly.RDetailInfoDescr"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "r_detailed"
        },
        r_detail_info_plants: {
          label: this.$t("carbonfootprintitaly.RDetailInfoPlants"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "r_detailed"
        },
        // reduction r_ex_ante_year
        r_ex_year: {
          label: this.$t("carbonfootprintitaly.RExYear"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: "r_ex_ante_year"
        },
        r_total_em: {
          label: this.$t("carbonfootprintitaly.RTotalEm"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "r_ex_ante_year"
        },
        r_total_em_unit: {
          label: this.$t("carbonfootprintitaly.RTotalEmUnit"),
          value: "",
          type: "select",
          rules: [],
          error: false,
          group: "r_ex_ante_year",
          options: [
            {
              title: 'g CO<sup>2</sup>e/FU',
            },
            {
              title: 'g CO<sup>2</sup>e/DU'
            },
            {
              title: 'kg CO<sup>2</sup>e/FU'
            },
            {
              title: 'kg CO<sup>2</sup>e/DU'
            },
            {
              title: 't CO<sup>2</sup>e/DU'
            },
            {
              title: 't CO<sup>2</sup>e/FU'
            },
            {
              title: 't CO<sup>2</sup>e'
            }
          ]
        },
        r_verified_by: {
          label: this.$t("carbonfootprintitaly.RVerifiedBy"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "r_ex_ante_year"
        },
        r_ex_regnum: {
          label: this.$t("carbonfootprintitaly.RExRegistration"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "r_ex_ante_year"
        },
        // reduction r_ex_post_year
        r_post_year: {
          label: this.$t("carbonfootprintitaly.RExYear"),
          value: "",
          type: "number",
          rules: [],
          error: false,
          group: "r_ex_post_year"
        },
        r_post_total_em: {
          label: this.$t("carbonfootprintitaly.RTotalEm"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "r_ex_post_year"
        },
        r_post_total_unit: {
          label: this.$t("carbonfootprintitaly.RTotalEmUnit"),
          value: "",
          type: "select",
          rules: [],
          error: false,
          group: "r_ex_post_year",
          options: [
            {
              title: 'g CO2e/FU',
            },
            {
              title: 'g CO2e/DU'
            },
            {
              title: 'kg CO2e/FU'
            },
            {
              title: 'kg CO2e/DU'
            },
            {
              title: 't CO2e/DU'
            },
            {
              title: 't CO2e/FU'
            },
            {
              title: 't CO2e'
            }
          ]
        },
        r_post_verified_by: {
          label: this.$t("carbonfootprintitaly.RVerifiedBy"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "r_ex_post_year"
        },
        r_post_regnum: {
          label: this.$t("carbonfootprintitaly.RExRegistration"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "r_ex_post_year"
        },
        r_post_description: {
          label: this.$t("carbonfootprintitaly.RPostDescription"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "r_ex_post_year"
        },
        r_post_image: {
          label: this.$t("carbonfootprintitaly.RPostImage"),
          value: "",
          type: "files",
          rules: [],
          error: false,
          group: "r_ex_post_year"
        },
        r_post_chart: {
          label: this.$t("carbonfootprintitaly.cfpChart"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: "r_ex_post_year"
        },
        // footprint
        cfp_registration_date: {
          label: this.$t("carbonfootprintitaly.cfpRegDate"),
          value: "",
          type: "date",
          rules: [],
          error: false,
          group: "cfp",
          config: {
            dateFormat: "d/m/Y"
            // locale: Russian
          }
        },
        cfp_du: {
          label: this.$t("carbonfootprintitaly.cfpDU"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfp"
        },
        cfp_value: {
          label: this.$t("carbonfootprintitaly.cfpValue"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfp"
        },
        cfp_chart: {
          label: this.$t("carbonfootprintitaly.cfpChart"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: "cfp"
        },
        cfp_reference_year: {
          label: this.$t("carbonfootprintitaly.cfpReferenceYear"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfp"
        },
        cfp_system_boundaries: {
          label: this.$t("carbonfootprintitaly.cfpSystemBoundaries"),
          value: "",
          type: "text",
          group: "cfp",
          rules: [],
          error: false
        },
        cfp_stages_excluded: {
          label: this.$t("carbonfootprintitaly.cfpStagesExcluded"),
          value: "",
          type: "text",
          group: "cfp",
          rules: [],
          error: false
        },
        cfp_plants_included: {
          label: this.$t("carbonfootprintitaly.cfpPlantsIncluded"),
          value: "",
          type: "text",
          group: "cfp",
          rules: [],
          error: false
        },
        cfp_reference_pcr: {
          label: this.$t("carbonfootprintitaly.cfpReferencePCR"),
          value: "",
          type: "text",
          group: "cfp",
          rules: [],
          error: false
        },
        cfp_study_report: {
          label: this.$t("carbonfootprintitaly.cfpStudyReport"),
          value: "",
          type: "text",
          group: "cfp",
          rules: [],
          error: false
        },
        cfp_version: {
          label: this.$t("carbonfootprintitaly.cfpVersion"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfp"
        },
        cfp_verified_by: {
          label: this.$t("carbonfootprintitaly.cfpVeriedBy"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfp"
        },
        cfp_notes: {
          label: this.$t("carbonfootprintitaly.cfpNotes"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfp"
        },
        cfp_verification_statement: {
          label: this.$t("carbonfootprintitaly.cfpVerificationStatement"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: "cfp"
        },

        cfo_registration_date: {
          label: this.$t("carbonfootprintitaly.cfoRegDate"),
          value: "",
          type: "date",
          rules: [],
          error: false,
          group: "cfo",
          config: {
            dateFormat: "d/m/Y"
          }
        },
        cfo_reporting_year: {
          label: this.$t("carbonfootprintitaly.cfoReportingYear"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfo"
        },
        cfo_total_ghg: {
          label: this.$t("carbonfootprintitaly.cfoTotalGHG"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfo"
        },
        cfo_ghg_inventory: {
          label: this.$t("carbonfootprintitaly.cfoGHGInventory"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfo"
        },
        cfo_verified_by: {
          label: this.$t("carbonfootprintitaly.cfoVerifiedBy"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfo"
        },
        cfo_boundaries: {
          label: this.$t("carbonfootprintitaly.cfoBoundaries"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "cfo"
        },
        cfo_graph: {
          label: this.$t("carbonfootprintitaly.cfoGraph"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: "cfo"
        },
        cfo_verification_statement: {
          label: this.$t("carbonfootprintitaly.cfoVerificationStatement"),
          items: {},
          type: "files",
          rules: [],
          error: false,
          group: "cfo"
        },

        // Emissions
        emission_direct_category_1: {
          label: this.$t("carbonfootprintitaly.emissionDirectCategory1"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "emission"
        },
        emission_direct_scope_1: {
          label: this.$t("carbonfootprintitaly.emissionDirectScope1"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "emission"
        },

        // Emissions
        emission_indirect_category_2: {
          label: this.$t("carbonfootprintitaly.emissionInDirectCategory2"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "emission"
        },
        emission_indirect_category_3: {
          label: this.$t("carbonfootprintitaly.emissionInDirectCategory3"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "emission"
        },
        emission_indirect_category_4: {
          label: this.$t("carbonfootprintitaly.emissionInDirectCategory4"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "emission"
        },
        emission_indirect_category_5: {
          label: this.$t("carbonfootprintitaly.emissionInDirectCategory5"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "emission"
        },
        emission_indirect_category_6: {
          label: this.$t("carbonfootprintitaly.emissionInDirectCategory6"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "emission"
        },
        emission_indirect_scope_2: {
          label: this.$t("carbonfootprintitaly.emissionInDirectScope2"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "emission"
        },
        emission_indirect_scope_3: {
          label: this.$t("carbonfootprintitaly.emissionInDirectScope3"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "emission"
        },

        // Offset
        offset_year: {
          label: this.$t("carbonfootprintitaly.offsetYear"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "offset"
        },
        offset_co2: {
          label: this.$t("carbonfootprintitaly.offsetCO2"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "offset"
        },
        offset_registry: {
          label: this.$t("carbonfootprintitaly.offsetRegistry"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "offset"
        },
        offset_project: {
          label: this.$t("carbonfootprintitaly.offsetProject"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "offset"
        },
        offset_reference: {
          label: this.$t("carbonfootprintitaly.offsetReference"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "offset"
        },

        // ghg
        ghg_fossil: {
          label: this.$t("carbonfootprintitaly.ghgFossil"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "ghg"
        },
        ghg_emissions: {
          label: this.$t("carbonfootprintitaly.ghgEmissions"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "ghg"
        },
        ghg_removals: {
          label: this.$t("carbonfootprintitaly.ghgRemovals"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "ghg"
        },
        ghg_res: {
          label: this.$t("carbonfootprintitaly.ghgResulting"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "ghg"
        },
        ghg_aircraft: {
          label: this.$t("carbonfootprintitaly.ghgAircraft"),
          value: "",
          type: "text",
          rules: [],
          error: false,
          group: "ghg"
        }
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
  created() {
    this.addFormArray('reduction_targets');
    this.addFormArray('reduction_projects');
  },
  methods: {
    reduction_targets_field() {
      return [
        {
          label: this.$t("carbonfootprintitaly.rt_targets_achieved"),
          name: 'targets_achieved',
          value: "",
          type: "text",
          error: false,
          rules: [],
        },
        {
          label: this.$t("carbonfootprintitaly.rt_ghu"),
          name: 'ghu',
          value: "",
          type: "text",
          error: false,
          rules: [],
        },
        {
          label: this.$t("carbonfootprintitaly.rt_date"),
          value: "",
          name: 'targets_achieved_date',
          type: "date",
          rules: [],
          config: {
            dateFormat: "d/m/Y"
          }
        }];
    },
    reduction_projects_field() {
      return [
        {
          label: this.$t("carbonfootprintitaly.rp_programme"),
          name: 'programme',
          value: "",
          type: "text",
          error: false,
          rules: [],
        },
        {
          label: this.$t("carbonfootprintitaly.rp_project_name"),
          name: 'project_name',
          value: "",
          type: "text",
          error: false,
          rules: [],
        },
        {
          label: this.$t("carbonfootprintitaly.rp_project_code"),
          name: 'project_code',
          value: "",
          type: "text",
          error: false,
          rules: [],
        },
        {
          label: this.$t("carbonfootprintitaly.rp_sector"),
          name: 'sector',
          value: "",
          type: "text",
          error: false,
          rules: [],
        },
        {
          label: this.$t("carbonfootprintitaly.rp_credits"),
          name: 'credits',
          value: "",
          type: "text",
          error: false,
          rules: [],
        }
      ];
    },
    addFormArray(code) {
      if (this.fields[code]) {
        switch (code) {
          case 'reduction_targets':
            this.fields[code].items.push(this.reduction_targets_field());
            break;
          case 'reduction_projects':
            this.fields[code].items.push(this.reduction_projects_field());
            break;
        }

      }
    },
    removeFormArray(code, index) {
      if (this.fields[code]) {
        this.fields[code].items.splice(index, 1);
      }
    },
    checkMode(field) {
      return field.show.indexOf(this.mode) > -1;
    },
    removefile(a, file) {
      if (this.fields.images.items[file.filename]) {
        delete this.fields.images.items[file.filename];
      }
    }
  }
};
</script>
