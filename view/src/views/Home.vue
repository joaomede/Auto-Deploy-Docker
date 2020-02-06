<template>
  <div class="centralDiv">
    <v-btn absolute dark fab bottom right color="blue" @click="addNewDeploy()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-container>
      <DialogAddNewDeploy
        :dialog="dialogDeploy"
        @eventClose="this.dialogDeploy = false"
      />
      <h2 class="text-center">All Deploys</h2>
      <v-card max-width="600" class="mx-auto">
        <v-list two-line subheader>
          <v-list-item
            v-for="item in listDeploys"
            :key="item.title"
            @click="teste()"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.nameProject"></v-list-item-title>
              <v-list-item-subtitle v-text="item.secret"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click.stop="testeTool()">
                <v-icon color="red lighten">fas fa-edit</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-action>
              <v-btn icon @click.stop="testeTool()">
                <v-icon color="red lighten">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
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
      dialogDeploy: false,
      listDeploys: [
        {
          nameProject: "System One",
          secret: "teste"
        },
        {
          nameProject: "System Two",
          secret: "teste"
        },
        {
          nameProject: "System Three",
          secret: "teste"
        }
      ]
    };
  },
  methods: {
    addNewDeploy() {},
    teste() {},
    testeTool() {}
  }
};
</script>

<style></style>
