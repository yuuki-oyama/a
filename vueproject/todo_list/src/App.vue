<template>
    <h2>TodoList</h2>
    <br />
    <errorDisp v-if="errorFlag" :errorText="errorText" />
    <br />
    <todoList
        :addButton="bName"
        :clearButton="clearButton"
        :deletButton="deletButton"
        :confButton="confButton"
        :todoList="todoList"
        :todoText="todoText"
        :errorFlag="errorFlag"
        :todoCheckList="todoCheckList"
        @update:value="todoCheckList = $event"
        @setTodoText="setTodoText"
        @setTodoList="setTodoList"
        @deletTodo="deletTodo"
        @changeTodoText="changeTodoText"
        @checkTodoList="checkTodoList"
        @clearCheckList="clearCheckList"
    />
</template>

<script>
import todoList from './components/main/TodoList.vue';
import errorDisp from './components/common/ErrorDisp.vue';

export default {
    components: { todoList, errorDisp },
    data() {
        return {
            todoList: [],
            bName: '追加',
            clearButton: 'クリア',
            deletButton: '削除',
            confButton: '内容確定',
            todoText: '',
            todoCheckList: [],
            errorFlag: false,
            errorText: '同じ内容を追加することは出来ません。',
        };
    },

    methods: {
        setTodoText(value) {
            this.errorFlag = false;
            this.todoText = value;
        },
        setTodoList() {
            this.checkTodoList(this.todoText);
            if (this.todoText != '' && !this.errorFlag) {
                this.todoList.push(this.todoText);
            }
        },
        checkTodoList(target) {
            const result = this.todoList.filter((item) => {
                return item == target;
            });
            this.errorFlag = result.length != 0;
        },
        deletTodo(targetList) {
            for (const code of targetList) {
                this.todoList.splice(
                    this.todoList.findIndex((item) => item === code),
                    1
                );
            }
        },
        changeTodoText(registTodoText, selectId) {
            this.todoList.splice(selectId, 1, registTodoText);
        },
        clearCheckList() {
            this.todoCheckList = [];
        },
    },
};
</script>

<style scoped></style>
