<template>
  <div class="col-lg-3 mb-4">
    <ul class="list-group">
      <li class="list-group-item">
        <div class="d-flex align-items-center">
          <img
            :src="userData.imageLink"
            alt="Profile"
            width="36"
            height="36"
            class="rounded-circle"
            style="object-fit: cover"
          />
          <div class="ps-3">
            <p class="my-0 fs-5 fw-semibold">
              {{ userData.firstname }} {{ userData.lastname }}
            </p>
            <p class="my-0 fs-6 text-secondary">{{ userData.email }}</p>
          </div>
        </div>
      </li>
      <li
        class="list-group-item user-menu"
        :class="[{ 'border-start': isPersonalInfo, 'border-3': isPersonalInfo }]"
        @click="menuClicked('personal-info')"
      >
        <i
          class="fa-solid fa-user pe-2"
          :class="{ 'active-color': isPersonalInfo }"
        ></i
        >Personal Info
      </li>
      <li
        class="list-group-item user-menu"
        :class="[{
          'border-start': isFavoriteRecipe,
          'border-3': isFavoriteRecipe,
        }]"
        @click="menuClicked('favorite-recipes')"
      >
        <i
          class="fas fa-heart pe-2"
          :class="{ 'active-color': isFavoriteRecipe }"
        ></i
        >Favorited Recipes
      </li>
      <li
        class="list-group-item user-menu"
        :class="[{ 'border-start': isMyRecipe, 'border-3': isMyRecipe }]"
        @click="menuClicked('user-recipe')"
      >
        <i
          class="fa-solid fa-burger pe-2"
          :class="{ 'active-color': isMyRecipe }"
        ></i
        >My Recipe
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup(props, {emit}) {
        const isFavoriteRecipe = ref(false)
        const isPersonalInfo = ref(false)
        const isMyRecipe = ref(false)

        const route = useRoute()
        const currentRoute = route.params.component

        const activeMenu = option => {
            if ( option === "personal-info" ) {
                isFavoriteRecipe.value = false
                isMyRecipe.value = false
                isPersonalInfo.value = true
            } else if ( option === "favorite-recipes" ) {
                isFavoriteRecipe.value = true
                isMyRecipe.value = false
                isPersonalInfo.value = false
            } else {
                isFavoriteRecipe.value = false
                isMyRecipe.value = true
                isPersonalInfo.value = false
            }
        }

        const menuClicked = option => {
            activeMenu(option)
            emit("changeComponent", option)
        }
        
        activeMenu(currentRoute)

        const store = useStore()

        const userData = computed(() => {
            return store.state.auth.userLogin
        })

        const getPath = computed(() => {
            return route.params.component
        })

        watch(getPath, (newValue) => {
            activeMenu(newValue)
        })

        return {
            menuClicked,
            userData,
            isFavoriteRecipe,
            isPersonalInfo,
            isMyRecipe
        }
    }
}
</script>

<style scoped>
.user-menu:hover {
  cursor: pointer;
}

.active-color {
  color: #4c4ddc;
}

.inactive-color {
  color: #404040;
}
</style>