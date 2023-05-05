<template>
  <div class="row my-4">
    <div class="col-12 col-sm-2"></div>
    <div class="col-12 col-sm-8">
      <div>
        <paragraph-shimmer :is-loading="true" :lines="5" :random-size="true"/>
      </div>
    </div>
    <div class="col-12 col-sm-2"></div>
  </div>
</template>

<script>
import { CardShimmer, ParagraphShimmer, FreeStyleShimmer } from "vue3-shimmer";

export default {
  components: {
    CardShimmer,
    ParagraphShimmer,
    FreeStyleShimmer,
  },
};
</script>