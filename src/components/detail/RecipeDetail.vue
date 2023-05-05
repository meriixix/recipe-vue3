<template>
  <div class="col-12 col-sm-8">
    <recipe-description-vue></recipe-description-vue>
    <recipe-ingredients-vue></recipe-ingredients-vue>
    <recipe-direction-vue></recipe-direction-vue>
  </div>
</template>

<script>
import RecipeDescriptionVue from './RecipeDescription.vue';
import RecipeDirectionVue from './RecipeDirection.vue';
import RecipeIngredientsVue from './RecipeIngredients.vue';

export default {
  components: {
    RecipeDescriptionVue,
    RecipeDirectionVue,
    RecipeIngredientsVue,
  },
};
</script>