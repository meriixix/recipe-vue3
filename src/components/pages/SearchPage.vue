<template>
  <div>
    <Header></Header>
    <div class="my-5 py-5">
      <div
        class="recipe__title text-center container-fluid py-3"
        style="background-color: #f5f5f5"
      >
        <h2>Search result for "{{ $route.query.key }}"</h2>
        <p style="font-size: 15px">
          {{ filteredRecipe.length }} Recipe found using this keyword
        </p>
        <!-- <category-list @checkbox-on-change="categoryChecked"></category-list> -->
      </div>
      <div class="container-md">
        <recipe-list-vue :recipes="filteredRecipe"></recipe-list-vue>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import RecipeListVue from "../recipe/RecipeList.vue";
import { useStore } from "vuex";
import Header from "../header/Header.vue";
import Footer from "../footer/Footer.vue";

export default {
  components: {
    RecipeListVue,
    Header,
    Footer,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const filteredRecipe = computed(() => {
      const keyword = route.query.key;
      const allRecipe = store.state.recipe.recipes;
      const recipes = allRecipe.filter((recipe) =>
        recipe.name.toLowerCase().includes(keyword.toLocaleLowerCase())
      );
      return recipes;
    });

    return {
      filteredRecipe,
    };
  },
};
</script>