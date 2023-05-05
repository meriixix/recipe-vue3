<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    store.dispatch("recipe/recipeList")
  }
};
</script>