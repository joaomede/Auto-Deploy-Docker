<template>
  <form-schema :schema="schema" v-model="model" @submit="submit">
    <button type="submit">Subscribe</button>
  </form-schema>
</template>

<script>
import FormSchema from "vue-json-schema";

FormSchema.setComponent("form", "el-form", ({ vm }) => {
  // vm is the FormSchema VM
  const labelWidth = "120px";
  const model = vm.data;
  const rules = {};
  vm.fields.forEach(field => {
    const type =
      field.schemaType === "array" && field.type === "radio"
        ? "string"
        : field.schemaType;
    const required = field.required;
    const message = field.title;
    const trigger = ["radio", "checkbox", "select"].includes(field.type)
      ? "change"
      : "blur";
    // http://element.eleme.io/#/en-US/component/form#validation
    rules[field.name] = { type, required, message, trigger };
  });
  // returning the form props
  return { labelWidth, rules, model };
});
// http://element.eleme.io/#/en-US/component/form#validation
FormSchema.setComponent("label", "el-form-item", ({ field }) => ({
  prop: field.name
}));
FormSchema.setComponent("email", "el-input");
FormSchema.setComponent("text", "el-input");
FormSchema.setComponent("textarea", "el-input");
FormSchema.setComponent("checkbox", "el-checkbox");
FormSchema.setComponent("switch", "el-switch");
FormSchema.setComponent("radio", "el-radio");
FormSchema.setComponent("select", "el-select");
// You can also use the component object
FormSchema.setComponent("option", Option);
// By default `<h1/>` is used to render the form title.
// To override this, use the `title` type:
FormSchema.setComponent("title", "h2");
// By default `<p/>` is used to render the form title.
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
    schema: {
      $schema: "http://json-schema.org/draft-04/schema#",
      type: "object",
      title: "Newsletter Subscription",
      description:
        "Sign up for free newsletters and get more delivered to your inbox",
      properties: {
        name: {
          type: "string",
          minLength: 8,
          maxLength: 80,
          title: "Full Name",
          attrs: {
            placeholder: "Your Full Name",
            title: "Please enter your full name"
          }
        },
        email: {
          type: "string",
          maxLength: 120,
          title: "Email",
          attrs: {
            type: "email",
            placeholder: "Your Email",
            title: "Please enter your email"
          }
        },
        source: {
          type: "string",
          maxLength: 120,
          title: "Source",
          description: "Ex. Using the NPM Search Engine",
          attrs: {
            type: "textarea",
            placeholder: "How did you hear about us?"
          }
        },
        agree: {
          type: "boolean",
          title: "Agree",
          description:
            "You agree to receive occasional updates and special offers for vue-json-schema updates.",
          default: false,
          attrs: {
            type: "checkbox"
          }
        }
      },
      additionalProperties: false
      //required: ["name", "email", "lists"]
    },
    model: {}
  }),
  methods: {
    submit() {
      // this.model contains the valid data according your JSON Schema.
      // You can submit your model to the server here
    }
  },
  components: { FormSchema }
};
</script>
