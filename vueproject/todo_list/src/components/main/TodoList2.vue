<template>
  <div>
    <div>
      <input type="radio" name="radio" value="option1" v-model="selectedOption">やること
      <input type="radio" name="radio" value="option2" v-model="selectedOption">完了
    </div>
    <ul v-if="selectedOption === 'option1'">
      <li v-for="(task, index) in todoList" :key="index">{{ task }}
        <button @click="achievement(index)">完了</button>
      </li> 
    </ul>
    <ul v-if="selectedOption === 'option2'">
      <li v-for="(task, index) in deleteList" :key="index">{{ task }}
        <button @click="deleteTodo(index)">削除</button>
      </li> 
    </ul>
  </div>
</template>
<script>
export default {
  emits: [
      'achievement',
      'deleteTodo'
  ],
  data() {
    return {
      selectedOption: 'option1'
    };
  },
  props: {
    todoList: Array,
    deleteList: Array
  },
  methods: {
    achievement(index) {
        this.$emit('achievement', index);
      },
    deleteTodo(index) {
      this.$emit('deleteTodo', index);
    }
  }
};
</script>

<style scoped>

</style>