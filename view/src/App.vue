<template>
  <v-app id="app">
    <Header :drawer="drawer" @eventClose="drawer = $event" />
    <Drawer
      title="Auto Deploy Docker"
      @logout="logout()"
      :drawer="drawer"
      @eventClose="drawer = $event"
    />
    <div class="upgrade-dialog" v-if="showUpgradeUI">
      <div class="upgrade-dialog__message">
        A new version is found. Refresh to load it?
      </div>
      <ButtonBlack name="Later" @eventClick="showUpgradeUI = false" />
      <ButtonGreen name="Reload" @eventClick="accept" />
    </div>
    <v-content>
      <router-view />
    </v-content>
    testandoasdas
    <Footer style="z-index: 500" />
  </v-app>
</template>

<script>
import ButtonBlack from "./components/button/BlackButton";
import ButtonGreen from "./components/button/GreenButton";

import Header from "./layout/Header";
import Drawer from "./layout/Drawer";
import Footer from "./layout/Footer";
export default {
  components: {
    ButtonGreen,
    ButtonBlack,
    Footer,
    Header,
    Drawer
  },
  data() {
    return {
      drawer: false,
      showUpgradeUI: false
    };
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
    this.$store.dispatch("setUrlApi");
    this.$store.dispatch("setUser");
  },
  methods: {
    async accept() {
      this.showUpgradeUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
    logout() {
      this.$cookies.remove("user");
      this.$store.dispatch("setUser");
      this.$router.replace("login");
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.upgrade-dialog {
  z-index: 9999;
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px 12px;
  color: white;
  background-color: #2c3e50;
  box-shadow: 0 4px 4px rgba(#2c3e50, 0.4);
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 8px;
  &__message {
    grid-column: 1 / 3;
  }
}
</style>
