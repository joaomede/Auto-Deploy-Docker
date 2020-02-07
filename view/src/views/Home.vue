<template>
  <div class="centralDiv">
    <v-btn absolute dark fab bottom right color="blue" @click="addNewDeploy()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <DialogAddNewDeploy
      :dialog="dialogAddNewDeploy"
      @eventClose="dialogAddNewDeploy = false"
    />
    <v-container>
      <h2 class="text-center">All Deploys</h2>
      <v-card max-width="600" class="mx-auto">
        <ListDeploys />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import ListDeploys from "../components/lists/ListDeploys";
import DialogAddNewDeploy from "../components/dialogs/DialogAddNewDeploy";
export default {
  components: {
    DialogAddNewDeploy,
    ListDeploys
  },
  data() {
    return {
      dialogAddNewDeploy: false,
      listDeploys: []
    };
  },
  created() {
    this.$store.dispatch("setDeployList");
  },
  methods: {
    toContainerView(id) {
      this.$router.push({ name: "Containers", params: { id: "" + id } });
    },
    addNewDeploy() {
      this.dialogAddNewDeploy = true;
    }
  }
};
</script>

<style></style>
