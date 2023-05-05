<template>
  <div>
    <Header></Header>
    <main>
      <div class="container-md my-5 py-5">
        <div class="row my-4">
          <div class="col-12 col-sm-2"></div>
          <!-- <recipe-detail :recipe="detailData"></recipe-detail> -->
          
            <recipe-detail-vue v-if="detailData"></recipe-detail-vue>
            <base-shimmer v-else></base-shimmer>
          
          <div class="col-12 col-sm-2"></div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import RecipeDetailVue from "../detail/RecipeDetail.vue";
import BaseShimmer from '../ui/BaseShimmer.vue';
import Header from "../header/Header.vue"
import Footer from "../footer/Footer.vue"

export default {
  components: {
    RecipeDetailVue,
    BaseShimmer,
    Header,
    Footer
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const detailData = ref(false)

    onMounted(async () => {
      await store.dispatch("recipe/recipeDetail", route.params.id);
      detailData.value = true
    })
    
    return { detailData }

  },
};
</script>