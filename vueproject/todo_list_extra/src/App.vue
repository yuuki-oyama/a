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
        :todoTitle="todoTitle"
        :todoDetail="todoDetail"
        :priorityList="priorityList"
        :priorityValue="priority"
        :errorFlag="errorFlag"
        @setTodoTitle="setTodoTitle"
        @setTodoDetail="setTodoDetail"
        @setTodoList="setTodoList"
        @deletTodo="deletTodo"
        @changetodoTitle="changetodoTitle"
        @checkTodoList="checkTodoList"
        @changePriority="setPriority"
    />
</template>

<script>
import axios from './api/axiosBase';
import { serverAccessUrl, buttonName, errorMessage, priority } from './constants';
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
            todoTitle: '',
            todoDetail: '',
            priority: '',
            todoCheckList: [],
            priorityList: [],
            errorFlag: false,
            errorText: '',
        };
    },

    methods: {
        // TodoListコンポーネントで入力されたタイトル値を設定する
        setTodoTitle(value) {
            this.errorFlag = false;
            this.todoTitle = value;
        },

        // TodoListコンポーネントで入力された詳細値を設定する
        setTodoDetail(value) {
            this.todoDetail = value;
        },

        // チェックを行い、問題なければ入力値を登録する
        setTodoList() {
            this.checkTodoList(this.todoTitle);
            if (this.todoTitle != '' && !this.errorFlag) {
                // 従来のフォーム送信を行うために必要なオブジェクト
                let formData = new URLSearchParams();
                formData.append('todoTitle', this.todoTitle);
                formData.append('todoDetail', this.todoDetail);
                formData.append('todoPriority', this.priority);
                this.postRequest(serverAccessUrl.PostTodoListAdd, formData);
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
            this.postRequest(serverAccessUrl.PostTodoListDelete, {
                todoDeleteList: targetList,
            });
        },

        // チェックされたTodoのうち、対象となるものを編集する
        changetodoTitle(registtodoTitle, selectId) {
            // 従来のフォーム送信を行うために必要なオブジェクト
            let formData = new URLSearchParams();
            formData.append('todoId', selectId);
            formData.append('todoTitle', registtodoTitle);
            this.postRequest(serverAccessUrl.PostTodoListEdit, formData);
        },

        // 定数値を設定する
        setConsts() {
            this.addButton = buttonName.addButton;
            this.clearButton = buttonName.clearButton;
            this.deletButton = buttonName.deletButton;
            this.confButton = buttonName.confButton;
            this.errorText = errorMessage.confrictError;
            this.priorityList = [priority.high, priority.nomal, priority.low, priority.emergency];
        },

        setPriority(value) {
            this.priority = value;
        },

        // Todoリストを取得する
        async getTodoList() {
            this.todoList = await (await axios.get(serverAccessUrl.GetTodoList)).data;
        },

        postRequest(url, data) {
            const promis = axios.post(url, data);
            promis
                .then(() => {
                    this.getTodoList();
                })
                .catch((error) => {
                    switch (error.response.status) {
                        case 500:
                            this.errorFlag = true;
                            this.errorText = errorMessage.unexpectedError;
                            break;
                    }
                });
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
