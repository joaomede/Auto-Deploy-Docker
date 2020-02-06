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
