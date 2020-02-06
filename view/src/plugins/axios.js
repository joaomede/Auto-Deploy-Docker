import axios from "axios";
import Vue from "vue";
export const http = axios.create({
  baseURL: process.env.VUE_APP_APIURL
});

export default async () => {
  Vue.prototype.$axios = axios.create({
    baseURL: process.env.VUE_APP_APIURL
  });
};
