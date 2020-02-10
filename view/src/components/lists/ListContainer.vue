<template>
  <v-container>
    <DialogDelete
      :dialog="dialogDelete"
      :item="container"
      title="Do you really delete this container?"
      @removeItem="deleteContainer()"
      @eventClose="dialogDelete = false"
    />

    <DialogEditContainer
      :container="container"
      :dialog="dialogEditContainer"
      @eventClose="dialogEditContainer = false"
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
                v-text="`Order: ${container.order}`"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click.stop="showEditContainer(container, index)">
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
import DialogEditContainer from "../dialogs/DialogEditContainer";

export default {
  components: {
    DialogDelete,
    DialogEditContainer
  },
  data() {
    return {
      dialogDelete: false,
      dialogEditContainer: false,
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
        this.$store.dispatch("removeContainer");
      } catch (error) {
        this.notify(error.message, "red");
      }
    },
    showDeleteDeploy(container, index) {
      this.dialogDelete = true;
      this.$store.dispatch("setIndexContainer", index);
      this.container = container;
    },
    showEditContainer(container, index) {
      this.dialogEditContainer = true;
      this.$store.dispatch("setIndexContainer", index);
      this.container = Object.assign({}, this.container, container);
      this.container.config = Object.assign(
        {},
        this.container.config,
        container.config
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
