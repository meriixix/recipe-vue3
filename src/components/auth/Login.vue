<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff" class="p-5 w-50 m-auto">
      <div class="text-center">
        <img src="../../assets/images/Vector.png" alt="Logo" />
        <h2 class="mt-4">Log in to your account</h2>
        <p>Welcome back! Please enter your details.</p>
      </div>
      <form @submit.prevent="login">
        <div class="my-4">
          <label for="email" class="fw-semibold"
            >Email <span style="color: #cb3a31">*</span></label
          >
          <base-input-vue
            type="email"
            id="email"
            v-model="loginData.email"
            placeholder="Your email address"
          ></base-input-vue>
        </div>
        <div class="my-4">
          <label for="password" class="fw-semibold"
            >Password <span style="color: #cb3a31">*</span></label
          >
          <base-input-vue
            type="password"
            id="password"
            v-model="loginData.password"
            placeholder="Your password"
          ></base-input-vue>
        </div>
        <base-button-vue class="login w-100 my-3">Login</base-button-vue>
      </form>
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Don’t have an account?<span style="color: #4c4ddc">
            <router-link to="/signup" class="text-decoration-none">
              Signup</router-link
            ></span
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import BaseButtonVue from "../ui/BaseButton.vue";
import BaseInputVue from "../ui/BaseInput.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2'

export default {
  components: {
    BaseInputVue,
    BaseButtonVue,
  },
  setup() {
    const loginData = reactive({
      email: "",
      password: "",
      isLogin: true,
    });

    const store = useStore();
    const router = useRouter();

    const login = async () => {
      await store.dispatch("auth/userSignup", loginData);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });

      router.push("/");
    };

    return {
      loginData,
      login,
    };
  },
};
</script>
