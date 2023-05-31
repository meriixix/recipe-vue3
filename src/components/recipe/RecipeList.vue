<template>
  <div class="recipe__list-recipe row">
    <recipe-card-vue
      v-for="(recipe, index) in recipeList"
      :key="index"
      :recipe="recipe"
      
    ></recipe-card-vue>
    <!-- <div>
      <base-card-shimmer v-show="recipeList.length === 0"></base-card-shimmer>
    </div> -->
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import RecipeCardVue from "../recipe/RecipeCard.vue"
import BaseCardShimmer from '../ui/BaseCardShimmer.vue'

export default {
  components: {
    RecipeCardVue,
    BaseCardShimmer
  },
  props: ['recipes'],
  setup(props) {
    const store = useStore()

    const recipeList = computed(() => {
      if ( props.recipes ) {
        return props.recipes
      } else {
        return store.state.recipe.recipes
      }
      
    })

    return {
      recipeList
    }
    
  }
}
</script>