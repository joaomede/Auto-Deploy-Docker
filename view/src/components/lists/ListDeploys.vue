<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title v-text="deploy.nameProject"></v-list-item-title>
      <v-list-item-subtitle v-text="deploy.secret"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click.stop="name(deploy.nameProject)">
        <v-icon color="red lighten">fas fa-edit</v-icon>
      </v-btn>
    </v-list-item-action>

    <v-list-item-action>
      <v-btn icon @click.stop="name(deploy.nameProject)">
        <v-icon color="red lighten">mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    deploy: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      newDeploy: {
        nameProject: "",
        secret: ""
      }
    };
  },
  methods: {
    name(item) {
      console.log(item);
    }
  }
};
</script>

<style lang="scss" scoped></style>
