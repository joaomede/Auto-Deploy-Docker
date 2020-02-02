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

<script lang="ts">
import Vue from "vue";
import Header from "./layout/Header.vue";
import Drawer from "./layout/Drawer.vue";
import Footer from "./layout/Footer.vue";

export default Vue.extend({
  name: "App",

  components: {
    Header,
    Drawer,
    Footer
  },

  data: () => ({
    drawer: false
  })
});
</script>
