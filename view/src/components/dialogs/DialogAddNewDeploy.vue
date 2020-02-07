<template>
  <v-dialog v-model="dialogComponent" max-width="500">
    <v-card class="md-2">
      <v-card-title class="headline">Create New Project Deploy</v-card-title>
      <div class="mx-2">
        <v-text-field
          v-model="form.nameProject"
          label="Set a Project Name"
          outlined
          dense
          required
        ></v-text-field>

        <v-text-field
          v-model="form.secret"
          label="Set a Secret"
          outlined
          dense
          required
        ></v-text-field>

        <v-checkbox
          v-model="form.local"
          label="Local Docker?"
          color="blue"
          value="blue"
        ></v-checkbox>

        <v-text-field
          v-if="!form.local"
          v-model="form.host"
          label="Set host for remote docker API, ex.: http://1.1.1.1"
          outlined
          dense
          required
        ></v-text-field>

        <v-text-field
          v-if="!form.local"
          v-model="form.port"
          label="Set a port for remote docker API. ex.: 5000"
          outlined
          dense
          required
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          label="Set a Email 'Notification'"
          outlined
          dense
          required
        ></v-text-field>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="black" dark @click="dialogComponent = false">
          Back
        </v-btn>
        <v-btn color="green" dark @click="createNewDeployProject()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean
    }
  },
  data() {
    return {
      dialogComponent: false,
      form: {
        local: false
      }
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
    async createNewDeployProject() {
      try {
        const result = await this.$axios.post("/api/deploy/create", this.form, {
          headers: this.user.headers
        });
        this.notify(result.data.ok, "green");
        this.eventClose();
        this.$store.dispatch("setNewDeploy", result.data.deploy);
      } catch (error) {
        this.notify(error.message, "red");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
