<template>
  <div class="centralDiv">
    <DialogAddNewContainer
      :dialog="dialogContainer"
      :id="id"
      @eventClose="dialogContainer = false"
    />
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      color="blue"
      @click="dialogContainer = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <h2 class="text-center">All Containers</h2>
    <ListContainer />
  </div>
</template>

<script>
import ListContainer from "../components/lists/ListContainer";
import DialogAddNewContainer from "../components/dialogs/DialogAddNewContainer";
export default {
  components: {
    ListContainer,
    DialogAddNewContainer
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      dialogContainer: false
    };
  },
  created() {
    this.$store.dispatch("setContainerList", this.id);
  }
};
</script>

<style lang="scss" scoped></style>
