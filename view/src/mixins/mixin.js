export default {
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
    },
    cContainerList() {
      if (this.$store.getters.getContainerList !== null) {
        return this.$store.getters.getContainerList;
      }
    },
    cDeployList() {
      if (this.$store.getters.getDeployList !== null) {
        return this.$store.getters.getDeployList;
      }
    }
  },
  methods: {
    notify(message, color) {
      this.$toast(message, {
        color: color,
        dismissable: true
      });
    }
  }
};
