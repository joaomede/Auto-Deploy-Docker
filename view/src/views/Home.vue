<template>
  <div class="centralDiv">
    <v-btn absolute dark fab bottom right color="blue" @click="addNewDeploy()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <DialogAddNewDeploy
      :dialog="dialogAddNewDeploy"
      @createdNew="listAllDeploys()"
      @eventClose="dialogAddNewDeploy = false"
    />
    <v-container>
      <h2 class="text-center">All Deploys</h2>
      <v-card max-width="600" class="mx-auto">
        <v-list two-line subheader>
          <v-list-item
            v-for="deploy in listDeploys"
            :key="deploy.id"
            @click="toContainerView(deploy.id)"
          >
            <ListDeploys :deploy="deploy" />
          </v-list-item>
        </v-list>
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
    this.listAllDeploys();
  },
  methods: {
    toContainerView(id) {
      this.$router.push({ name: "Containers", params: { id: "" + id } });
    },
    async listAllDeploys() {
      try {
        const result = await this.$axios.get("/api/deploy/getall", {
          headers: this.user.headers
        });
        this.listDeploys = result.data;
      } catch (error) {
        this.notify(error.response.data.error, "red");
      }
    },
    addNewDeploy() {
      this.dialogAddNewDeploy = true;
    },
    teste() {},
    testeTool() {}
  }
};
</script>

<style></style>
