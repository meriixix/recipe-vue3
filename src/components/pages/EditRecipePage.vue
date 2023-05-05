<template>
  <div>
    <Header></Header>
    <main>
      <div class="container-md my-5 py-5">
        <recipe-form :recipe="recipeData"></recipe-form>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { computed, provide } from 'vue'
import RecipeForm from "../recipeForm/RecipeForm.vue"
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Header from "../header/Header.vue"
import Footer from "../footer/Footer.vue"

export default {
  components: {
    RecipeForm,
    Header,
    Footer
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const recipeData = computed(() => {
      return store.getters['recipe/getRecepById'](route.params.id)
    })
    
    provide('recipe', recipeData.value)
    
    return { recipeData }
  },
}
</script>