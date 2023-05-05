<template>
  <div class="row">
    <div
      class="col-12 col-lg-3 col-sm-4 position-relative"
      style="padding-top: 12px; padding-bottom: 12px"
    >
      <card-shimmer :is-loading="true" />
    </div>

    <div
      class="col-12 col-lg-3 col-sm-4 position-relative"
      style="padding-top: 12px; padding-bottom: 12px"
    >
      <card-shimmer :is-loading="true" />
    </div>

    <div
      class="col-12 col-lg-3 col-sm-4 position-relative"
      style="padding-top: 12px; padding-bottom: 12px"
    >
      <card-shimmer :is-loading="true" />
    </div>

    <div
      class="col-12 col-lg-3 col-sm-4 position-relative"
      style="padding-top: 12px; padding-bottom: 12px"
    >
      <card-shimmer :is-loading="true" />
    </div>
  </div>
</template>

<script>
import { CardShimmer } from "vue3-shimmer";

export default {
  components: {
    CardShimmer,
  },
};
</script>