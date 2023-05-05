<template>
  <div class="col-sm-8 col-4 py-0">
    <div class="d-none d-sm-block">
      <div
        class="header__searchbar input-group align-items-center border rounded-pill"
      >
        <span class="px-2"><i class="fa-solid fa-magnifying-glass"></i></span>
        <input
          type="text"
          class="form-control form-control-sm border-0 rounded-pill"
          placeholder="Search Recipe"
          v-model="keyword"
          @keyup.enter="searchKeyword"
          @blur="focusOut"
        />
      </div>
    </div>
    <div class="d-block d-sm-none border-end text-end px-3">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const keyword = ref("")
    const router = useRouter()

    const searchKeyword = () => {
      if ( keyword.value === "" ) {
        router.push("/");
      } else {
        router.push({ path: "/search", query: { key: keyword.value } });
      }
    }

    return { keyword, searchKeyword }
  },
};
</script>