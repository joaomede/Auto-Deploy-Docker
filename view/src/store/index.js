import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { http } from "../plugins/axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    containerList: [],
    deployList: []
  },
  getters: {
    getUser: state => state.user,
    getDeployList: state => state.deployList,
    getContainerList: state => state.containerList
  },
  mutations: {
    setUser(state) {
      const user = window.$cookies.get("user");
      if (user !== null && user !== undefined) {
        state.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          headers: user.headers
        };
      } else {
        state.user = {
          id: null,
          name: "Usuário Deslogado",
          email: null,
          headers: { authorization: "semAutenticacao" }
        };
      }
    },
    setLogin(state, user) {
      const auth = {
        id: user.id,
        name: user.name,
        email: user.email,
        headers: { authorization: "Bearer " + user.token }
      };
      window.$cookies.set("user", auth);
      this.commit("setUser");
      router.replace("/home");
    },
    async setDeployList(state) {
      try {
        const result = await http.get("/api/deploy/getall", {
          headers: state.user.headers
        });
        state.deployList = result.data;
      } catch (error) {
        this.notify(error.response.data.error, "red");
      }
    },
    removeDeploy(state, index) {
      Vue.delete(state.deployList, index);
    },
    setNewDeploy(state, newDeploy) {
      if (state.deployList === undefined) {
        let index = 0;
        Vue.set(state.deployList, index, newDeploy);
      } else {
        let index = state.deployList.length;
        Vue.set(state.deployList, index, newDeploy);
      }
    }
  },
  actions: {
    setUser({ commit }) {
      commit("setUser");
    },
    setLogin({ commit }, user) {
      commit("setLogin", user);
    },
    setDeployList({ commit }) {
      commit("setDeployList");
    },
    removeDeploy({ commit }, index) {
      commit("removeDeploy", index);
    },
    setNewDeploy({ commit }, newDeploy) {
      commit("setNewDeploy", newDeploy);
    },
    setContainerList({ commit }, containerList) {
      commit("setContainerList", containerList);
    }
  },
  modules: {}
});
