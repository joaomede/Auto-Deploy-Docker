import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    getUser: state => state.user
  },
  mutations: {
    setUser(state) {
      const user = window.$cookies.get("user");
      if (user !== null) {
        state.user = {
          id: user.id,
          name: user.nome,
          email: user.email,
          headers: { authorization: "Bearer " + user.token }
        };
      } else {
        state.user = {
          id: null,
          name: "Usuário Deslogado",
          email: null,
          headers: { authorization: "semAutenticacao" }
        };
      }
    }
  },
  actions: {
    setUser({ commit }) {
      commit("setUser");
    }
  },
  modules: {}
});
