<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div
        class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center"
      >
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">My Recipe</p>
          <p class="my-0 text-secondary">Add your original recipe here</p>
        </div>
        <div>
          <router-link
            to="/new-recipe"
            class="btn add-btn px-3 py-2 rounded-pill"
          >
            <i class="fa-solid fa-circle-plus pe-2"></i>Add Recipe
          </router-link>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Recipe</p>
      <div class="row">
        <user-recipe-card
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
          :buttonName="['Delete', 'Edit']"
          @btnRemowe="deleteRecipe(recipe.id)"
          @btnDetail="editButton(recipe.id)"
        >
          <p>Created at {{ getDate(recipe.createdAt) }}</p>
        </user-recipe-card>
        <!-- <base-modal :modal="{title: 'Delete Recipe?', body: `Are you sure to delete '${ modalBody }' from your recipe?`}" @removeClicked="deleteRecipe(recipeId)"></base-modal> -->
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
    const modalBody = ref("");
    const recipeId = ref("");

    const store = useStore();
    const router = useRouter();

    const recipes = computed(() => {
      const allRecipe = store.state.recipe.recipes;
      const userId = store.state.auth.userLogin.userId;
      return allRecipe.filter((recipe) => recipe.userId === userId);
    });

    const getDate = (data) => {
      const date = new Date(data);
      return date.toDateString();
    };

    const deleteRecipe = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await store.dispatch("recipe/deleteRecipe", id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    };

    const editButton = (id) => {
      router.push(`/recipe/edit/${id}`);
    };

    return {
      recipes,
      getDate,
      deleteRecipe,
      editButton,
    };
  },
  components: {
    UserRecipeCard,
  },
};
</script>