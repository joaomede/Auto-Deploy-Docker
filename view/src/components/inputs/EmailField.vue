<template>
  <ValidationProvider
    name="Email"
    rules="required|email"
    v-slot="{ errors, valid }"
  >
    <v-text-field
      v-model="model"
      :error-messages="errors"
      :success="valid"
      outlined
      rounded
      dense
      :label="label"
      required
    ></v-text-field>
  </ValidationProvider>
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
