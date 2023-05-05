<template>
  <div>
    <Header></Header>
    <main>
      <div class="container-md my-5 py-5">
        <recipe-form></recipe-form>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { provide } from "vue";
import RecipeForm from "../recipeForm/RecipeForm.vue";
import Header from "../header/Header.vue";
import Footer from "../footer/Footer.vue";

export default {
  components: {
    RecipeForm,
    Header,
    Footer,
  },
  setup() {
    provide("recipe");
  },
};
</script>