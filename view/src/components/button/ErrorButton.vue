<template>
  <v-btn color="error" dark @click="eventClick()">
    {{ name }}
  </v-btn>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  },
  methods: {
    eventClick() {
      this.$emit("eventClick");
    }
  }
};
</script>

<style lang="scss" scoped></style>
