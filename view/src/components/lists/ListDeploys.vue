<template>
  <v-list two-line subheader>
    <DialogDelete
      :dialog="dialogDelete"
      :item="deploy"
      title="Do you really delete this item?"
      @removeItem="deleteDeploy()"
      @eventClose="dialogDelete = false"
    />
    <DialogEditDeploy
      :deploy="deploy"
      :dialog="dialogEditDeploy"
      @eventClose="dialogEditDeploy = false"
    />

    <ShowDeployOptions
      :deploy="deploy"
      :dialog="dialogShowDeployOptions"
      @eventClose="dialogShowDeployOptions = false"
    />

    <v-list-item
      v-for="(deploy, index) in cDeployList"
      :key="deploy.id"
      @click="showDeployOptions(deploy)"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title v-text="deploy.nameProject"></v-list-item-title>
          <v-list-item-subtitle v-text="deploy.secret"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click.stop="showEditDeploy(deploy, index)">
            <v-icon color="red lighten">fas fa-edit</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-action>
          <v-btn icon @click.stop="showDeleteDeploy(deploy, index)">
            <v-icon color="red lighten">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list-item>
  </v-list>
</template>

<script>
import DialogDelete from "../dialogs/DialogDelete";
import DialogEditDeploy from "../dialogs/DialogEditDeploy";
import ShowDeployOptions from "../dialogs/ShowDeployOptions";
export default {
  components: {
    DialogDelete,
    DialogEditDeploy,
    ShowDeployOptions
  },
  data() {
    return {
      dialogDelete: false,
      dialogEditDeploy: false,
      dialogShowDeployOptions: false,
      newDeploy: {
        nameProject: "",
        secret: ""
      },
      index: "",
      deploy: {}
    };
  },
  methods: {
    async deleteDeploy() {
      try {
        const result = await this.$axios.delete(
          `/api/deploy/delete/${this.deploy.id}`,
          { headers: this.user.headers }
        );
        this.notify(result.data.ok, "green");
        this.$store.dispatch("removeDeploy");
      } catch (error) {
        this.notify(error.message, "red");
      }
    },
    toContainerView(id) {
      this.$router.push({ name: "Containers", params: { id: "" + id } });
    },
    showDeleteDeploy(deploy, index) {
      this.dialogDelete = true;
      this.$store.dispatch("setIndexDeploy", index);
      this.deploy = deploy;
    },
    showDeployOptions(deploy) {
      this.dialogShowDeployOptions = true;
      this.deploy = deploy;
    },
    showEditDeploy(deploy, index) {
      this.dialogEditDeploy = true;
      this.$store.dispatch("setIndexDeploy", index);
      this.deploy = Object.assign({}, this.deploy, deploy);
    }
  }
};
</script>

<style lang="scss" scoped></style>
