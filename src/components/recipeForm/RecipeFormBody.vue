<template>
  <li class="list-group-item">
    <!-- General Information Start-->
    <form @submit.prevent="addNewRecipe">
      <div>
        <!-- {{ recipeData }} -->
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <div class="mb-3">
            <label for="recipe-image">
              Photo Recipe<span style="color: #cb3a31">*</span>
              <!-- <div class="d-flex">
                <div
                  class="border px-5 py-4 text-center mt-2 rounded-3 me-2"
                  style="height: 140px"
                >
                  <div class="my-2">
                    <i
                      class="fa-solid fa-plus d-block rounded-circle px-3 py-3"
                      style="background-color: #efefff; color: #4c4ddc"
                    ></i>
                    Upload
                  </div>
                </div>

                <div
                  class="border text-center mt-2 rounded-3 ms-2"
                  :class="{
                    'd-none': !recipeData.imageLink,
                    'd-block': recipeData.imageLink,
                  }"
                >
                  <img
                    :src="recipeData.imageLink"
                    class="card-img-top rounded-3"
                    height="140"
                    style="object-fit: cover"
                  />
                </div>
              </div> -->
            </label>
            <base-input
              type="file"
              id="recipe-image"
              @input="checkImage"
            ></base-input>
          </div>

          <div class="mb-3">
            <label for="recipe-title" class="form-label"
              >Recipe Title <span style="color: #cb3a31">*</span></label
            >
            <base-input
              type="text"
              id="recipe-title"
              placeholder="Give your recipe a title"
              v-model="recipeData.name"
            ></base-input>
          </div>

          <div class="mb-3">
            <label for="recipe-description" class="form-label"
              >Description <span style="color: #cb3a31">*</span></label
            >
            <textarea
              class="form-control"
              id="recipe-description"
              placeholder="Share story behind recipe and what is make it special"
              v-model="recipeData.description"
              required
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="recipe-category" class="form-label"
              >Category <span style="color: #cb3a31">*</span></label
            >
            <base-select
              v-model="recipeData.category"
              :data="['Breakfast', 'Lunch', 'Dinner', 'Meals', 'Snacks']"
            ></base-select>
          </div>
        </div>
      </div>
      <!-- General Information End -->

      <!-- Time Setting Start -->
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Time Setting</p>
        <div>
          <div class="mb-3">
            <label for="prep-time" class="form-label"
              >Prep Time <span style="color: #cb3a31">*</span></label
            >
            <base-input
              type="number"
              id="prep-time"
              placeholder="0"
              v-model="recipeData.prepTime"
            ></base-input>
          </div>
          <div class="mb-3">
            <label for="cook-time" class="form-label"
              >Cook Time <span style="color: #cb3a31">*</span></label
            >
            <base-input
              type="number"
              id="cook-time"
              placeholder="0"
              v-model="recipeData.cookTime"
            ></base-input>
          </div>
          <div class="mb-3">
            <label for="prep-time" class="form-label"
              >Total Time <span style="color: #cb3a31">*</span></label
            >
            <base-input
              type="number"
              id="total-time"
              placeholder="0"
              v-model="recipeData.totalTime"
              @totalTimeFocus="totalTime"
              readonly="1"
            ></base-input>
          </div>
        </div>
      </div>
      <!-- Time Setting End -->

      <!-- Ingredients Start -->
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Ingredients</p>
        <p>
          Enter one ingredient per line. Include the quantity (i.e. cups,
          tablespoons) and any special preparation (i.e. sifted, softened,
          chopped). Use optional headers to organize the different parts of the
          recipe (i.e. Cake, Frosting, Dressing).
        </p>
        <div>
          <!-- Ingredient Template -->
          <div class="mb-3 row" v-for="count in ingredientCount" :key="count">
          
            <div class="col-lg-11 col-11">
              <base-input
                id="ingredient"
                type="text"
                placeholder="Ex : 1 cup sugar"
                v-model="recipeData.ingredients[count - 1]"
              ></base-input>
            </div>
            <div
              class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient"
              style="color: #cb3a31"
              v-if="ingredientCount > 1"
              @click="deleteIngredient(count - 1)"
            >
              <i class="fa-regular fa-trash-can px-1"></i
              ><span class="d-none d-md-inline">Delete</span>
            </div>

          </div>
        </div>

        <!-- Add Button -->
        <base-button
          class="new-ingredient-btn px-3 py-2"
          @clickButton="addIngredient"
        >
          <i class="fa-solid fa-plus me-2"></i>Add More
        </base-button>
      </div>
      <!-- Ingredients End -->

      <!-- Directions Start -->
      <div class="border-top my-3">
        <p class="my-3 fs-5 fw-semibold">Directions</p>
        <p>
          Explain how to make your recipe, including oven temperatures, baking
          or cooking times, and pan sizes, etc. Use optional headers to organize
          the different parts of the recipe
        </p>
        <div>
          <div class="mb-3 row" v-for="count in directionCount" :key="count">
            <div class="col-md-11 col-11">
              <label for="direction" class="form-label align-self-end"
                ><b>Step {{ count }}</b
                ><span style="color: #cb3a31">*</span></label
              >
              <base-input
                id="direction"
                type="text"
                placeholder="Ex : 1 cup sugar"
                v-model="recipeData.directions[count - 1]"
              ></base-input>
            </div>
            <div
              class="col-md-1 col-1 col-form-label align-self-end delete-directions"
              style="color: #cb3a31"
              v-if="directionCount > 1"
              @click="deleteDirection(count - 1)"
            >
              <i class="fa-regular fa-trash-can px-1"></i
              ><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>

        <!-- Add Button -->
        <div class="new-ingredient-btn px-3 py-2" @clickButton="addDirection">
          <i class="fa-solid fa-plus me-2"></i>Add More
        </div>
      </div>
      <!-- Direction End -->

      <!-- Submit Button Start-->
      <div class="border-top py-3 d-flex my-4 justify-content-end">
        <div @clickButton="cancelRecipe" class="cancel-btn px-3 py-2 me-1">
          Cancel
        </div>
        <base-button class="submit-recipe-btn px-3 py-2 ms-1"
          >Submit</base-button
        >
      </div>
    </form>
  </li>
</template>

<script>
import BaseInput from "../ui/BaseInput.vue";
import BaseSelect from "../ui/BaseSelect.vue";
import BaseButton from "../ui/BaseButton.vue";
import { inject, reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  props: {
    recipe: {
      type: Object,
      required: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseInput,
    BaseSelect,
    BaseButton,
  },
  setup(props) {
    // const recipe = inject("recipe");
    const store = useStore();
    const router = useRouter();
    const recipeDetail = ref();

    // const recipe = reactive(store.state.recipe.recipeDetail)
    // console.log("Da")
    // console.log(recipe)

    const recipeData = ref({
      imageLink: "",
      name: "",
      description: "",
      category: "",
      prepTime: 0,
      cookTime: 0,
      totalTime: 0,
      ingredients: [],
      directions: [],
    });

    const ingredientCount = ref(1);
    const directionCount = ref(1);

    onMounted(() => {
      if (props.isEdit) {
        // console.log('store',store.state.recipe.recipeDetail);
        // console.log('test',recipeDetail.value);
        recipeData.value = store.state.recipe.recipeDetail;

        ingredientCount.value = recipeData.value.ingredients.length;
        directionCount.value = recipeData.value.directions.length;
      }
    });

    // const recipeData = reactive({
    //   imageLink: "",
    //   name: "",
    //   description: "",
    //   category: "",
    //   prepTime: 0,
    //   cookTime: 0,
    //   totalTime: 0,
    //   ingredients: [],
    //   directions: [],
    // });

    // if (recipe) {
    //   ingredientCount.value = props.recipe.ingredients.length;
    //   directionCount.value = props.recipe.directions.length;
    // }

    const totalTime = (data) => {
      recipeData.totalTime =
        parseInt(recipeData.prepTime) + parseInt(recipeData.cookTime);
    };

    const addIngredient = (item) => {
      ingredientCount.value++;
    };

    const addDirection = (item) => {
      directionCount.value++;
    };

    const deleteIngredient = (index) => {
      recipeData.ingredients.splice(index, 1);
      ingredientCount.value = recipeData.ingredients.length;
    };

    const deleteDirection = (index) => {
      recipeData.directions.splice(index, 1);
      directionCount.value = recipeData.directions.length;
    };

    const addNewRecipe = async (item) => {
      // if (!recipe) {
      //   await store.dispatch("recipe/addNewRecipe", recipeData);
      //   saveRecipeModal();
      //   router.push("/");
      // } else {
      //   await store.dispatch("recipe/updateRecipe", recipeData);
      //   saveRecipeModal();
      //   router.push("/user/user-recipe");
      // }

      await store.dispatch("recipe/updateRecipe", recipeData);
      saveRecipeModal();
      router.push("/user/user-recipe");
    };

    const saveRecipeModal = () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    };

    const cancelRecipe = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/user/user-recipe");
        }
      });
    };

    // Image
    const checkImage = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener("load", () => {
        recipeData.value.imageLink = reader.result;
      });
    };

    return {
      recipeData,
      ingredientCount,
      directionCount,
      totalTime,
      addIngredient,
      addDirection,
      deleteIngredient,
      deleteDirection,
      addNewRecipe,
      cancelRecipe,
      checkImage,
    };
  },
};
</script>

<style>
.delete-ingredient:hover,
.delete-directions:hover {
  cursor: pointer;
}
</style>
