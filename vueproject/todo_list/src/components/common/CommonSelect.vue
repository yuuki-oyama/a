<template>
    <select
        :value="value"
        :id="id"
        :name="selectName"
        :aria-label="selectAreaLabel"
        @change="$emit('changeItems', $event.target.value)"
    >
        <option value="">{{ selectAreaLabel }}</option>
        <option v-for="(item, index) in innnerSelectItemList" :value="item.value" :key="index">
            {{ item.text }}
        </option>
    </select>
</template>

<script>
export default {
    props: {
        value: String,
        id: String,
        selectName: String,
        selectAreaLabel: String,
        selectItemList: Array || Object,
    },
    emits: ['changeItems'],
    data() {
        return {};
    },

    computed: {
        innnerSelectItemList() {
            return this.selectItemList;
        },
    },
};
</script>

<style></style>
