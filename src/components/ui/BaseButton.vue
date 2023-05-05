<template>
  <button class="btn rounded-pill" @click="$emit('clickButton')" :data-bs-dismiss="isModal ? 'modal' : ''">
    <slot></slot>{{ buttonName }}
  </button>
</template>


<script>
export default {
    props: {
        buttonName: {
            type: String,
            require: true
        },
        isModal: {
          type: Boolean,
          require: true,
          default: false
        }
    }
}
</script>