<template>
  <div>
    <v-dialog v-model="dialogComponent" max-width="500">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="black" dark @click="dialogComponent = false">
            Back
          </v-btn>
          <v-btn color="green" dark @click="removeItem()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean
    },
    title: {
      type: String
    },
    item: {
      type: Object
    }
  },
  data() {
    return {
      dialogComponent: false,
      form: {}
    };
  },
  watch: {
    dialog: "update",
    dialogComponent: "close"
  },
  methods: {
    update() {
      this.dialogComponent = this.dialog;
    },
    close() {
      if (this.dialogComponent === false) {
        this.$emit("eventClose");
      }
    },
    eventClose() {
      this.dialogComponent = false;
      this.$emit("eventClose");
    },
    async removeItem() {
      this.eventClose();
      this.$emit("removeItem");
    }
  }
};
</script>

<style lang="scss" scoped></style>
