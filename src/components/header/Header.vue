<template>
  <header
    class="shadow-sm container-fluid bg-white py-3 border-bottom fixed-top"
  >
    <div class="container-md d-flex justify-content-between align-items-center">
      <router-link to="/">
        <img src="@/assets/images/Logo.png" alt="Logo" />
      </router-link>
      <navbar-vue></navbar-vue>
    </div>
  </header>
</template>

<script>
import NavbarVue from './Navbar.vue'

export default {
    components: {
        NavbarVue
    }    
}
</script>