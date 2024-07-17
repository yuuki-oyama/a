<template>
    <div>
        <input :value="todoText" @input="setTodoText" />
        <span class="size">
            <exeButton :buttonTitle="addButton" :onClickFunc="setTodoList" />
        </span>
        <span class="size">
            <exeButton :buttonTitle="clearButton" :onClickFunc="clearText" />
        </span>
        <span v-if="todoCheckList.length" class="size">
            <exeButton :buttonTitle="deletButton" :onClickFunc="deletTodo" />
        </span>
    </div>
    <br />

    <div v-if="todoList.length" class="btn-group btn-group-vertical" data-toggle="buttons">
        <template v-for="(todoObj, index) in innerTodoList" :key="index">
            <label :id="`todoId-${todoObj.id}`" class="btn active">
                <input type="checkbox" :name="todoObj.todo_text" :value="todoObj.id" v-model="todoCheckList" />
                <i class="fa fa-square-o fa-2x"></i>
                <i class="fa fa-check-square-o fa-2x"></i>
                <template v-if="checkTodoCheckList(todoObj.id)">
                    <span class="size"><input :value="todoObj.todo_text" @input="setAfterText" /></span>
                    <span class="size">
                        <exeButton :disabled="errorFlag" :buttonTitle="confButton" :onClickFunc="changeTodoText" />
                    </span>
                </template>
                <span v-else class="size">{{ todoObj.todo_text }}</span>
            </label>

            <br />
        </template>
    </div>
    <div v-else>Todoがありません</div>
</template>

<script>
import exeButton from '../common/CommonButton.vue';
export default {
    components: { exeButton },
    props: {
        todoList: Array,
        addButton: String,
        clearButton: String,
        deletButton: String,
        confButton: String,
        todoText: String,
        errorFlag: Boolean,
    },
    emits: ['setTodoText', 'clearText', 'deletTodo', 'changeTodoText', 'checkTodoList', 'setTodoList'],
    data() {
        return { todoCheckList: [], afterText: '', selectId: '' };
    },

    methods: {
        setTodoText(e) {
            const targetText = e.target.value;
            this.$emit('setTodoText', targetText);
        },

        setTodoList() {
            this.clearValue();
            this.$emit('setTodoList');
        },

        clearText() {
            this.clearValue();
            this.$emit('setTodoText', '');
        },

        deletTodo() {
            this.$emit('deletTodo', this.todoCheckList);
            this.clearValue();
        },

        setAfterText(e) {
            const targetChangeText = e.target.value;
            this.selectId = e.currentTarget.parentElement.parentElement.id.split('-')[1];
            this.afterText = targetChangeText;
            this.$emit('checkTodoList', targetChangeText);
        },

        changeTodoText() {
            if (this.selectId != '' && this.afterText != '') {
                this.$emit('changeTodoText', this.afterText, this.selectId);
                this.clearValue();
            }
        },

        checkTodoCheckList(text) {
            return this.todoCheckList.includes(text);
        },

        clearValue() {
            this.todoCheckList = [];
            this.selectId = '';
            this.afterText = '';
        },
    },

    computed: {
        // 親から受け取ったTodoリストを入力された内容でフィルタリングする
        innerTodoList() {
            if (this.todoText) {
                return this.todoList.filter((item) => {
                    return item.todo_text.indexOf(this.todoText) > -1;
                });
            } else {
                return this.todoList;
            }
        },
    },
};
</script>

<style></style>
