<template>
  <v-app id="app">
    <Header :drawer="drawer" @eventClose="drawer = $event" />
    <Drawer :drawer="drawer" @eventClose="drawer = $event" />

    <v-content>
      <router-view />
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Header from "./layout/Header";
import Drawer from "./layout/Drawer";
import Footer from "./layout/Footer";
export default {
  components: {
    Footer,
    Header,
    Drawer
  },
  data() {
    return {
      drawer: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    logout() {
      // this.$firebase.auth().signOut();
      // this.$cookies.remove("user");
      // this.$store.dispatch("setUser");
      // this.$router.replace("login");
    },
    init() {
      // this.$store.dispatch("setUser");
    }
  }
};
</script>
