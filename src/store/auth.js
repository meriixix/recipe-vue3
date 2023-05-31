// import { createStore } from "vuex";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state() {
    return {
      userLogin: {},
      token: null,
      isLogin: false,
      tokenExpirationDate: null
    };
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUserLogin(state, payload) {
      state.userLogin = payload;
    },
    setLoginStatus(state, payload) {
      state.isLogin = payload;
    },
    setTokenExpirationDate(state, payload) {
      state.tokenExpirationDate = payload
    }
  },
  actions: {
    async userSignup({ commit, dispatch }, payload) {
      const APIkey = "AIzaSyAZw4XY-USmeiN9j1cLmxJ8W8mu_l2a19U";
      const authURL = payload.isLogin
        ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
        : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

      try {
        const { data } = await axios.post(authURL + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });

        // Save Token and Expiration date on cookies
        Cookies.set("jwt", data.idToken);

        const tokenExpirationDate =
          new Date().getTime() + Number.parseInt(data.expiresIn) * 1000;
        Cookies.set("tokenExpirationDate", tokenExpirationDate);
        // Cookies.set("UID", data.localId);
        commit("setToken", data.idToken);
        commit("setTokenExpirationDate", tokenExpirationDate)

        // If status != login
        if (!payload.isLogin) {
          const newUserData = {
            userId: data.localId,
            firstname: payload.firstname,
            lastname: payload.lastname,
            username: payload.username,
            email: payload.email,
            imageLink: payload.imageLink
          };
          
          Cookies.set("UID", newUserData.userId);
          await dispatch("newUser", newUserData);
        } else {
          await dispatch("getUser", data.localId);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async newUser({ commit, state }, payload) {
      try {
        const { data } = await axios.post(
          `https://recipe-vue-batch2-default-rtdb.firebaseio.com/user.json?auth=${state.token}`,
          payload
        );
        commit("setUserLogin", { ...payload });
        commit("setLoginStatus", true);
      } catch (err) {
        console.log(err);
      }
    },
    async getUser({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `https://recipe-vue-batch2-default-rtdb.firebaseio.com/user.json`
        );
        for (let key in data) {
          if (data[key].userId === payload) {
            commit("setUserLogin", data[key]);
            commit("setLoginStatus", true);
            Cookies.set("UID", data[key].userId)
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    logout({ commit }, payload) {
      commit("setToken", null);
      commit("setUserLogin", {});
      commit("setLoginStatus", false);
      commit("setTokenExpirationDate", null)
      Cookies.remove("jwt");
      Cookies.remove("user");
      Cookies.remove("tokenExpirationDate");
      Cookies.remove("UID");
    },
  },
};
