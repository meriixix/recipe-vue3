<template>
  <div
    class="my-2 p-4 d-flex flex-column-reverse flex-lg-row justify-content-between border border-secondary-sublet rounded"
  >
    <div class="pe-lg-4">
      <h2>{{ recipeData.name }}</h2>
      <p>{{ recipeData.description }}</p>

      <!-- Phone Device -->
      <div
        class="d-flex d-lg-none flex-column justify-content-between border border-primary rounded bg-color-detail"
      >
        <div
          class="w-75 my-3 pb-3 mx-auto pe-lg-4 ps-lg-3 border-bottom border-primary"
        >
          <p class="my-0">Preptime</p>
          <p class="my-0">{{ recipeData.preparationTime }} Mins</p>
        </div>
        <div class="w-75 px-lg-4 pb-3 mx-auto border-bottom border-primary">
          <p class="my-0">Cooktime</p>
          <p class="my-0">{{ recipeData.cookTime }} Mins</p>
        </div>
        <div class="w-75 my-3 mx-auto ps-lg-4 pe-3">
          <p class="my-0">Total</p>
          <p class="my-0">
            {{ recipeData.preparationTime + recipeData.cookTime }} Mins
          </p>
        </div>
      </div>

      <!-- PC Device -->
      <div
        class="d-none d-lg-flex flex-lg-row justify-content-between border border-primary rounded bg-color-detail"
      >
        <div
          class="w-75 my-3 pb-3 mx-auto pe-lg-4 ps-lg-3 border-end border-primary"
        >
          <p class="my-0">Preptime</p>
          <p class="my-0">{{ recipeData.prepTime }} Mins</p>
        </div>
        <div class="w-75 my-3 px-lg-4 mx-auto border-end border-primary">
          <p class="my-0">Cooktime</p>
          <p class="my-0">{{ recipeData.cookTime }} Mins</p>
        </div>
        <div class="w-75 my-3 mx-auto ps-lg-4 pe-3">
          <p class="my-0">Total</p>
          <p class="my-0">{{ recipeData.totalTime }} Mins</p>
        </div>
      </div>
      <p class="my-3">Recipe By {{ recipeData.username }}</p>
      <div>
        <!-- <transition name="fade"> -->
        <button
          class="btn fav-btn px-3 py-2 rounded-pill"
          v-if="!likeStatus"
          @click="favoriteButton"
        >
          <i class="far fa-heart pe-2"></i>Add To Favorite
        </button>
        <button
          class="btn fav-btn-2 px-3 py-2 rounded-pill"
          v-else
          @click="favoriteButton"
        >
          <i class="fas fa-heart pe-2"></i>Added to favorites
        </button>
        <!-- </transition> -->
      </div>
    </div>
    <div class="ps-lg-4">
      <img
        :src="recipeData.imageLink"
        alt="Food"
        class="recipe__detail-img rounded mx-auto"
        style="object-fit: cover"
      />
    </div>
  </div>
</template>

<script>
import { computed, inject, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const recipeData = reactive(store.state.recipe.recipeDetail);
    const userId = ref(store.state.auth.userLogin.userId);
    const likeStatus = ref(false);
    const router = useRouter();

    if (userId) {
      const likes = recipeData.likes;
      const findLike = likes.find((like) => like === userId.value);
      likeStatus.value = findLike ? true : false;
    } else {
      likeStatus.value = false;
    }

    const favoriteButton = async () => {
      if (store.state.auth.token) {
        if (new Date().getTime() < +store.state.auth.tokenExpirationDate) {
          await store.dispatch("recipe/updateLike", {
            status: likeStatus.value,
            recipeId: recipeData.id,
          });
          likeStatus.value = !likeStatus.value
        } else {
          showModal()
        }
      } else {
        showModal()
      }
    };

    const showModal = () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: "<b>Session Expired!</b> Please login to use this feature.",
        width: 400,
        padding: "1em",
        backdrop: `rgba(0,0,123,0.4)`,
      }).then((res) => {
        router.push("/login");
      });
    };

    return { recipeData, likeStatus, favoriteButton };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>