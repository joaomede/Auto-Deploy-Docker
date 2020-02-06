<template>
  <div class="centralDiv">
    <v-container>
      <DialogAddNewDeploy :dialog="dialogDeploy" />
      <div class="my-2">
        <v-btn small color="primary" @click="addNewDeploy()"
          >Add New Deploy</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import DialogAddNewDeploy from "../components/dialogs/DialogAddNewDeploy";
export default {
  components: {
    DialogAddNewDeploy
  },
  data() {
    return {
      dialogDeploy: false
    };
  },
  methods: {
    addNewDeploy() {
      this.$axios.post({});
    }
  }
};
</script>

<style></style>
