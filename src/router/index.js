import PageIssuing from '@/components/issuing/Page';
import PageLiability from '@/components/liability/Page';
import PageServices from '@/components/services/Page';
import PageOffsetting from '@/components/offsetting/Page';
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
    { path: '*', redirect: '/' }
  ]
});
