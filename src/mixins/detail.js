import { inject } from "vue"

export default {
  setup() {
    const recipeData = inject("detailData");

    return { recipeData };
  },
};
