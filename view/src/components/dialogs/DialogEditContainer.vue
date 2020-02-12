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
          <h2>Exposed Ports</h2>
          <PlusButton @eventClick="addMorePortExposed()" />
          <MinorButton @eventClick="removePortExposed()" />
          <div
            v-for="exposed in exposedPorts"
            :key="exposed.index"
            class="ma-2"
          >
            <v-text-field
              v-model="exposed.port"
              outlined
              rounded
              dense
              label="Exposed Port. ex.: 22/tcp"
            ></v-text-field>
          </div>
        </div>
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
                  label="External Port, ex.: '8000'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="port.internal"
                  outlined
                  rounded
                  dense
                  label="Internal Port, ex.: 80/tcp"
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
import utilsNewContainer from "../../mixins/utilsNewContainer";

export default {
  components: {
    MinorButton,
    PlusButton,
    GreenButtonValid,
    BlackButton
  },
  mixins: [utilsNewContainer],
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
      envs: [],
      commands: [],
      bindPorts: [],
      exposedPorts: []
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
      this.bindPorts = [];
      this.exposedPorts = [];

      this.form.config.Cmd.forEach(command => {
        this.commands.push({
          command: command
        });
      });

      if (this.form.config.ExposedPorts !== undefined) {
        const entriesExposedPort = Object.entries(
          this.form.config.ExposedPorts
        );
        entriesExposedPort.forEach(entries => {
          const port = entries[0];
          this.exposedPorts.push({
            port: port
          });
        });
      }

      this.form.config.Env.forEach(env => {
        const newEnv = env.split("=");
        this.envs.push({
          key: newEnv[0],
          value: newEnv[1]
        });
      });

      if (this.form.config.HostConfig.Binds !== undefined) {
        this.form.config.HostConfig.Binds.forEach(volume => {
          const newVolume = volume.split(":");
          this.volumes.push({
            host: newVolume[0],
            container: newVolume[1]
          });
        });
      }

      if (this.form.config.HostConfig.PortBindings !== undefined) {
        const entriesPortBind = Object.entries(
          this.form.config.HostConfig.PortBindings
        );
        entriesPortBind.forEach(entries => {
          const external = entries[1][0].HostPort;
          const internal = entries[0];
          this.bindPorts.push({
            external: external,
            internal: internal
          });
        });
      }
    },
    eventClose() {
      this.$emit("eventClose");
      this.reset();
    },
    async newForm() {
      return new Promise(resolve => {
        let form = {};
        let volume = [];
        let command = [];
        let env = [];
        let bindPort = {};
        let exposedPort = {};

        form.order = this.form.order;
        form.config = this.form.config;

        if (this.envs.length > 0) {
          this.env = [];
          this.envs.forEach(environment => {
            env.push(environment.key + "=" + environment.value);
          });
          form.config.Env = env;
        }

        if (this.commands.length > 0) {
          this.commands.forEach(cmd => {
            command.push(cmd.command);
          });
          form.config.Cmd = command;
        }

        if (this.exposedPorts.length > 0) {
          this.exposedPorts.forEach(port => {
            (exposedPort[port.port] = {}), exposedPort;
          });
          form.config.ExposedPorts = exposedPort;
        }

        if (this.volumes.length > 0) {
          this.volumes.forEach(vol => {
            volume.push(vol.host + ":" + vol.container);
          });
          form.config.HostConfig.Binds = volume;
        }

        if (this.bindPorts.length > 0) {
          this.bindPorts.forEach(bP => {
            const { external, internal } = bP;
            (bindPort[internal] = [{ HostPort: external }]), bindPort;
          });
          form.config.HostConfig.PortBindings = bindPort;
        }
        resolve(form);
      });
    },
    async updateContainer() {
      try {
        const form = await this.newForm();
        const result = await this.$axios.put(
          `/api/container/update/${this.container.id}`,
          form,
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
    }
  }
};
</script>

<style></style>
