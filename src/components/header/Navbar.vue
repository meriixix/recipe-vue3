<template>
  <div
    class="header__navbar row justify-content-between align-items-center"
    style="width: 450px"
  >
    <search-menu-vue></search-menu-vue>
    <!-- <signup-menu-vue></signup-menu-vue> -->
    <component :is="menuComponent"></component>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import ProfileMenuVue from './ProfileMenu.vue'
import SearchMenuVue from './SearchMenu.vue'
import SignupMenuVue from './SignupMenu.vue'
import { useStore } from 'vuex'

export default {
    components: {
        SearchMenuVue,
        SignupMenuVue,
        ProfileMenuVue
    },
    setup() {
      // const token = ref(null)
      const menuComponent = ref("signup-menu-vue")
      const store = useStore()

      const getToken = computed(() => {
        return store.state.auth.token
      })

      watch(getToken, (newValue, oldValue) => {
        if ( !newValue ) {
          menuComponent.value = "signup-menu-vue"
        } else {
          menuComponent.value = "profile-menu-vue"
        }
      })

      if ( !getToken.value ) {
        menuComponent.value = "signup-menu-vue"
      } else {
        menuComponent.value = "profile-menu-vue"
      }

      return {
        menuComponent
      }
    }
}
</script>