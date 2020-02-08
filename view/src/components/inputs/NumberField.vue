<template>
  <v-text-field
    v-model="model"
    :label="label"
    type="number"
    dense
    outlined
    rounded
    required
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
      model: 1
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
