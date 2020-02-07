<template>
  <v-container>
    <DialogDelete
      :dialog="dialogDelete"
      :item="container"
      title="Do you really delete this container?"
      @removeItem="deleteContainer()"
      @eventClose="dialogDelete = false"
    />
    <v-card max-width="600" class="mx-auto">
      <v-list two-line subheader>
        <v-list-item
          v-for="(container, index) in cContainerList"
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
              <v-btn icon @click.stop="showDeleteDeploy(container, index)">
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
import DialogDelete from "../dialogs/DialogDelete";

export default {
  components: {
    DialogDelete
  },
  data() {
    return {
      dialogDelete: false,
      container: {}
    };
  },
  methods: {
    async deleteContainer() {
      try {
        const result = await this.$axios.delete(
          `/api/container/delete/${this.container.id}`,
          { headers: this.user.headers }
        );
        this.notify(result.data.ok, "green");
        this.$store.dispatch("removeContainer", this.index);
      } catch (error) {
        this.notify(error.message, "red");
      }
    },
    showDeleteDeploy(container, index) {
      this.dialogDelete = true;
      this.index = index;
      this.container = container;
    }
  }
};
</script>

<style lang="scss" scoped></style>
