<template>
  <v-text-field
    v-model="model"
    outlined
    rounded
    dense
    :label="label"
  ></v-text-field>
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
      model: ""
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
