<template>
  <v-dialog v-model="dialogComponent" max-width="500">
    <v-card class="md-2">
      <v-card-title class="headline">Create New Project Deploy</v-card-title>
      <div class="mx-2">
        <TextField label="* Project Name" @model="form.nameProject = $event" />
        <TextField label="* Secret" @model="form.secret = $event" />
        <Checkbox label="** Local Docker?" @model="form.local = $event" />
        <TextField
          v-if="!form.local"
          label="** Set host for remote docker API, ex.: http://1.1.1.1"
          @model="form.host = $event"
        />
        <NumberField
          v-if="!form.local"
          label="** Set a port for remote docker API. ex.: 5000"
          @model="form.port = $event"
        />
        <EmailField
          label="* Set a Email 'Notification'"
          @model="form.email = $event"
        />
      </div>
      <h4>* Fields Required</h4>
      <h4>** If "local" is disabled, subsequent fields are required</h4>

      <v-card-actions>
        <v-spacer></v-spacer>
        <BlackButton name="Back" @eventClick="eventClose()" />
        <GreenButton name="Save" @eventClick="checkFields()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TextField from "../inputs/TextField";
import NumberField from "../inputs/NumberField";
import Checkbox from "../inputs/CheckBox";
import EmailField from "../inputs/EmailField";
import GreenButton from "../button/GreenButton";
import BlackButton from "../button/BlackButton";

export default {
  components: {
    TextField,
    NumberField,
    Checkbox,
    EmailField,
    GreenButton,
    BlackButton
  },
  props: {
    dialog: {
      type: Boolean
    }
  },
  data() {
    return {
      dialogComponent: false,
      form: {
        nameProject: "",
        secret: "",
        local: false,
        host: "",
        port: 8080,
        email: ""
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
    checkFields() {
      if (!this.form.nameProject) {
        this.notify("Field Name Project is Required", "red");
        return;
      }

      if (!this.form.secret) {
        this.notify("Field Secret is Required", "red");
        return;
      }

      if (!this.form.local) {
        if (!this.form.host) {
          this.notify("Field Host is Required", "red");
          return;
        }
        if (!this.form.port) {
          this.notify("Field Port is Required", "red");
          return;
        }
      }

      if (!this.form.email) {
        this.notify("Field Email is Required", "red");
        return;
      }

      this.createNewDeployProject();
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
        this.notify(error.response.data.error, "red");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
