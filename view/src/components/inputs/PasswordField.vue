<template>
  <v-text-field
    v-model="model"
    :rules="[rules.required, rules.min]"
    outlined
    rounded
    dense
    label="Your Password"
    type="Password"
  />
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
      model: "",
      rules: {
        min: v => v.length >= 8 || "Min 8 characters",
        required: value => !!value || "Required."
      }
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
