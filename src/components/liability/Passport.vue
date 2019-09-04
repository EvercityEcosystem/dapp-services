<template>
  <fragment>
    <section>
      <div class="form-item form-line-label">
        <label>Уникальный номер сертификата</label>
        <LinkExplorer v-if="data.liability" :text="data.liability" />
        <div v-else>-</div>
      </div>
      <div class="form-section-title">Владелец сертификата</div>
      <div class="form-item form-line-label">
        <label>Контактный e-mail</label>
        <div v-if="data.email">{{ data.email }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Информация о владельце выпускаемого сертификата</label>
        <div v-if="data.promisee">{{ data.promisee }}</div>
        <div v-else>-</div>
      </div>
    </section>
    <section>
      <div class="form-section-title">Собранная информация</div>
      <div class="form-item form-line-label">
        <label>Лог от IoT счётчика доступен в IPFS по ссылке</label>
        <LinkExplorer v-if="data.log" type="ipfs" :text="data.log" />
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Объем электрической энергии, на который выдан сертификат, МВт*ч</label>
        <div v-if="data.mvt">{{ data.mvt }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Период, в течение которого была произведена электроэнергия</label>
        <div
          v-if="data.period_start && data.period_end"
        >{{ data.period_start }} - {{ data.period_end }}</div>
        <div v-else>-</div>
      </div>
    </section>
    <section>
      <div class="form-section-title">Сведения об источнике энергии</div>
      <div class="form-item form-line-label">
        <label>Наименование генерирующего объекта</label>
        <div v-if="data.name">{{ data.name }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Место нахождения (в том числе географические координаты)</label>
        <div v-if="data.location">{{ data.location }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Дата ввода генерирующего объекта в эксплуатацию</label>
        <div v-if="data.dateObject">{{ data.dateObject }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Вид возобновляемого источника энергии</label>
        <div v-if="data.type">{{ data.type }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Сведения, однозначно определяющие генерирующий объект</label>
        <div v-if="data.info">{{ data.info }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Установленная мощность генерирующего объекта</label>
        <div v-if="data.power">{{ data.power }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Коэффициенты (удельные объёмы) вредных выбросов, связываемых с генерацией</label>
        <div v-if="data.koef">{{ data.koef }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Идентификатор генерирующего объекта</label>
        <div v-if="data.id">{{ data.id }}</div>
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>В отношении генерирующего объекта за период времени, в течение которого была осуществлена выработка электроэнергии, осуществлялась государственная поддержка</label>
        <div v-if="data.gos">{{ data.gos }}</div>
        <div v-else>-</div>
      </div>

      <div class="form-item form-line-label">
        <label>Создан реестр зеленых сертификатов по адресу</label>
        <LinkExplorer v-if="data.token" category="token" :text="data.token" />
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Выполнена транзакция на выдачу зеленого сертификата</label>
        <LinkExplorer v-if="data.tx" category="tx" :text="data.tx" />
        <div v-else>-</div>
      </div>
      <div class="form-item form-line-label">
        <label>Должностное лицо осуществившее операцию в реестре</label>
        <LinkExplorer v-if="data.promisor" :text="data.promisor" />
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
