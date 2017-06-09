import Vue from 'vue';
import Router from 'vue-router';

const RegLogin = require('../components/RegLogin.vue');
const HomeTab = require('../components/HomeTab.vue');
const IconManage = require('../components/IconManage.vue');

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            components: {
                main: RegLogin
            }
        },
        {
            path: '/register',
            components: {
                main: RegLogin
            }
        },
        {
            path: '/iconManage/:sig',
            components: {
                header: HomeTab
            }
        }
    ]
});
