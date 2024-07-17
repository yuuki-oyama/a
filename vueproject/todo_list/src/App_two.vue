<template>
  <div>
    <h2>ToDoリスト</h2>
    <input type="text" v-model="newTask">
    <button @click="addTodo">追加</button>
    <TodoList2 
    :todoList="todoList"
    :deleteList="deleteList"
    @achievement="achievement"
    @deleteTodo="deleteTodo">
    </TodoList2>
  </div>
</template>

<script>
import TodoList2 from './components/main/TodoList2.vue';

export default {
  components: {
    TodoList2
  },
  data() {
    return {
      newTask: '',
      todoList: [],
      deleteList: []
    };
  },
  methods: {
    addTodo() {
        this.todoList.push(this.newTask);
        this.newTask = '';
      },
    achievement(index) {
      this.deleteList.push(this.todoList[index]);
      this.todoList.splice(index, 1);
    },
    deleteTodo(index) {
      this.deleteList.splice(index, 1);
    }
  }
};
</script>

<style scoped>

</style>