<template>
  <fragment>
    <section>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.liability')}}</label>
        <LinkExplorer :text="data.liability" />
      </div>
    </section>
    <section>
      <div class="form-section-title">{{$t('validator.passport.group1')}}</div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.email')}}</label>
        <div>{{ data.email }}</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.promisee')}}</label>
        <div>{{ data.promisee }}</div>
      </div>
    </section>
    <section>
      <div class="form-section-title">{{$t('validator.passport.group2')}}</div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.log')}}</label>
        <LinkExplorer type="ipfs" :text="data.log" />
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.mvt')}}</label>
        <div>{{ data.mvt }}</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.period')}}</label>
        <div>{{ data.period_start }} - {{ data.period_end }}</div>
      </div>
    </section>
    <section>
      <div class="form-section-title">{{$t('validator.passport.group3')}}</div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.name')}}</label>
        <div>{{ data.name }}</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.location')}}</label>
        <div>{{ data.location }}</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.dateObject')}}</label>
        <div>{{ data.dateObject }}</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.type')}}</label>
        <div>{{ data.type }}</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.info')}}</label>
        <div>{{ data.info }}</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.power')}}</label>
        <div>{{ data.power }}</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.koef')}}</label>
        <div>{{ data.koef }}</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.id')}}</label>
        <div>{{ data.id }}</div>
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.gos')}}</label>
        <div>{{ data.gos }}</div>
      </div>
    </section>
    <section>
      <div class="form-section-title">{{$t('validator.passport.group4')}}</div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.promisor')}}</label>
        <LinkExplorer :text="data.promisor" />
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.token')}}</label>
        <LinkExplorer category="token" :text="data.token" />
      </div>
      <div class="form-item form-line-label">
        <label>{{$t('validator.passport.tx')}}</label>
        <LinkExplorer category="tx" :text="data.tx" />
      </div>
      <!-- <div class="form-item form-line-label">
        <label>{{$t('validator.passport.date')}}</label>
        <div>{{ data.date }}</div>
      </div>-->
    </section>
  </fragment>
</template>

<script>
export default {
  props: ["data"]
};
</script>
