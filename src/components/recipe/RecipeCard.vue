<template>
  <div
    class="col-12 col-lg-3 col-sm-4 position-relative"
    style="padding-top: 12px; padding-bottom: 12px"
  >
    <router-link class="card text-decoration-none" style="height: 398px" :to="/recipe/ + recipe.id">
      <img
        :src="recipe.imageLink"
        class="card-img-top"
        alt="Food"
        height="240"
        width="285"
        style="object-fit: cover"
        
      />
      <div class="card-body" style="color: #0A0A0A">
        <p class="mb-0">{{ recipe.category }}</p>
        <div class="h-50">
          <h4 class="fs-5 mb-0">{{ recipe.name }}</h4>
        </div>
        <p>Recipe By {{ recipe.username }}</p>
      </div>
    </router-link>
    <div
      class="position-absolute text-secondary bg-light px-2 py-1 rounded-circle top-0 end-0 m-4 like-icon"
      :class="{ 'text-secondary': !isLike, 'text-danger': isLike }"
      @click="likeRecipe"
    >
      <i class="fas fa-heart"></i>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';

export default {
  props: ["recipe"],
  setup(props) {
    const recipeItem = computed(() => {
      return props.recipe;
    });

    const store = useStore();

    const isLike = computed(() => {
      if (props.recipe.likes.length === 0) {
        if (props.recipe.likes[0] === "null") {
          return false;
        }
      } else {
        const data = props.recipe.likes.find(
          (like) => like === store.state.auth.userLogin.userId
        );
        if (data === undefined) {
          return false;
        } else {
          return true;
        }
      }
    });

    const router = useRouter()

    const likeRecipe = async () => {
      await store.dispatch("recipe/updateLike", {
        status: isLike.value,
        recipeId: props.recipe.id,
      });

      const isLogin = store.state.auth.isLogin;
      if (!isLogin) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: "<b>Session Expired!</b> Please login to use this feature.",
          width: 400,
          padding: "1em",
          background: "#fff url(/images/trees.png)",
          backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `,
        }).then((res) => {
          router.push("/login");
        });
      }
    };

    return {
      recipeItem,
      isLike,
      likeRecipe,
    };
  },
};
</script>

<style scoped>
.like-icon:hover {
  cursor: pointer;
}
</style>