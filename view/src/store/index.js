import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    urlApi: null,
    indexContainer: 0,
    indexDeploy: 0,
    containerList: [],
    deployList: []
  },
  getters: {
    getUser: state => state.user,
    getIndexContainer: state => state.indexContainer,
    getIndexDeploy: state => state.indexDeploy,
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
    setUrlApi(state) {
      if (process.env.NODE_ENV === "development") {
        state.urlApi = process.env.VUE_APP_APIURL;
        localStorage.setItem("ApiUrl", state.urlApi);
      } else {
        state.urlApi = window.location.origin;
        localStorage.setItem("ApiUrl", state.urlApi);
      }
      Vue.prototype.$axios = axios.create({
        baseURL: state.urlApi
      });
    },
    setIndexContainer(state, index) {
      state.indexContainer = index;
    },
    setIndexDeploy(state, index) {
      state.indexDeploy = index;
    },
    async setDeployList(state) {
      try {
        const result = await axios.get(state.urlApi + "/api/deploy/getall", {
          headers: state.user.headers
        });
        state.deployList = result.data;
      } catch (error) {
        this.notify(error.response.data.error, "red");
      }
    },
    removeDeploy(state) {
      Vue.delete(state.deployList, state.indexDeploy);
    },
    setNewDeploy(state, newDeploy) {
      if (state.deployList === undefined) {
        let index = 0;
        Vue.set(state.deployList, index, newDeploy);
      } else {
        let index = state.deployList.length;
        Vue.set(state.deployList, index, newDeploy);
      }
    },
    async setContainerList(state, id) {
      try {
        const result = await axios.get(
          state.urlApi + `/api/container/getall/${id}`,
          {
            headers: state.user.headers
          }
        );
        state.containerList = result.data;
      } catch (error) {
        // console.log("erro ao tentar carregar");
      }
    },
    removeContainer(state) {
      Vue.delete(state.containerList, state.indexContainer);
    },
    updateContainer(state, updatedContainer) {
      Vue.set(state.containerList, state.indexContainer, updatedContainer);
    }
  },
  actions: {
    setUser({ commit }) {
      commit("setUser");
    },
    setLogin({ commit }, user) {
      commit("setLogin", user);
    },
    setUrlApi({ commit }) {
      commit("setUrlApi");
    },
    setIndexContainer({ commit }, index) {
      commit("setIndexContainer", index);
    },
    setIndexDeploy({ commit }, index) {
      commit("setIndexDeploy", index);
    },
    setDeployList({ commit }) {
      commit("setDeployList");
    },
    removeDeploy({ commit }) {
      commit("removeDeploy");
    },
    setNewDeploy({ commit }, newDeploy) {
      commit("setNewDeploy", newDeploy);
    },
    setContainerList({ commit }, id) {
      commit("setContainerList", id);
    },
    removeContainer({ commit }) {
      commit("removeContainer");
    },
    updateContainer({ commit }, newContainer) {
      commit("updateContainer", newContainer);
    }
  },
  modules: {}
});
