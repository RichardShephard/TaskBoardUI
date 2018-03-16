import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './components/app.vue';
import Home from './components/home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: Home }
    ]
});

new Vue({
    router,
    el: '#app',
    render: h => h(Home),
});

// new Vue({
//     el: '#app',
//     render: h => h(App),
// });

// import Vue from 'vue';
// import VueRouter from 'vue-router';
// // import Vuetify from 'vuetify';
// // import 'prismjs/prism';
// // import 'prismjs/themes/prism.css';
// // import 'prismjs/themes/prism-solarizedlight.css';
// // import 'vuetify/dist/vuetify.min.css';
// import App from './components/App.vue';
// // import Home from './components/Home.vue';
// // import Config from './components/Config.vue';

// Vue.use(VueRouter);
// // Vue.use(Vuetify);

// const router = new VueRouter({
//   routes: [
//     { path: '/', component: Home },
//     { path: '/config', component: Config }
//   ]
// });

// new Vue({
//     router,
//     el: '#app',
//     render: h => h(App),
// });
