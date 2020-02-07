<template>
  <v-dialog v-model="newDialog" max-width="400">
    <v-card>
      <h2>Define a new container template</h2>

      <v-text-field
        v-model="form.order"
        label="Order to start"
        dense
        required
      ></v-text-field>

      <v-text-field
        v-model="form.baseConfig.name"
        label="Container Name"
        dense
        required
      ></v-text-field>

      <v-text-field
        v-model="form.baseConfig.Image"
        label="Image Name"
        dense
        required
      ></v-text-field>

      <v-checkbox
        v-model="form.baseConfig.AttachStdin"
        label="AttachStdin"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="form.baseConfig.AttachStdout"
        label="AttachStdout"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="form.baseConfig.AttachStderr"
        label="AttachStderr"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="form.baseConfig.Tty"
        label="Tty"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="form.baseConfig.StdinOnce"
        label="StdinOnce"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-text-field
        v-model="form.baseConfig.WorkingDir"
        label="Working Directory"
        dense
        required
      ></v-text-field>

      <div class="my-2">
        <h2>Bind Volumes</h2>
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
          @click="addMoreVolumes()"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>

        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
          @click="removeVolumes()"
        >
          <v-icon dark>mdi-minus</v-icon>
        </v-btn>
        <div v-for="volume in volumes" :key="volume.index">
          <v-text-field
            v-model="volume.volume"
            label="Set a new volume"
            dense
            required
          ></v-text-field>
        </div>

        <div>
          <h2>Environments</h2>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"
            @click="addMoreEnv()"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>

          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"
            @click="removeEnv()"
          >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
          <div v-for="env in envs" :key="env.index">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="env.env.key"
                  label="Set a key"
                  dense
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="env.env.value"
                  label="Set a value"
                  dense
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </div>

        <div>
          <h2>Commands</h2>
          <div v-for="command in commands" :key="command.index">
            <v-text-field
              v-model="command.command"
              label="Set a new volume"
              dense
              required
            ></v-text-field>
          </div>
          <div class="my-2">
            <v-btn small color="primary" @click="addMoreCommand()"
              >Add new Command</v-btn
            >
          </div>
        </div>
      </div>

      <div class="my-2">
        <v-btn small color="primary" @click="save()">Save</v-btn>
      </div>
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
      newDialog: false,
      form: {
        order: "",
        baseConfig: {
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
    save() {
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
      this.model.config = this.form.baseConfig;
      this.model.config.Cmd = this.command;
      this.model.config.Env = this.env;
      this.model.config.HostConfig = {};
      this.model.config.HostConfig.Binds = this.volume;

      this.$emit("save-container", this.model);
    }
  }
};
</script>

<style></style>
