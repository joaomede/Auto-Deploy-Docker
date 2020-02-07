<template>
  <v-dialog v-model="newDialog" max-width="500">
    <v-card class="pa-2">
      <h2 class="text-center">Define a new container template</h2>

      <v-text-field
        v-model="form.order"
        label="Order to start"
        dense
        outlined
        required
      ></v-text-field>

      <v-text-field
        v-model="form.config.name"
        label="Container Name"
        dense
        outlined
        required
      ></v-text-field>

      <v-text-field
        v-model="form.config.Image"
        label="Image Name"
        dense
        outlined
        required
      ></v-text-field>

      <v-text-field
        v-model="form.config.WorkingDir"
        label="Working Directory"
        dense
        outlined
        required
      ></v-text-field>
      <v-divider></v-divider>

      <v-checkbox
        v-model="form.config.AttachStdin"
        label="AttachStdin"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="form.config.AttachStdout"
        label="AttachStdout"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="form.config.AttachStderr"
        label="AttachStderr"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="form.config.Tty"
        label="Tty"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="form.config.StdinOnce"
        label="StdinOnce"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>
      <v-divider></v-divider>

      <div>
        <h2>Bind Volumes</h2>
        <v-btn
          class="ma-2"
          icon
          dark
          small
          color="primary"
          @click="addMoreVolumes()"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          icon
          dark
          small
          color="primary"
          @click="removeVolumes()"
        >
          <v-icon dark>mdi-minus</v-icon>
        </v-btn>
        <div v-for="volume in volumes" :key="volume.index" class="ma-2">
          <v-text-field
            v-model="volume.volume"
            label="Set a new volume"
            dense
            outlined
            required
          ></v-text-field>
        </div>
      </div>
      <v-divider></v-divider>

      <div>
        <h2>Environments</h2>
        <v-btn
          class="ma-2"
          icon
          dark
          small
          color="primary"
          @click="addMoreEnv()"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          icon
          dark
          small
          color="primary"
          @click="removeEnv()"
        >
          <v-icon dark>mdi-minus</v-icon>
        </v-btn>
        <div v-for="env in envs" :key="env.index" class="ma-2">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="env.env.key"
                label="Set a key"
                dense
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="env.env.value"
                label="Set a value"
                dense
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </div>
      <v-divider></v-divider>

      <div>
        <h2>Commands</h2>
        <v-btn
          class="ma-2"
          icon
          dark
          small
          color="primary"
          @click="addMoreCommand()"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          icon
          dark
          small
          color="primary"
          @click="removeCommand()"
        >
          <v-icon dark>mdi-minus</v-icon>
        </v-btn>
        <div v-for="command in commands" :key="command.index" class="ma-2">
          <v-text-field
            v-model="command.command"
            label="Set a new volume"
            dense
            outlined
            required
          ></v-text-field>
        </div>
      </div>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="black" dark @click="eventClose()">
          Back
        </v-btn>
        <v-btn color="primary" dark @click="addNewContainer()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      newDialog: false,
      form: {
        order: "",
        config: {
          name: "",
          Image: "",
          AttachStdin: false,
          AttachStdout: false,
          AttachStderr: false,
          Tty: false,
          StdinOnce: false,
          WorkingDir: ""
        }
      },

      volumes: [],
      envs: [],
      commands: [],
      model: {},
      volume: [],
      env: [],
      command: []
    };
  },
  watch: {
    dialog: "update",
    newDialog: "close"
  },
  methods: {
    update() {
      this.newDialog = this.dialog;
    },
    close() {
      if (this.newDialog === false) {
        this.$emit("eventClose");
      }
    },
    eventClose() {
      this.newDialog = false;
      this.$emit("eventClose");
    },
    addMoreVolumes() {
      this.volumes.push({
        volume: ""
      });
    },
    removeVolumes() {
      this.volumes.pop();
    },
    addMoreEnv() {
      this.envs.push({
        env: {
          key: "",
          value: ""
        }
      });
    },
    removeEnv() {
      this.envs.pop();
    },
    addMoreCommand() {
      this.commands.push({
        command: ""
      });
    },
    removeCommand() {
      this.commands.pop();
    },
    async addNewContainer() {
      if (this.volumes.length > 0) {
        this.volumes.forEach(volume => {
          this.volume.push(volume.volume);
        });
      }

      if (this.envs.length > 0) {
        this.envs.forEach(env => {
          this.env.push(env.env.key + "=" + env.env.value);
        });
      }

      if (this.commands.length > 0) {
        this.commands.forEach(command => {
          this.command.push(command.command);
        });
      }

      this.model.order = this.form.order;
      this.model.config = this.form.config;
      this.model.config.Cmd = this.command;
      this.model.config.Env = this.env;
      this.model.config.HostConfig = {};
      this.model.config.HostConfig.Binds = this.volume;

      try {
        const result = await this.$axios.post(
          `/api/container/create/${this.id}`,
          this.form,
          {
            headers: this.user.headers
          }
        );
        this.notify(result.data.ok, "green");
        this.eventClose();
        this.$store.dispatch("setContainerList", this.id);
        this.reset();
      } catch (error) {
        this.notify(error.message, "red");
      }
    },
    reset() {
      this.form = {
        order: "",
        config: {
          name: "",
          Image: "",
          AttachStdin: false,
          AttachStdout: false,
          AttachStderr: false,
          Tty: false,
          StdinOnce: false,
          WorkingDir: ""
        }
      };
    }
  }
};
</script>

<style></style>
