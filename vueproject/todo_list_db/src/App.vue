<template>
    <h2>TodoList</h2>
    <br />
    <errorDisp v-if="errorFlag" :errorText="errorText" />
    <br />
    <todoList
        :addButton="addButton"
        :clearButton="clearButton"
        :deletButton="deletButton"
        :confButton="confButton"
        :todoList="todoList"
        :todoText="todoText"
        :errorFlag="errorFlag"
        // setTodo受け取る→実行
        @setTodoText="setTodoText"
        @setTodoList="setTodoList"
        @deletTodo="deletTodo"
        @changeTodoText="changeTodoText"
        @checkTodoList="checkTodoList"
    >
</template>

<script>
import axios from './api/axiosBase';
import { serverAccessUrl, buttonName, errorMessage } from './constants';
import todoList from './components/main/TodoList.vue';
import errorDisp from './components/common/ErrorDisp.vue';

export default {
    components: { todoList, errorDisp },
    data() {
        return {
            todoList: [],
            addButton: '',
            clearButton: '',
            deletButton: '',
            confButton: '',
            todoText: '',
            todoCheckList: [],
            errorFlag: false,
            errorText: '',
        };
    },

    methods: {
        // TodoListコンポーネントで入力された値を設定する
        setTodoText(value) {
            this.errorFlag = false;
            this.todoText = value;
        },

        // チェックを行い、問題なければ入力値を登録する
        setTodoList() {
            this.checkTodoList(this.todoText);
            if (this.todoText != '' && !this.errorFlag) {
                // 従来のフォーム送信を行うために必要なオブジェクト
                let formData = new URLSearchParams();
                formData.append('todoText', this.todoText);
                axios.post(serverAccessUrl.PostTodoListAdd, formData);
                this.getTodoList();
            }
        },

        // 現在のTodoリスト内に、同一の内容が無いかどうかを確認する
        checkTodoList(target) {
            const result = this.todoList.filter((item) => {
                return item.todo_text == target;
            });
            this.errorFlag = result.length != 0;
        },

        // チェックされたTodoを削除する
        deletTodo(targetList) {
            const promis = axios.post(serverAccessUrl.PostTodoListDelete, {
                todoDeleteList: targetList,
            });
            promis
                .then(() => {
                    this.getTodoList();
                })
                .catch((error) => {
                    switch (error.response?.status) {
                        case 500:
                            this.errorFlag = true;
                            this.errorText = errorMessage.unexpectedError;
                            break;
                    }
                });
        },

        // チェックされたTodoのうち、対象となるものを編集する
        changeTodoText(registTodoText, selectId) {
            // 従来のフォーム送信を行うために必要なオブジェクト
            let formData = new URLSearchParams();
            formData.append('todoId', selectId);
            formData.append('todoText', registTodoText);
            axios.post(serverAccessUrl.PostTodoListEdit, formData);
            this.getTodoList();
        },

        // 定数値を設定する
        setConsts() {
            this.addButton = buttonName.addButton;
            this.clearButton = buttonName.clearButton;
            this.deletButton = buttonName.deletButton;
            this.confButton = buttonName.confButton;
            this.errorText = errorMessage.confrictError;
        },

        // Todoリストを取得する
        async getTodoList() {
            this.todoList = await (await axios.get(serverAccessUrl.GetTodoList)).data;
        },
    },

    // マウント時、Todoリストの取得と定数の設定を行う
    async mounted() {
        this.getTodoList();
        this.setConsts();
    },
};
</script>

<style scoped></style>
