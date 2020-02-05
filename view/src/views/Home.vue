<template>
  <div>
    <div style="margin-left: 20px; max-width: 500px">
      <h2>Define a new container template</h2>

      <v-text-field
        v-model="baseConfig.nome"
        label="Container Name"
        dense
        required
      ></v-text-field>

      <v-text-field
        v-model="baseConfig.Image"
        label="Image Name"
        dense
        required
      ></v-text-field>

      <v-checkbox
        v-model="baseConfig.AttachStdin"
        label="AttachStdin"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="baseConfig.AttachStdout"
        label="AttachStdout"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="baseConfig.AttachStderr"
        label="AttachStderr"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="baseConfig.Tty"
        label="Tty"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="baseConfig.StdinOnce"
        label="StdinOnce"
        color="blue"
        value="blue"
        hide-details
      ></v-checkbox>

      <v-text-field
        v-model="baseConfig.WorkingDir"
        label="Working Directory"
        dense
        required
      ></v-text-field>

      <h2>Bind Volumes</h2>
      <div v-for="volume in volumes" :key="volume.index">
        <v-text-field
          v-model="volume.volume"
          label="Set a new volume"
          dense
          required
        ></v-text-field>
      </div>
      <div class="my-2">
        <v-btn small color="primary" @click="addMoreVolumes()"
          >Add new volume</v-btn
        >
      </div>
    </div>

    <div>
      <h2>Environments</h2>
      <div v-for="env in envs" :key="env.index">
        <v-text-field
          v-model="env.env"
          label="Set a new volume"
          dense
          required
        ></v-text-field>
      </div>
      <div class="my-2">
        <v-btn small color="primary" @click="addMoreEnv()">Add new env</v-btn>
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

    <div class="my-2">
      <v-btn small color="primary" @click="save()">Save</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    baseConfig: {
      nome: "",
      Image: "",
      AttachStdin: false,
      AttachStdout: false,
      AttachStderr: false,
      Tty: false,
      StdinOnce: false,
      WorkingDir: ""
    },
    volumes: [],
    envs: [],
    commands: [],
    model: {},
    hostModel: {},
    volume: [],
    env: [],
    command: []
  }),
  methods: {
    addMoreVolumes() {
      this.volumes.push({
        volume: ""
      });
    },
    addMoreEnv() {
      this.envs.push({
        env: ""
      });
    },
    addMoreCommand() {
      this.commands.push({
        command: ""
      });
    },
    save() {
      this.volumes.forEach(volume => {
        this.volume.push(volume.volume);
      });

      this.envs.forEach(env => {
        this.env.push(env.env);
      });

      this.commands.forEach(command => {
        this.command.push(command.command);
      });

      this.model.Cmd = this.command;
      this.model.Env = this.env;
      this.model.HostConfig = {};
      this.model.HostConfig.Binds = this.volume;

      console.log(this.model);
    }
  }
};
</script>

<style></style>
