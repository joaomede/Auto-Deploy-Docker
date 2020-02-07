<template>
  <v-container>
    <v-card max-width="600" class="mx-auto">
      <v-list two-line subheader>
        <v-list-item
          v-for="container in cContainerList"
          :key="container.id"
          @click="showSettings(container.id)"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                v-text="container.config.name"
              ></v-list-item-title>
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
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
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
