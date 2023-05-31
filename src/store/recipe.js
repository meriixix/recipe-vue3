// import { createStore } from "vuex";
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      recipes: [],
      recipeDetail: {}
    };
  },
  getters: {
    getRecepById: (state) => (id) => {
      return state.recipes.find((recipe) => recipe.id === id);
    },
    getSearchData: (state) => (key) => {
      return state.recipes.filter(
        (recipe) => recipe.name.toLowerCase().indexOf(key) !== -1
      );
    },
  },
  mutations: {
    setNewRecipe(state, payload) {
      state.recipes = payload;
    },
    addNewRecipe(state, payload) {
      state.recipes.push(payload);
    },
    updateRecipe(state, payload) {
      const newRecipe = state.recipes.map((recipe) => {
        if (recipe.id === payload.id) {
          recipe = payload;
        }
        return recipe;
      });
      state.recipes = newRecipe;
    },
    deleteRecipe(state, payload) {
      const recipes = state.recipes.filter((item) => item.id !== payload);
      state.recipes = recipes;
    },
    setDetailRecipe(state, payload) {
      state.recipeDetail = payload
    }
  },
  actions: {
    async recipeDetail({ commit }, payload) {
      console.log(payload)
      try {
        const { data } = await axios.get(
          `https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes/${payload}.json`
        );
        commit("setDetailRecipe", data);
      } catch (err) {
        console.log(err);
      }
    },
    async recipeList({ commit }) {
      try {
        const { data } = await axios.get(
          "https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes.json"
        );
        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }
        commit("setNewRecipe", arr);
      } catch (err) {
        console.log(err);
      }
    },
    async addNewRecipe({ commit, rootState }, payload) {
      // rootState -> used to get state from another module
      const newData = {
        ...payload,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        likes: ["null"],
        userId: rootState.auth.userLogin.userId,
      };
      try {
        const { data } = await axios.post(
          "https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes.json?auth=" +
          rootState.auth.token,
          newData
        );
        commit("addNewRecipe", { id: data.name, ...newData });
      } catch (err) {
        console.log(err.message);
      }
    },
    async updateLike({ commit, getters, rootState }, payload) {
      const userId = rootState.auth.userLogin.userId;
      const recipe = getters.getRecepById(payload.recipeId);
      if (payload.status) {
        const newLikes = recipe.likes.filter((like) => like !== userId);
        recipe.likes = newLikes;
      } else {
        recipe.likes.push(userId);
      }
      try {
        const data = await axios.put(
          `https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes/${payload.recipeId}.json?auth=${rootState.auth.token}`,
          recipe
        );
        commit("updateRecipe", recipe);
      } catch (err) {
        console.log(err)
      }
    },
    async deleteRecipe({ commit, rootState }, payload) {
      try {
        const { data } = await axios.delete(
          `https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes/${payload}.json?auth=${rootState.auth.token}`
        );
        // commit("deleteRecipe", payload);
      } catch (err) {
        console.log(err);
      }
    },
    async updateRecipe({ commit, rootState }, payload) {
      let { id: _, ...newRecipe } = payload;
      try {
        const { data } = await axios.put(
          `https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes/${payload.id}.json?auth=${rootState.auth.token}`,
          newRecipe
        );
        // commit("updateRecipe", payload);
      } catch (err) {}
    },
  },
};
