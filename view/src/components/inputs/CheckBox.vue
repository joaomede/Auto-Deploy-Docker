<template>
  <v-checkbox v-model="model" :label="label" color="blue"></v-checkbox>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    }
  },
  data() {
    return {
      model: false
    };
  },
  watch: {
    model(value) {
      this.$emit("model", value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
