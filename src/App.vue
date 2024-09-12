<script setup lang="ts">
import { useTodoStore } from './stores/todo'
import { onMounted } from 'vue'
import TodoListVue from './components/TodoList.vue'

const todoStore = useTodoStore()

onMounted(() => {
  todoStore.loadTodos()
})
</script>

<template>
  <div id="app">
    <TodoListVue />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
