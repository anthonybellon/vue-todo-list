<script lang="ts">
import { defineComponent } from "vue";
import { useTodoStore } from "../stores/todo";
import TodoItem from "./TodoItem.vue";
import TodoInput from "./TodoInput.vue";
import { Button } from "./ui/button";

export default defineComponent({
  name: "TodoList",
  components: {
    TodoItem,
    TodoInput,
    Button,
  },
  setup() {
    const todoStore = useTodoStore();

    return {
      todoStore,
    };
  },
});
</script>

<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6 text-card-foreground">Todo List</h1>
    <TodoInput class="mb-6" />
    <ul aria-label="Todo list" class="space-y-3 mb-6">
      <TodoItem v-for="todo in todoStore.todos" :key="todo.id" v-bind="todo" />
    </ul>
    <Button
      @click="todoStore.clearCompleted"
      variant="destructive"
      class="w-full"
    >
      Clear Completed
    </Button>
  </div>
</template>
