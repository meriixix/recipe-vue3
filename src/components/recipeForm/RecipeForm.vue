<template>
    <ul class="list-group">
        <recipe-form-header></recipe-form-header>
        <recipe-form-body></recipe-form-body>
    </ul>   
</template>

<script>
import RecipeFormBody from "./RecipeFormBody.vue"
import RecipeFormHeader from "./RecipeFormHeader.vue"

export default {
    components: {
        RecipeFormBody,
        RecipeFormHeader
    }
}
</script>