export default {
  methods: {
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
    }
  }
};
