<template>
  <v-dialog v-model="dialogComponent" max-width="500">
    <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
      <v-card class="md-2">
        <v-card-title class="headline">Create New Project Deploy</v-card-title>
        <div class="mx-2">
          <TextField
            label="* Project Name"
            rules="required"
            @model="form.nameProject = $event"
          />
          <TextField
            rules="required"
            label="* Secret"
            @model="form.secret = $event"
          />
          <Checkbox label="** Local Docker?" @model="form.local = $event" />
          <TextFieldRequired
            v-if="!form.local"
            :rules="{ required }"
            label="** Set host for remote docker API, ex.: http://1.1.1.1"
            @model="form.host = $event"
          />
          <NumberFieldRequired
            v-if="!form.local"
            :rules="{ required }"
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
          <GreenButtonValid
            :invalid="invalid"
            :validated="validated"
            :passes="passes"
            name="Save"
            @eventClick="createNewDeployProject()"
          />
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script>
import TextField from "../inputs/TextField";
import TextFieldRequired from "../inputs/TextFieldRequired";
import NumberFieldRequired from "../inputs/NumberFieldRequired";

import Checkbox from "../inputs/CheckBox";
import EmailField from "../inputs/EmailField";
import GreenButtonValid from "../button/GreenButtonValid";
import BlackButton from "../button/BlackButton";

export default {
  components: {
    TextField,
    TextFieldRequired,
    NumberFieldRequired,
    Checkbox,
    EmailField,
    GreenButtonValid,
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
      },
      required: false
    };
  },
  watch: {
    dialog: "update",
    dialogComponent: "close",
    form: {
      handler(value) {
        if (value.local === true) {
          this.required = false;
        } else {
          this.required = true;
        }
      },
      deep: true
    }
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
        this.notify(error.response.data.error, "red");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
