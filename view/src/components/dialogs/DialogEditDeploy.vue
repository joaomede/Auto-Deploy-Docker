<template>
  <v-dialog v-model="dialogComponent" max-width="500">
    <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
      <v-card class="md-2">
        <v-card-title class="headline">Create New Project Deploy</v-card-title>
        <div class="mx-2">
          <ValidationProvider
            name="projectName"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="form.nameProject"
              :error-messages="errors"
              :success="valid"
              outlined
              rounded
              dense
              label="* Project Name"
              required
            ></v-text-field>
          </ValidationProvider>

          <ValidationProvider
            name="projectName"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="form.secret"
              :error-messages="errors"
              :success="valid"
              outlined
              rounded
              dense
              label="* Secret"
              required
            ></v-text-field>
          </ValidationProvider>

          <v-checkbox
            v-model="form.local"
            label="** Local Docker?"
            color="blue"
          ></v-checkbox>

          <ValidationProvider
            name="host"
            :rules="{ required }"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="form.host"
              :error-messages="errors"
              :success="valid"
              outlined
              rounded
              dense
              label="** Set host for remote docker API, ex.: http://1.1.1.1"
              required
            ></v-text-field>
          </ValidationProvider>

          <ValidationProvider
            name="port"
            :rules="{ required }"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="form.port"
              :error-messages="errors"
              :success="valid"
              type="number"
              outlined
              rounded
              dense
              label="** Set a port for remote docker API. ex.: 5000"
              required
            ></v-text-field>
          </ValidationProvider>

          <ValidationProvider
            name="Email"
            rules="required|email"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="form.email"
              :error-messages="errors"
              :success="valid"
              outlined
              rounded
              dense
              label="* Set a Email 'Notification'"
              required
            ></v-text-field>
          </ValidationProvider>
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
import GreenButtonValid from "../button/GreenButtonValid";
import BlackButton from "../button/BlackButton";

export default {
  components: {
    GreenButtonValid,
    BlackButton
  },
  props: {
    dialog: {
      type: Boolean
    },
    deploy: {
      type: Object
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
    dialogComponent: "close"
  },
  methods: {
    update() {
      this.dialogComponent = this.dialog;
      this.form = this.deploy;
      requestAnimationFrame(() => {
        this.$refs.obs.validate();
      });
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
        const result = await this.$axios.put(
          `/api/deploy/update/${this.form.id}`,
          this.form,
          {
            headers: this.user.headers
          }
        );
        this.notify(result.data.ok, "green");
        this.eventClose();
        this.$store.dispatch("setDeployList");
      } catch (error) {
        this.notify(error.response.data.error, "red");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
