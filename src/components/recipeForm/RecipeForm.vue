<template>
    <ul class="list-group">
        <recipe-form-header></recipe-form-header>
        <recipe-form-body :isEdit="isEdit"></recipe-form-body>
    </ul>   
</template>

<script>
import RecipeFormBody from "./RecipeFormBody.vue"
import RecipeFormHeader from "./RecipeFormHeader.vue"

export default {
    props: ["isEdit"],
    components: {
        RecipeFormBody,
        RecipeFormHeader
    }
}
</script>