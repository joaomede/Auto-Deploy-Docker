<template>
  <v-btn class="ma-2" icon dark small color="primary" @click="eventClick()">
    <v-icon dark>mdi-minus</v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    eventClick() {
      this.$emit("eventClick");
    }
  }
};
</script>

<style lang="scss" scoped></style>
