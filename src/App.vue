<script setup lang="ts">
import { useTodoStore } from "./stores/todo";
import { onMounted } from "vue";
import TodoListVue from "./components/TodoList.vue";

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.loadTodos();
});
</script>

<template>
  <div
    id="app"
    class="min-h-screen flex items-center justify-center bg-background p-4"
  >
    <TodoListVue class="w-full max-w-md" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
