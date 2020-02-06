<template>
  <div class="centralDiv">
    <v-btn absolute dark fab bottom right color="blue" @click="addNewDeploy()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-container>
      <DialogAddNewDeploy
        :dialog="dialogDeploy"
        @eventClose="dialogDeploy = false"
      />
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
      dialogDeploy: false,
      listDeploys: [
        {
          id: 1,
          nameProject: "System One",
          secret: "teste"
        },
        {
          id: 2,
          nameProject: "System Two",
          secret: "teste"
        },
        {
          id: 3,
          nameProject: "System Three",
          secret: "teste"
        }
      ]
    };
  },
  methods: {
    toContainerView(id) {
      this.$router.push({ name: "Containers", params: { id: "" + id } });
    },
    addNewDeploy() {},
    teste() {},
    testeTool() {}
  }
};
</script>

<style></style>
