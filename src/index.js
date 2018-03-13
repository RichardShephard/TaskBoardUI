import Vue from 'vue';
import VueRouter from 'vue-router';
import home from './components/home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: home }
    ]
});

new Vue({
    router,
    el: '#app',
    render: h => h(home)
});

