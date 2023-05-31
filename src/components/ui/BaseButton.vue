<template>
  <button
    class="btn rounded-pill"
    @click="$emit('clickButton')"
    :data-bs-dismiss="isModal ? 'modal' : ''"
  >
    <slot></slot>
  </button>
</template>


<script>
export default {
  props: {
    isModal: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
};
</script>