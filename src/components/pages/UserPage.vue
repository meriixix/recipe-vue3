<template>
  <div>
    <Header></Header>
    <div class="container-md my-5 py-5">
      <div class="row">
        <user-menu @changeComponent="$router.push($event)"></user-menu>
        <div class="col-lg-9">
          <transition name="component-fade" mode="out-in">
            <component :is="getRoute"></component>
          </transition>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import UserMenu from "../user/UserMenu.vue";
import FavoriteRecipes from "../user/FavoriteRecipes.vue";
import UserRecipe from "../user/UserRecipe.vue";
import PersonalInfo from "../user/PersonalInfo.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Header from "../header/Header.vue";
import Footer from "../footer/Footer.vue";

export default {
  components: {
    UserMenu,
    FavoriteRecipes,
    UserRecipe,
    PersonalInfo,
    Header,
    Footer,
  },
  setup() {
    const route = useRoute();

    const getRoute = computed(() => {
      return route.params.component;
    });

    console.log("Route");
    console.log(getRoute.value);

    return {
      getRoute,
    };
  },
};
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>