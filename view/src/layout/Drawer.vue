<template>
  <v-app-bar app color="blue" dark>
    <v-app-bar-nav-icon
      @click.stop="
        state = !state;
        eventClose();
      "
    />

    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <div class="flex-grow-1" />

    <v-btn icon to="login">
      <v-icon>fas fa-sign-in-alt</v-icon>
    </v-btn>

    <v-btn icon @click="logout()">
      <v-icon>fas fa-sign-out-alt</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Drawer",
  props: {
    drawer: {
      type: Boolean
    }
  },
  data() {
    return {
      state: false,
      title: "Auto Deploy"
    };
  },
  watch: {
    drawer: "update"
  },
  methods: {
    update() {
      this.state = this.drawer;
    },
    eventClose() {
      this.$emit("eventClose", this.state);
    }
  }
});
</script>

<style scoped></style>
