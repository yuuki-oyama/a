<template>
    <form>
        <div class="todo-func-era">
            <div class="inputs">
                <input class="input_form" type="text" placeholder="タイトル" :value="todoTitle" @input="setTodoTitle" />
                <i class="fa fa-star fa-lg fa-fw" aria-hidden="true"></i>
            </div>
            <div class="inputs">
                <textarea class="input_form" placeholder="詳細" :value="todoDetail" @input="setTodoDetail"></textarea>
                <i class="fa fa-edit fa-lg fa-fw" aria-hidden="true"></i>
            </div>
            <div class="inputs">
                <prioritySelect
                    :id="'priority'"
                    :selectName="'priorityName'"
                    :selectAreaLabel="'優先度を設定してください'"
                    :selectItemList="priorityList"
                    :value="priorityValue"
                    @changeItems="changePriority"
                />
                <i class="fa fa-hourglass fa-lg fa-fw" aria-hidden="true"></i>
            </div>
            <todoFunc
                :addButton="addButton"
                :clearButton="clearButton"
                :deletButton="deletButton"
                :confButton="confButton"
                :isCheckList="todoCheckList.length != 0"
                @clearText="clearText"
                @setTodoList="setTodoList"
                @deletTodo="deletTodo"
            />
        </div>

        <table v-if="todoList.length" class="design02">
            <thead>
                <tr>
                    <th>チェック</th>
                    <th>Todo</th>
                    <th>優先度</th>
                </tr>
            </thead>
            <template v-for="(todoObj, index) in innerTodoList" :key="index">
                <tr>
                    <td>
                        <label class="btn active">
                            <input
                                type="checkbox"
                                :name="todoObj.todo_title"
                                :value="todoObj.id"
                                v-model="todoCheckList"
                            />
                        </label>
                    </td>
                    <td>
                        <template v-if="checkTodoCheckList(todoObj.id)">
                            <span class="size"
                                ><input :id="`todoId-${todoObj.id}`" :value="todoObj.todo_title" @input="setAfterText"
                            /></span>
                            <span class="size">
                                <exeButton
                                    :disabled="errorFlag"
                                    :buttonTitle="confButton"
                                    :onClickFunc="changetodoTitle"
                                />
                            </span>
                        </template>
                        <span v-else class="size">{{ todoObj.todo_title }}</span>
                    </td>
                    <td>
                        <template v-if="checkTodoCheckList(todoObj.id)">
                            <prioritySelect
                                :id="'priority'"
                                :selectName="'priorityName'"
                                :selectAreaLabel="'優先度を設定してください'"
                                :selectItemList="priorityList"
                                :value="todoObj.todo_priority"
                                @changeItems="changePriority"
                            />
                        </template>
                        <span v-else class="size">{{ todoObj.todo_priority }}</span>
                    </td>
                </tr>
            </template>
        </table>
        <div v-else>Todoがありません</div>
    </form>
</template>

<script>
import exeButton from '../common/CommonButton.vue';
import todoFunc from './TodoFunc.vue';
import prioritySelect from '../common/CommonSelect.vue';
export default {
    components: { exeButton, todoFunc, prioritySelect },
    props: {
        todoList: Array,
        addButton: String,
        clearButton: String,
        deletButton: String,
        confButton: String,
        todoTitle: String,
        todoDetail: String,
        priorityList: Array,
        priorityValue: String,
        errorFlag: Boolean,
    },
    emits: [
        'setTodoTitle',
        'setTodoDetail',
        'clearText',
        'deletTodo',
        'changetodoTitle',
        'checkTodoList',
        'setTodoList',
        'changePriority',
    ],
    data() {
        return { todoCheckList: [], afterText: '', selectId: '' };
    },

    methods: {
        setTodoTitle(e) {
            const targetText = e.target.value;
            this.$emit('setTodoTitle', targetText);
        },

        setTodoDetail(e) {
            const targetText = e.target.value;
            this.$emit('setTodoDetail', targetText);
        },

        setTodoList() {
            this.clearValue();
            this.$emit('setTodoList');
        },

        clearText() {
            this.clearValue();
            this.$emit('settodoTitle', '');
        },

        deletTodo() {
            this.$emit('deletTodo', this.todoCheckList);
            this.clearValue();
        },

        setAfterText(e) {
            const targetChangeText = e.target.value;
            this.selectId = e.target.id.split('-')[1];
            this.afterText = targetChangeText;
            this.$emit('checkTodoList', targetChangeText);
        },

        changetodoTitle() {
            if (this.selectId != '' && this.afterText != '') {
                this.$emit('changetodoTitle', this.afterText, this.selectId);
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

        changePriority(value) {
            if (value != '') {
                this.$emit('changePriority', value);
            }
        },
    },

    computed: {
        // 親から受け取ったTodoリストを入力された内容でフィルタリングする
        innerTodoList() {
            if (this.todoTitle) {
                return this.todoList.filter((item) => {
                    return item.todo_title.indexOf(this.todoTitle) > -1;
                });
            } else {
                return this.todoList;
            }
        },
    },
};
</script>

<style></style>
