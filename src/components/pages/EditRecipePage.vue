<template>
  <div>
    <Header></Header>
    <main>
      <div class="container-md my-5 py-5">
        <!-- {{ dataStatus }} -->
        <div v-if="isLoading">Loading...</div>
        <recipe-form v-if="detailData && !isLoading" :isEdit="true"></recipe-form>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { computed, reactive, onMounted, provide, ref } from 'vue'
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
    const dataStatus = ref(false)
    const detailData = ref()
    const isLoading = ref(false)

    // const recipeData = computed(async () => {
    //   // return store.getters['recipe/getRecepById'](route.params.id)
    //   const data = await store.dispatch("recipe/recipeDetail", route.params.id);
    //   console.log(data)
    //   return store.state.recipe.recipeDetail
    // })
      // detailData.value = store.state.recipe.recipeDetail
    onMounted(async () => {
      isLoading.value = true
      await store.dispatch("recipe/recipeDetail", route.params.id);
      detailData.value = store.state.recipe.recipeDetail
      isLoading.value = false
    })

    return { detailData, dataStatus, isLoading }
    
  },
}
</script>