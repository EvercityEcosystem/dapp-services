import PageIssuing from '@/components/issuing/Page';
import PageLiability from '@/components/liability/Page';
import PageServices from '@/components/services/Page';
import PageOffsetting from '@/components/offsetting/Page';
import PageMauritius from '@/components/mauritius/Page';
import PageKhimprom from '@/components/khimprom/Page';
import PageSwissKrono from '@/components/swissKrono/Page';
import PageNudao from '@/components/nudao/Page';
import PageValidator from '@/components/validator/Page';
import PageAgrix from '@/components/agrix/Page';
import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'services',
      component: PageServices,
      props: true
    },
    {
      path: '/offsetting',
      name: 'offsetting',
      component: PageOffsetting
    },
    {
      path: '/mauritius',
      name: 'mauritius',
      component: PageMauritius
    },
    {
      path: '/khimprom',
      name: 'khimprom',
      component: PageKhimprom
    },
    {
      path: '/swiss-krono',
      name: 'swissKrono',
      component: PageSwissKrono
    },
    {
      path: '/nudao',
      name: 'nudao',
      component: PageNudao
    },
    {
      path: '/issuing',
      name: 'issuing',
      component: PageIssuing
    },
    {
      path: '/liability/:liability',
      name: 'liability',
      component: PageLiability,
      props: true
    },
    {
      path: '/validator',
      name: 'validator',
      component: PageValidator
    },
    {
      path: '/agrix',
      name: 'agrix',
      component: PageAgrix
    },
    { path: '*', redirect: '/' }
  ]
});
