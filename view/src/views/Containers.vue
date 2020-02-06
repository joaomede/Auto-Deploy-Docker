<template>
  <div class="centralDiv">
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      color="blue"
      @click="addNewContainer()"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-container>
      <DialogAddNewContainer
        :dialog="dialogContainer"
        @eventClose="dialogContainer = false"
      />
      <h2 class="text-center">All Containers</h2>
      <v-card max-width="600" class="mx-auto">
        <v-list two-line subheader>
          <v-list-item
            v-for="container in listContainers"
            :key="container.id"
            @click="showSettings(container.id)"
          >
            <ListContainer :container="container" />
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import ListContainer from "../components/lists/ListContainer";
//import DialogAddNewContainer from "../components/dialogs/DialogAddNewContainer";
export default {
  components: {
    ListContainer
    //DialogAddNewContainer
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      dialogContainer: "",
      listContainers: [
        {
          id: 1,
          order: 1,
          config: {
            name: "Teste 1"
          }
        },
        {
          id: 2,
          order: 2,
          config: {
            name: "Teste 2"
          }
        },
        {
          id: 3,
          order: 3,
          config: {
            name: "Teste 3"
          }
        }
      ]
    };
  },
  created() {},
  methods: {
    showSettings(id) {
      console.log(id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
