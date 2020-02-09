<template>
  <v-btn
    color="success"
    @click="passes(eventClick)"
    :disabled="invalid || !validated"
    >{{ name }}</v-btn
  >
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    invalid: {
      type: Boolean
    },
    validated: {
      type: Boolean
    },
    passes: {
      type: Function
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
