<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title v-text="container.config.name"></v-list-item-title>
      <v-list-item-subtitle
        v-text="`Order: ${container.config.name}`"
      ></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click.stop="name(container.config.name)">
        <v-icon color="red lighten">fas fa-edit</v-icon>
      </v-btn>
    </v-list-item-action>

    <v-list-item-action>
      <v-btn icon @click.stop="name(container.config.name)">
        <v-icon color="red lighten">mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    container: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      newContainer: {
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
