<template>
  <div>
    <v-snackbar v-model="show">
      {{ message }}
      <v-btn :color="color" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    },
    message: {
      type: Number
    },
    color: {
      type: String
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    update() {
      this.open = this.show;
    }
  }
};
</script>

<style lang="scss" scoped></style>
