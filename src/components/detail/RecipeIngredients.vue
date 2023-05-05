<template>
  <div class="my-3">
    <div class="card">
      <div class="card-header">
        <p class="fs-4 my-0 fw-semibold">Ingredients</p>
      </div>
      <div class="card-body">
        <ul class="mb-0">
          <li
            v-for="(ingredient, index) in recipeData.ingredients"
            :key="index"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const recipeData = store.state.recipe.recipeDetail;

    return { recipeData };
  },
};
</script>