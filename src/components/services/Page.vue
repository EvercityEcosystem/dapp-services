<template>
  <fragment>
    <h1>{{ $t('services.title') }}</h1>
    <section class="flex-grid">
      <div
        v-for="(service, index) in services"
        :key="index"
        class="section-light item"
        :class="{disabled: service.disabled}"
      >
        <router-link class="item-avatar" :to="{ name: service.link }">
          <span class="item-avatar--image" :style="`background-image: url('${service.img}')`"></span>
        </router-link>
        <div class="item-content">
          <h2>
            <router-link :to="{ name: service.link }">{{service[$i18n.locale].name}}</router-link>
          </h2>
          <div class="t-hyphen">{{service[$i18n.locale].desc}}</div>
          <div class="item-bottom">
            <div class="item-bottom--line">
              <span>{{ $t('services.provider') }}:</span>
              <span class="item-bottom--info">{{service.by.label}}</span>
            </div>
            <div v-if="service.token && service.token.name" class="item-bottom--line">
              <span>{{ $t('services.token') }}:</span>
              <span class="item-bottom--info">{{service.token.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
import { Token } from "robonomics-js";
import Web3Check from "vue-web3-check";
import config from "../../config";

export default {
  data() {
    return {
      services: [
        {
          en: {
            name: "Environmental assets tokenization",
            desc:
              "Emission of carbon units and green certificates based on data from renewable energy sources."
          },
          ru: {
            name: "Токенизация экологических активов",
            desc:
              "Сервис эмиссии углеродных единиц и зеленых сертификатов на основе данных от возобновляемого источника электроэнергии."
          },
          link: "issuing",
          img: "assets/i/services/smart-assets.png",
          by: {
            link: "#",
            label: "DAO IPCI IoT connection"
          },
          token: false,
          disabled: false
        },
        {
          en: {
            name: "Smart building offsetting",
            desc:
              "Carbon footprint clearance for smart buildings based on geolocation and energy consumption information."
          },
          ru: {
            name: "Погашение углеродного следа для умного здания",
            desc:
              "Сервис погашения углеродного следа умных зданий на основе информации о геолокации и потреблении электроэнергии."
          },
          link: "offsetting",
          img: "assets/i/services/smart-buildings.png",
          by: {
            link: "#",
            label: "DAO IPCI IoT connection"
          },
          token: null,
          disabled: false
        },
        {
          en: {
            name: "Supporting First Solar Energy Project in Mauritius",
            desc:
              "15.2 MW solar photovoltaic power plant located in Mauritius, a country part of the Small Island Developing States (SIDS). It is the island first ever solar power plant."
          },
          ru: {
            name:
              "Погашение углеродного следа с помощью солнечной энергии на острове Маврикий",
            desc:
              "Солнечная фотоэлектрическая электростанция мощностью 15,2 МВт расположена на Маврикии, в стране, являющейся частью малых островных развивающихся государств (МОРАГ). Это первая в мире солнечная электростанция на острове."
          },
          link: "mauritius",
          img: "assets/i/services/ipci-project-bambous-01.jpg",
          by: {
            link: "#",
            label: "Russian Carbon Fund, Aera Group"
          },
          token: null,
          disabled: false
        },
        {
          en: {
            name: "Waste Coke Oven Gas Utilization, Kemerovo, Russia",
            desc:
              "Khimprom LLC has completed independent assurance procedure under the DAO IPCI requirements for GHG emission reductions achieved in 2013-2016 by performing Waste Coke Oven Gas Utilization Project to substitute natural gas heat generation in the amount of 201,085 tCO2. Assurance has been performed by KPMG (Russia)"
          },
          ru: {
            name: "Утилизация отработанного коксового газа, Кемерово, Россия",
            desc:
              "ООО «Химпром» завершило процедуру независимого заверения в соответствии с требованиями DAO IPCI в отношении сокращения выбросов ПГ, достигнутого в 2013–2016 годах, путем реализации проекта утилизации отработанного коксового газа с целью замещения выработки тепла природным газом в объеме 201 085 т CO2. Подтверждение выполнено KPMG (Россия)"
          },
          link: "khimprom",
          img: "assets/i/services/ipci-project-himprom-02.jpg",
          by: {
            link: "#",
            label: "DAO IPCI, Russian Carbon Fund"
          },
          token: null,
          disabled: false
        },
        {
          en: {
            name: "Wood waste to heat energy, Sharya, Russia",
            desc:
              "SWISS KRONO LLC has completed independent assurance procedure under the DAO IPCI requirements for GHG emission reductions achieved in 2013-2016 by performing “Wood waste to heat energy” from 1 January 2013 to 30 June 2017 in amount of 1,419,861 tons of CO2-equivalent. Assurance has been performed by KPMG (Russia)"
          },
          ru: {
            name: "Древесные отходы для тепловой энергии, Шарья, Россия",
            desc:
              "Компания SWISS KRONO LLC завершила процедуру независимой гарантии в соответствии с требованиями DAO IPCI в отношении сокращения выбросов парниковых газов, достигнутого в 2013–2016 годах, выполнив «Древесные отходы для выработки тепловой энергии» с 1 января 2013 года по 30 июня 2017 года в объеме 1 419 861 тонн в эквиваленте CO2. Был выполнен KPMG (Россия)"
          },
          link: "swissKrono",
          img: "assets/i/services/ipci-project-swisskrono-03.jpg",
          by: {
            link: "#",
            label: "Russian Carbon Fund, Aera Group"
          },
          token: null,
          disabled: false
        },
        {
          en: {
            name:
              "NAZARBAYEV UNIVERSITY SOLAR AND WIND ENERGY POWERPLANT, KAZAKHSTAN",
            desc:
              "Nazarbayev University is a modern and rapidly developing research and higher education schools in Republic of Kazakhstan. It's Technopark operates 49 kW powerplant inclues diverse photovoltaic pannels and wind generators."
          },
          ru: {
            name:
              "ВОЗОБНОВЛЯЕМЫЕ ИСТОЧНИКИ ЭНЕРГИИ НАЗАРБАЕВ УНИВЕРСИТЕТА, КАЗАХСТАН",
            desc:
              "Назарбаев Университет - современная и быстро развивающаяся научно-исследовательская и высшая школа в Республике Казахстан. В его Технопарке работает электрогенерирующая мощностью 49 кВт, в которую входят различные типы фотогальванических панелей и ветрогенераторов."
          },
          link: "nudao",
          img: "assets/i/services/nudao.jpg",
          by: {
            link: "#",
            label:
              "Nazarbayev University office of Green Campus and Environment Developent"
          },
          token: null,
          disabled: false
        },
      ]
    };
  },
  created() {
    document.title = this.$t("title");
  },
  mounted() {
    this.loadTokens();
  },
  methods: {
    loadTokens() {
      const tokens = config.chain(Web3Check.store.state.networkId).token;
      this.services.forEach(async (service, i) => {
        if (
          service.token === null &&
          tokens.hasOwnProperty(service.link) &&
          tokens[service.link] !== "0x0000000000000000000000000000000000000000"
        ) {
          const token = new Token(this.$robonomics.web3, tokens[service.link]);
          const name = await token.call.name();
          const symbol = await token.call.symbol();
          this.services[i].token = {
            address: tokens[service.link],
            name: `${name} (${symbol})`
          };
        }
      });
    }
  }
};
</script>
