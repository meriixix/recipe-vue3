<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
      <div class="text-center">
        <img src="../../assets/images/Vector.png" alt="Logo" />
        <h2 class="mt-4">Create your account</h2>
        <p>Enter your details to use all the app features.</p>
      </div>
      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          <div class="col-md-6">
            <label for="firstname" class="fw-semibold"
              >Firstname <span style="color: #cb3a31">*</span></label
            >
            <base-input-vue
              type="text"
              id="firstname"
              v-model="signupData.firstname"
              placeholder="Ex: Jack"
            >
            </base-input-vue>
          </div>

          <div class="col-md-6">
            <label for="lastname" class="fw-semibold"
              >Last Name <span style="color: #cb3a31">*</span></label
            >
            <base-input-vue
              type="text"
              id="lastname"
              v-model="signupData.lastname"
              placeholder="Ex: Daniel"
            >
            </base-input-vue>
          </div>
        </div>

        <!-- Username -->
        <div class="my-4">
          <label for="username" class="fw-semibold"
            >Username <span style="color: #cb3a31">*</span></label
          >
          <base-input-vue
            type="text"
            id="username"
            v-model="signupData.username"
            placeholder="Your username"
          >
          </base-input-vue>
        </div>

        <!-- Email -->
        <div class="my-4">
          <label for="email" class="fw-semibold"
            >Email <span style="color: #cb3a31">*</span></label
          >
          <base-input-vue
            type="email"
            id="email"
            v-model="signupData.email"
            placeholder="Your email address"
          >
          </base-input-vue>
        </div>

        <!-- Password -->
        <div class="my-4">
          <label for="password" class="fw-semibold"
            >Password <span style="color: #cb3a31">*</span></label
          >
          <base-input-vue
            type="password"
            id="password"
            v-model="signupData.password"
            placeholder="Your password"
            @keyInput="passwordCheck"
          >
          </base-input-vue>
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: paswwordStatusDisplay }">
            The password field must be at least 8 characters
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="my-4">
          <label for="confirmationPassword" class="fw-semibold"
            >Confirmation Password <span style="color: #cb3a31">*</span></label
          >
          <base-input-vue
            type="password"
            id="confirmationPassword"
            v-model="signupData.confirmationPassword"
            @keyInput="passwordCheck"
            placeholder="Same with password"
          >
          </base-input-vue>
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: confirmPasswordDoesNotMacth }">
            The password confirmation does not match
          </p>
          <p class="text-success mt-1 fw-medium" style="font-size: 11px" :style="{ display: confirmPasswordMacth }">
            The password confirmation does match
          </p>
        </div>

        <!-- Profile Photo -->
        <div class="my-4">
          <label for="recipe-image" class="fw-semibold">
            Profile Photo<span style="color: #cb3a31">*</span>
            <div>
              <div class="border p-1 mt-2 rounded-circle">
                <img
                  :src="signupData.imageLink"
                  class="rounded-circle"
                  width="140"
                  height="150"
                  style="object-fit: cover"
                />
              </div>
              <div class="text-center" style="transform: translateY(-24px)">
                  <i
                    class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"
                  ></i>
                </div>
            </div>
          </label>
          <base-input-vue
            type="file"
            id="recipe-image"
            class="d-none"
            @input="checkImage"
          ></base-input-vue>
        </div>

        <base-button-vue class="login w-100 my-3">Register</base-button-vue>
      </form>
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Already have account?<span style="color: #4c4ddc"
            ><router-link to="/login" class="text-decoration-none">
              Login</router-link
            ></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseButtonVue from "../ui/BaseButton.vue";
import BaseInputVue from "../ui/BaseInput.vue";

export default {
  components: {
    BaseButtonVue,
    BaseInputVue,
  },
  setup() {
    const confirmPasswordDoesNotMacth = ref("none");
    const confirmPasswordMacth = ref("none");
    const paswwordStatusDisplay = ref("none");
    const signupData = reactive({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmationPassword: "",
      isLogin: false,
      imageLink: "",
    });

    const showConfirmPasswordDoesNotMatch = () => {
      confirmPasswordDoesNotMacth.value = "block";
      confirmPasswordMacth.value = "none";
    };

    const showConfirmPasswordMatch = () => {
      confirmPasswordDoesNotMacth.value = "none";
      confirmPasswordMacth.value = "block";
    };

    const hideConfirmPasswordStatus = () => {
      confirmPasswordDoesNotMacth.value = "none";
      confirmPasswordMacth.value = "none";
    };

    const passwordCheck = () => {
      if (signupData.password.length < 8) {
        paswwordStatusDisplay.value = "block";
      } else {
        paswwordStatusDisplay.value = "none";
      }

      if (signupData.confirmationPassword === "") {
        hideConfirmPasswordStatus();
        return;
      }

      if (signupData.password !== signupData.confirmationPassword) {
        showConfirmPasswordDoesNotMatch();
        return;
      }

      showConfirmPasswordMatch();
    };

    const store = useStore();
    const router = useRouter();

    const register = async () => {
      if (
        signupData.password !== signupData.confirmationPassword ||
        signupData.password.length < 8
      ) {
        signupData.confirmationPassword = "";
        signupData.password = "";
        hideConfirmPasswordStatus();
        return;
      }
      await store.dispatch("auth/userSignup", signupData);
      router.push("/");
    };

    const checkImage = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener("load", () => {
        signupData.imageLink = reader.result;
      });
    };

    return {
      confirmPasswordDoesNotMacth,
      confirmPasswordMacth,
      paswwordStatusDisplay,
      signupData,
      passwordCheck,
      register,
      checkImage,
    };
  },
};
</script>