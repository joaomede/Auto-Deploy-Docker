<template>
  <ValidationProvider :name="label" :rules="rules" v-slot="{ errors, valid }">
    <v-text-field
      v-model="model"
      :error-messages="errors"
      :success="valid"
      type="number"
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
    form: {
      type: Object
    },
    label: {
      type: String
    },
    rules: {
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
    },
    form: {
      handler(value) {
        if (value.order === 1) {
          this.model = 1;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
