<template>
  <fragment>
    <section>
      <div class="form-item form-line-label">
        <label>{{ $t("validator.passport.liability") }}</label>
        <RLinkExplorer v-if="data.liability" :text="data.liability" />
        <div v-else>-</div>
      </div>
      <div class="form-section-title">{{ $t("issuing.form.group1") }}</div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.email") }}</label>
        <div v-if="data.email">{{ data.email }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.promisee") }}</label>
        <div v-if="data.promisee">{{ data.promisee }}</div>
        <div v-else>-</div>
      </div>
    </section>
    <section>
      <div class="form-section-title">{{ $t("issuing.form.group2") }}</div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.log") }}</label>
        <RLinkExplorer v-if="data.log" type="ipfs" :text="data.log" />
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("validator.passport.mvt") }}</label>
        <div v-if="data.mvt">{{ data.mvt }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("validator.passport.period") }}</label>
        <div v-if="data.period_start && data.period_end">
          {{ data.period_start }} - {{ data.period_end }}
        </div>
        <div v-else>-</div>
      </div>
    </section>
    <section>
      <div class="form-section-title">{{ $t("issuing.form.group3") }}</div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.name") }}</label>
        <div v-if="data.name">{{ data.name }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.location") }}</label>
        <div v-if="data.location">{{ data.location }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.dateObject") }}</label>
        <div v-if="data.dateObject">{{ data.dateObject }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.type") }}</label>
        <div v-if="data.type">{{ data.type }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.info") }}</label>
        <div v-if="data.info">{{ data.info }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.power") }}</label>
        <div v-if="data.power">{{ data.power }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.koef") }}</label>
        <div v-if="data.koef">{{ data.koef }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.id") }}</label>
        <div v-if="data.id">{{ data.id }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("issuing.form.gos") }}</label>
        <div v-if="data.gos">{{ data.gos }}</div>
        <div v-else>-</div>
      </div>

      <div class="form-item form-line-label">
        <label>{{ $t("validator.passport.token") }}</label>
        <RLinkExplorer v-if="data.token" category="token" :text="data.token" />
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("validator.passport.tx") }}</label>
        <RLinkExplorer v-if="data.tx" category="tx" :text="data.tx" />
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{ $t("validator.passport.promisor") }}</label>
        <RLinkExplorer v-if="data.promisor" :text="data.promisor" />
        <div v-else>-</div>
      </div>
    </section>
  </fragment>
</template>

<script>
export default {
  props: ["data"]
};
</script>
