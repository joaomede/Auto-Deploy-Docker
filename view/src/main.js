import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";
import "./css/style.css";
import VueCookies from "vue-cookies";
import mixinsComputed from "./mixins/mixin";
import "./plugins/vee-validate";
import { ValidationObserver, ValidationProvider } from "vee-validate";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.mixin(mixinsComputed);
Vue.use(VueCookies);
Vue.use(axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
