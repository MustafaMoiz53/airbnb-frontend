import Vue from 'vue';
import App from './App.vue';
import router from './router.js'; // Ensure this file exists and is properly set up

Vue.config.productionTip = false;

new Vue({
  router, // Add the router here
  render: h => h(App),
}).$mount('#app');
