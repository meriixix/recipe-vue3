<template>
  <div>
    <Header></Header>
    <div class="container-md my-5 py-5">
      <div class="recipe__title text-center">
        <h2>All Recipe</h2>
        <p style="font-size: 15px">
          Find and share everyday cooking inspiration on Allrecipes.Discover
          recipes, cooks, videos, and how-tos based on the food you love and the
          friends you follow.
        </p>
      </div>
      <recipe-list-vue></recipe-list-vue>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import RecipeListVue from "../recipe/RecipeList.vue";
import Header from "../header/Header.vue"
import Footer from "../footer/Footer.vue"

export default {
  components: {
    RecipeListVue,
    Header,
    Footer
  },
  
};
</script>