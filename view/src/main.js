import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./css/style.css";
import VueCookies from "vue-cookies";
import mixinsComputed from "./mixins/mixin";
import "./plugins/vee-validate";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import wb from "./registerServiceWorker";

Vue.prototype.$workbox = wb;

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.mixin(mixinsComputed);
Vue.use(VueCookies);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
