<template>
    <button :class="className" id="id" :name="name" :type="type" @click="onClickFunc">{{ buttonTitle }}</button>
</template>

<script>
export default {
    props: {
        className: String,
        id: String,
        name: String,
        type: String,
        buttonTitle: String,
        onClickFunc: Function,
    },
};
</script>

<style></style>
