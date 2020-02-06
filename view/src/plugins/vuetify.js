import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
import Vuetify, { VSnackbar } from "vuetify/lib";
import VuetifyToast from "vuetify-toast-snackbar";

Vue.use(Vuetify, {
  components: {
    VSnackbar
  }
});

Vue.use(VuetifyToast, {
  dismissable: true // default
});

export default new Vuetify({});
