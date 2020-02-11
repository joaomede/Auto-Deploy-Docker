<template>
  <v-dialog v-model="dialogComponent" max-width="500">
    <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
      <v-card class="pa-2">
        <h2 class="text-center">Define a new container template</h2>

        <ValidationProvider
          name="Order"
          rules="required"
          v-slot="{ errors, valid }"
        >
          <v-text-field
            v-model="form.order"
            :error-messages="errors"
            :success="valid"
            type="number"
            outlined
            rounded
            dense
            label="Order to start"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          name="Name"
          rules="required"
          v-slot="{ errors, valid }"
        >
          <v-text-field
            v-model="form.config.name"
            :error-messages="errors"
            :success="valid"
            outlined
            rounded
            dense
            label="Container Name"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          name="Image Name"
          rules="required"
          v-slot="{ errors, valid }"
        >
          <v-text-field
            v-model="form.config.Image"
            :error-messages="errors"
            :success="valid"
            outlined
            rounded
            dense
            label="Image Name"
            required
          ></v-text-field>
        </ValidationProvider>

        <v-text-field
          v-model="form.config.WorkingDir"
          outlined
          rounded
          dense
          label="Work Dir."
        ></v-text-field>

        <v-text-field
          v-model="form.config.HostConfig.NetworkMode"
          outlined
          rounded
          dense
          label="Network Mode, ex.: network-app-xyz"
        ></v-text-field>

        <v-divider></v-divider>

        <v-checkbox
          v-model="form.config.AttachStdin"
          label="AttachStdin"
          color="blue"
        ></v-checkbox>

        <v-checkbox
          v-model="form.config.AttachStdout"
          label="AttachStdout"
          color="blue"
        ></v-checkbox>

        <v-checkbox
          v-model="form.config.AttachStderr"
          label="AttachStderr"
          color="blue"
        ></v-checkbox>

        <v-checkbox
          v-model="form.config.Tty"
          label="Tty"
          color="blue"
        ></v-checkbox>

        <v-checkbox
          v-model="form.config.StdinOnce"
          label="StdinOnce"
          color="blue"
        ></v-checkbox>

        <v-divider></v-divider>

        <div>
          <h2>Bind Volumes</h2>
          <PlusButton @eventClick="addMoreVolumes()" />
          <MinorButton @eventClick="removeVolumes()" />
          <div v-for="volume in volumes" :key="volume.index" class="ma-2">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="volume.host"
                  outlined
                  rounded
                  dense
                  label="Host, ex.: /home/documents/project"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="volume.container"
                  outlined
                  rounded
                  dense
                  label="Container, ex.: /home/document/src"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </div>
        <v-divider></v-divider>

        <div>
          <h2>Bind Ports</h2>
          <PlusButton @eventClick="addMorePortBind()" />
          <MinorButton @eventClick="removePortBind()" />
          <div v-for="port in bindPorts" :key="port.index" class="ma-2">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="port.external"
                  outlined
                  rounded
                  dense
                  label="External Port, ex.: '8000/tcp'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="port.internal"
                  outlined
                  rounded
                  dense
                  label="Internal Port, ex.: 80"
                ></v-text-field>
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
                <v-text-field
                  v-model="env.key"
                  outlined
                  rounded
                  dense
                  label="Key"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="env.value"
                  outlined
                  rounded
                  dense
                  label="Value"
                ></v-text-field>
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
            <v-text-field
              v-model="command.command"
              outlined
              rounded
              dense
              label="New Command"
            ></v-text-field>
          </div>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <BlackButton name="Back" @eventClick="eventClose()" />
          <GreenButtonValid
            :invalid="invalid"
            :validated="validated"
            :passes="passes"
            name="Save"
            @eventClick="updateContainer()"
          />
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script>
import MinorButton from "../button/MinorButton";
import PlusButton from "../button/PlusButton";
import BlackButton from "../button/BlackButton";
import GreenButtonValid from "../button/GreenButtonValid";

export default {
  components: {
    MinorButton,
    PlusButton,
    GreenButtonValid,
    BlackButton
  },
  props: {
    dialog: {
      type: Boolean
    },
    container: {
      type: Object
    }
  },
  data() {
    return {
      dialogComponent: false,
      form: {
        order: 1,
        config: {
          name: "",
          Image: "",
          AttachStdin: false,
          AttachStdout: false,
          AttachStderr: false,
          Tty: false,
          Cmd: [],
          Env: [],
          StdinOnce: false,
          WorkingDir: "",
          HostConfig: {}
        }
      },

      volumes: [],
      volume: [],

      envs: [],
      env: [],

      commands: [],
      command: [],

      bindPorts: [],
      bindPort: null,

      model: {}
    };
  },
  watch: {
    dialog: "update",
    dialogComponent: "close"
  },
  methods: {
    update() {
      this.dialogComponent = this.dialog;
      this.form = this.container;
      this.splitter();
      requestAnimationFrame(() => {
        this.$refs.obs.validate();
      });
    },
    close() {
      if (this.dialogComponent === false) {
        this.eventClose();
      }
    },
    splitter() {
      this.commands = [];
      this.envs = [];
      this.volumes = [];
      this.bindPort = [];

      this.form.config.Cmd.forEach(command => {
        this.commands.push({
          command: command
        });
      });

      this.form.config.Env.forEach(env => {
        const newEnv = env.split("=");
        this.envs.push({
          key: newEnv[0],
          value: newEnv[1]
        });
      });

      this.form.config.HostConfig.Binds.forEach(volume => {
        const newVolume = volume.split(":");
        this.volumes.push({
          host: newVolume[0],
          container: newVolume[1]
        });
      });

      // const newPortBind = this.form.config.HostConfig.PortBindings;
      console.log(this.form.config.HostConfig);

      // this.volumes.push({
      //   host: newVolume[0],
      //   container: newVolume[1]
      // });
    },
    eventClose() {
      this.$emit("eventClose");
      this.reset();
    },
    addMoreVolumes() {
      this.volumes.push({
        volume: {
          host: "",
          container: ""
        }
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
    addMorePortBind() {
      this.bindPorts.push({
        external: "",
        internal: ""
      });
    },
    removePortBind() {
      this.bindPorts.pop();
    },
    async updateContainer() {
      if (this.volumes.length > 0) {
        this.volume = [];
        this.volumes.forEach(volume => {
          this.volume.push(volume.host + ":" + volume.container);
        });
      }

      if (this.envs.length > 0) {
        this.env = [];
        this.envs.forEach(env => {
          this.env.push(env.key + "=" + env.value);
        });
      }

      if (this.commands.length > 0) {
        this.command = [];
        this.commands.forEach(command => {
          this.command.push(command.command);
        });
      }

      if (this.bindPorts.length > 0) {
        this.bindPort = null;

        this.bindPorts.forEach(bindPort => {
          const { external, internal } = bindPort;
          (this.bindPort[external] = [{ HostPort: internal }]), this.bindPort;
        });
      }

      this.model.order = this.form.order;
      this.model.config = this.form.config;
      this.model.config.Cmd = this.command;
      this.model.config.Env = this.env;
      this.model.config.HostConfig = {};
      this.model.config.HostConfig.Binds = this.volume;
      this.model.config.HostConfig.PortBindings = this.bindPort;

      try {
        const result = await this.$axios.put(
          `/api/container/update/${this.container.id}`,
          this.model,
          {
            headers: this.user.headers
          }
        );
        this.notify(result.data.ok, "green");
        this.eventClose();
        this.$store.dispatch("updateContainer", result.data.container);
      } catch (error) {
        this.notify(error.message, "red");
      }
    },
    reset() {
      this.form = {
        order: 1,
        config: {
          name: "",
          Image: "",
          AttachStdin: false,
          AttachStdout: false,
          AttachStderr: false,
          Tty: false,
          Cmd: [],
          Env: [],
          StdinOnce: false,
          WorkingDir: "",
          HostConfig: {}
        }
      };
      this.model = {};
    }
  }
};
</script>

<style></style>
