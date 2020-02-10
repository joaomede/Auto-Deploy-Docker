<template>
  <v-app id="app">
    <Header :drawer="drawer" @eventClose="drawer = $event" />
    <Drawer
      title="Auto Deploy"
      @logout="logout()"
      :drawer="drawer"
      @eventClose="drawer = $event"
    />

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
    this.$store.dispatch("setUrlApi");
    this.$store.dispatch("setUser");
  },
  methods: {
    logout() {
      this.$cookies.remove("user");
      this.$store.dispatch("setUser");
      this.$router.replace("login");
    }
  }
};
</script>
