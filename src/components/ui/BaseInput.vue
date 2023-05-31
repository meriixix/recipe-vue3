<template>
  <div>
    <input
      :type="type"
      class="form-control"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('totalTimeFocus', $event.target.value)"
      @keyup="$emit('keyInput', $event.target.value)"
      @change="$emit('fileInput', $event.target.files)"
      :readonly="readonly === '1'"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
    placeholder: {
      type: String,
      require: false,
    },
    value: {
      type: [String, Number, File, Array],
    },
    readonly: {
      type: String,
      default: "0",
    },
    modelValue: ''
  },
};
</script>