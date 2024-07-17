<template>
    <div class="btn-area">
        <span class="size">
            <exeButton :className="'btn-add'" :buttonTitle="addButton" :onClickFunc="setTodoList" />
        </span>
        <span class="size">
            <exeButton :className="'btn-clear'" :buttonTitle="clearButton" :onClickFunc="clearText" />
        </span>
        <span v-if="isCheckList" class="size">
            <exeButton :buttonTitle="deletButton" :onClickFunc="deletTodo" />
        </span>
    </div>
</template>

<script>
import exeButton from '../common/CommonButton.vue';
export default {
    components: { exeButton },
    props: {
        addButton: String,
        clearButton: String,
        deletButton: String,
        confButton: String,
        isCheckList: Boolean,
    },
    emits: ['clearText', 'deletTodo', 'setTodoList'],

    methods: {
        setTodoList() {
            this.$emit('setTodoList');
        },

        clearText() {
            this.$emit('clearText');
        },

        deletTodo() {
            this.$emit('deletTodo');
        },
    },
};
</script>

<style></style>
