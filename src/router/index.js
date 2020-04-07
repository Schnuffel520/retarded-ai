import Vue from 'vue';
import VueRouter from 'vue-router';
import { nodes } from './node';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: nodes,
});

export default router;
