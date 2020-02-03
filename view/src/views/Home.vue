<template>
  <div>
    <div class="divteste">
      <form-schema :schema="baseSchema" v-model="model" @submit="update()">
        <div class="my-2"></div>
      </form-schema>
    </div>

    <div>
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
import FormSchema from "vue-json-schema";
import {
  Form,
  FormItem,
  Input,
  Radio,
  Checkbox,
  Select,
  Option,
  Button
} from "element-ui";
FormSchema.setComponent("label", FormItem);
FormSchema.setComponent("email", Input);
FormSchema.setComponent("text", Input);
FormSchema.setComponent("textarea", Input);
FormSchema.setComponent("checkbox", Checkbox);
FormSchema.setComponent("radio", Radio);
FormSchema.setComponent("select", Select);
FormSchema.setComponent("option", Option);

// Use the third argument to define props of the component
FormSchema.setComponent("button", Button, {
  type: "primary",
  label: "Subscribe"
});

// The third argument can also be a function that return an object
FormSchema.setComponent("form", Form, ({ vm }) => {
  // vm is the FormSchema VM

  const labelWidth = "120px";
  const model = vm.data;
  const rules = {};

  vm.fields.forEach(field => {
    rules[field.name] = {
      required: field.required,
      message: field.title
    };
  });

  // returning the form props
  return { labelWidth, rules, model };
});

// By default `<h1/>` is used to render the form title.
// To override this, use the `title` type:
FormSchema.setComponent("title", "h2");

// By default `<p/>` is used to render the form description.
// To override this, use the `description` type:
FormSchema.setComponent("description", "small");

// By default `<div/>` is used to render the message error.
// To override this, use the `error` type:
FormSchema.setComponent("error", "el-alert", ({ vm }) => ({
  type: "error",
  title: vm.error
}));

export default {
  data: () => ({
    baseSchema: {
      $schema: "http://json-schema.org/draft-04/schema#",
      type: "object",
      title: "Define a new container",
      description: "Define a new container template",
      properties: {
        name: {
          type: "string",
          minLength: 8,
          maxLength: 80,
          title: "Container name",
          attrs: {
            placeholder: "Your Full Name",
            title: "Please enter your full name"
          }
        },
        Image: {
          type: "string",
          minLength: 8,
          maxLength: 80,
          title: "Image Name"
        },
        WorkingDir: {
          type: "string",
          minLength: 8,
          maxLength: 80,
          title: "Working Dir"
        },
        AttachStdin: {
          type: "boolean",
          title: "AttachStdin",
          default: false,
          attrs: {
            type: "checkbox"
          }
        },
        AttachStdout: {
          type: "boolean",
          title: "AttachStdout",
          default: false,
          attrs: {
            type: "checkbox"
          }
        },
        AttachStderr: {
          type: "boolean",
          title: "AttachStderr",
          default: false,
          attrs: {
            type: "checkbox"
          }
        },
        Tty: {
          type: "boolean",
          title: "Tty",
          default: false,
          attrs: {
            type: "checkbox"
          }
        },
        OpenStdin: {
          type: "boolean",
          title: "OpenStdin",
          default: false,
          attrs: {
            type: "checkbox"
          }
        },
        StdinOnce: {
          type: "boolean",
          title: "StdinOnce",
          default: false,
          attrs: {
            type: "checkbox"
          }
        }
      },
      additionalProperties: false
      //required: ["name", "email", "lists"]
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
  },
  components: { FormSchema }
};
</script>

<style>
.form {
  text-align: left;
  width: 600px;
  margin: auto;
}
h2 {
  font-size: 1.7em;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0.2em;
}
h2 + small {
  display: block;
  text-align: center;
  margin-bottom: 1.2em;
}
small {
  line-height: 20px;
  display: block;
}
.el-alert {
  margin-bottom: 15px;
}

.el-form-item {
  margin-bottom: 4px !important;
}
</style>
