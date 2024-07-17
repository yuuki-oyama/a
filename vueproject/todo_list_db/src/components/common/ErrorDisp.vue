<template>
    <div>
        <span class="wpcf7-not-valid-tip">{{ errorText }}</span>
    </div>
</template>

<script>
export default {
    props: {
        errorText: String,
    },
};
</script>

<style></style>
