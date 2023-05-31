<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div class="mb-3 mb-sm-0">
        <p class="my-0 fs-4 fw-semibold">Favorite Recipe</p>
        <p class="my-0 text-secondary">Save the recipe that you loved here</p>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Recipe</p>
      <div class="row">
        <user-recipe-card
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
          :buttonName="['Remove', 'See Details']"
          @btnRemowe="likeRecipe(recipe.id)"
          @btnDetail="showDetail(recipe.id)"
        >
          <p>Recipe By {{ recipe.username }}</p>
        </user-recipe-card>
        <!-- <base-modal :modal="{title: 'Remove Recipe from favorite', body: `Are you sure to remove '${ modalBody }' from favorites?`}" @removeClicked="likeRecipe(recipeId)"></base-modal> -->
      </div>
    </li>
  </ul>
</template>

<script>
import { computed, ref } from "vue";
import UserRecipeCard from "./UserRecipeCard.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
// import BaseModal from "../ui/BaseModal.vue"

export default {
  setup() {
    const store = useStore();

    const likeRecipe = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove from favorite it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await store.dispatch("recipe/updateLike", { status: true, recipeId: id });
          Swal.fire("Remove!", "The recipe has been remove from your favorite.", "success");
        }
      });
      
    };

    const router = useRouter();

    const showDetail = (id) => {
      router.push(`/recipe/${id}`);
    };

    const recipes = computed(() => {
      const allRecipe = store.state.recipe.recipes;
      const userId = store.state.auth.userLogin.userId;
      const favoritedRecipe = allRecipe.filter((recipe) => {
        const findRecipe = recipe.likes.find((like) => like === userId);
        if (findRecipe !== undefined) {
          return recipe;
        }
      });
      return favoritedRecipe;
    });

    return {
      likeRecipe,
      showDetail,
      recipes,
    };
  },
  components: {
    UserRecipeCard,
  },
};
</script>