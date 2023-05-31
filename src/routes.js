import HomePage from "./components/pages/HomePage.vue";
import DetailPage from "./components/pages/DetailPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import UserPage from "./components/pages/UserPage.vue";
import NewRecipePage from "./components/pages/NewRecipePage.vue";
import EditRecipePage from "./components/pages/EditRecipePage.vue";
import SearchPage from "./components/pages/SearchPage.vue"
import ErrorPage from "./components/pages/ErrorPage.vue"

import Cookies from "js-cookie";
import { store } from "./store/index";

const getAllData = () => {
  store.dispatch("recipe/recipeList");
};

const checkAuth = () => {
  const jwtCookie = Cookies.get("jwt");
  const expirationDate = Cookies.get("tokenExpirationDate");
  const userId = Cookies.get("UID");
  if (jwtCookie) {
    // Plus sign used to change the data type to number
    if (new Date().getTime() < +expirationDate) {
      store.commit("auth/setToken", jwtCookie);
      // store.commit(
      //   "auth/setUserLogin",
      //   JSON.parse(decodeURIComponent(userData))
      // );
      store.dispatch("auth/getUser", userId)
      store.commit("auth/setLoginStatus", true);
      store.commit("auth/setTokenExpirationDate", expirationDate)
      return true;
    } else {
      Cookies.remove("jwt");
      Cookies.remove("tokenExpirationDate");
      Cookies.remove("user");
      store.commit("auth/setLoginStatus", false);
      store.commit("auth/setTokenExpirationDate", null)
      return false;
    }
  } else {
    return false;
  }
};

export const routes = [
  {
    path: "/",
    name: "homePage",
    component: HomePage,
    beforeEnter: () => {
      checkAuth()
    },
  },
  {
    path: "/recipe/:id",
    name: "recipeDetail",
    component: DetailPage,
    props: true,
    beforeEnter: (to, from, next) => {
      checkAuth()
      next();
    },
  },
  {
    path: "/user/:component",
    name: "userPage",
    component: UserPage,
    props: true,
    beforeEnter: (to, from, next) =>
      checkAuth() ? next() : next({ name: "login" }),
  },
  {
    path: "/new-recipe",
    name: "newRecipePage",
    component: NewRecipePage,
    beforeEnter: (to, from, next) =>
      checkAuth() ? next() : next({ name: "login" }),
  },
  {
    path: "/recipe/edit/:id",
    name: "editRecipe",
    component: EditRecipePage,
    props: true,
    beforeEnter: (to, from, next) =>
      checkAuth() ? next() : next({ name: "login" }),
  },
  // { path: "/search", name: "search", component: SearchPage },
  { path: "/search", name: "search", component: SearchPage },
  { path: "/signup", name: "signup", component: SignupPage, beforeEnter: (to,from, next) => checkAuth() ? next({ name: "homePage" }) : next() },
  { path: "/login", name: "login", component: LoginPage, beforeEnter: (to,from, next) => checkAuth() ? next({ name: "homePage" }) : next() },
  { path: '/:pathMatch(.*)*', name: "NotFound", component: ErrorPage },  
];
