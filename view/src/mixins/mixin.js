import snackbar from "../components/alert/Snackbar.vue";
export default {
  components: {
    snackbar
  },
  computed: {
    user() {
      if (this.$store.getters.getUser !== null) {
        return this.$store.getters.getUser;
      } else {
        return {
          id: null,
          email: "email@email.com",
          name: "Nothing",
          headers: {
            auth: "nothing nothing"
          }
        };
      }
    }
  }
};
