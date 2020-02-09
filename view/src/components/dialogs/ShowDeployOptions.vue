<template>
  <v-dialog v-model="dialogComponent" max-width="500">
    <v-card class="md-2">
      <v-card-title class="headline">Deploy Options</v-card-title>
      <div class="mx-2">
        <h4>Name: {{ deploy.nameProject }}</h4>
        <h4>Secret: {{ deploy.secret }}</h4>
        <h4>Local: {{ deploy.local }}</h4>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <BlackButton name="Back" @eventClick="eventClose()" />
        <ErrorButton name="Deploy Manually" @eventClick="deployManually()" />
        <GreenButton name="Container List" @eventClick="toContainerList()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GreenButton from "../button/GreenButton";
import BlackButton from "../button/BlackButton";
import ErrorButton from "../button/ErrorButton";

export default {
  components: {
    GreenButton,
    BlackButton,
    ErrorButton
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
        this.eventClose();
      }
    },
    eventClose() {
      this.dialogComponent = false;
      this.$emit("eventClose");
    },
    toContainerList() {
      this.$router.push({
        name: "Containers",
        params: { id: "" + this.deploy.id }
      });
    },
    async deployManually() {
      this.notify("Start Deploy Manually", "green");

      try {
        const result = await this.$axios.post(
          `/api/deploy/webhook/${this.deploy.secret}`,
          {},
          {
            headers: this.user.headers
          }
        );
        this.notify(result.data.ok, "green");
      } catch (error) {
        this.notify(error.response.data.error, "red");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
