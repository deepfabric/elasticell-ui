import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Storage from 'vue-web-storage';
import Routers from './router';
import App from './app.vue';
import Util from './libs/util.js';
import './libs/jquery.min.js';
import './libs/bootstrap.min.js';
import './libs/metisMenu.min.js';
import './libs/sb-admin-2.min.js';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Storage, {
    prefix: 'elasticell',// default `app_`
    driver: 'local', // default 'local'
});

Vue.filter("storeState", Util.storeState)
Vue.filter("GB", Util.gb)
Vue.filter("date", Util.date)
Vue.filter("range", Util.range)

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
