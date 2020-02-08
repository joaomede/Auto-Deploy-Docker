<template>
  <v-dialog v-model="newDialog" max-width="500">
    <v-card class="pa-2">
      <h2 class="text-center">Define a new container template</h2>

      <NumberField label="Order to start" @model="form.order = $event" />
      <TextField label="Container Name" @model="form.config.name = $event" />
      <TextField label="Image Name" @model="form.config.Image = $event" />
      <TextField label="Work Dir." @model="form.config.WorkingDir = $event" />
      <v-divider></v-divider>

      <CheckBox label="AttachStdin" @model="form.config.AttachStdin = $event" />
      <CheckBox
        label="AttachStdout"
        @model="form.config.AttachStdout = $event"
      />
      <CheckBox
        label="AttachStderr"
        @model="form.config.AttachStderr = $event"
      />
      <CheckBox label="Tty" @model="form.config.Tty = $event" />
      <CheckBox label="StdinOnce" @model="form.config.StdinOnce = $event" />
      <v-divider></v-divider>

      <div>
        <h2>Bind Volumes</h2>
        <PlusButton @eventClick="addMoreVolumes()" />
        <MinorButton @eventClick="removeVolumes()" />
        <div v-for="volume in volumes" :key="volume.index" class="ma-2">
          <v-row>
            <v-col cols="12" md="6">
              <TextField
                label="Host, ex.: /home/documents/project"
                @model="volume.volume.host = $event"
              />
            </v-col>
            <v-col cols="12" md="6">
              <TextField
                label="Container, ex.: /home/document/src"
                @model="volume.volume.container = $event"
              />
            </v-col>
          </v-row>
        </div>
      </div>
      <v-divider></v-divider>

      <div>
        <h2>Environments</h2>
        <PlusButton @eventClick="addMoreEnv()" />
        <MinorButton @eventClick="removeEnv()" />
        <div v-for="env in envs" :key="env.index" class="ma-2">
          <v-row>
            <v-col cols="12" md="6">
              <TextField label="Key" @model="env.env.key = $event" />
            </v-col>
            <v-col cols="12" md="6">
              <TextField label="Value" @model="env.env.value = $event" />
            </v-col>
          </v-row>
        </div>
      </div>
      <v-divider></v-divider>

      <div>
        <h2>Commands</h2>
        <PlusButton @eventClick="addMoreCommand()" />
        <MinorButton @eventClick="removeCommand()" />
        <div v-for="command in commands" :key="command.index" class="ma-2">
          <TextField label="New Command" @model="command.command = $event" />
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
import TextField from "../inputs/TextField";
import NumberField from "../inputs/NumberField";
import CheckBox from "../inputs/CheckBox";
import MinorButton from "../button/MinorButton";
import PlusButton from "../button/PlusButton";
export default {
  components: {
    TextField,
    NumberField,
    CheckBox,
    MinorButton,
    PlusButton
  },
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
          this.volume.push(volume.volume.container + ":" + volume.volume.host);
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
