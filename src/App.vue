<template>
  <div>
  
    <header-vue
      v-if="!isBlankLayout"
    ></header-vue>
    <router-view></router-view>
    <footer-vue
      v-if="!isBlankLayout"
    ></footer-vue>
    {{isBlankLayout}}
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderVue from "./components/header/Header.vue";
import FooterVue from "./components/footer/Footer.vue";

export default {
  components: {
    HeaderVue,
    FooterVue,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const currentRoute = ref();

    onMounted(() => {
      router.isReady().then(() => {
        currentRoute.value = route.path;
      });
    });

    const isBlankLayout = computed(() => {
      if (currentRoute.value === '/login' || currentRoute.value === '/signup') {
        return true
      } else {
        return false
      }
    })

    return { currentRoute, isBlankLayout };
  },
};
</script>