import Vue from "vue";
import Vuex from "vuex";
import cookie from "vue-cookies";
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
      const user = cookie.VueCookies.get("user");
      if (user !== null) {
        state.user = {
          id: user.id,
          name: user.nome,
          email: user.email,
          headers: { authorization: "Bearer " + user.token },
          contratoId: user.contratoIdFk
        };
      } else {
        state.user = {
          id: null,
          name: "Usuário Deslogado",
          email: null,
          headers: { authorization: "semAutenticacao" },
          contrato: null
        };
      }
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    }
  },
  modules: {}
});
