<script setup lang="ts">
import { computed } from "vue";
import { useTodoStore } from "../stores/todo";
import TodoItem from "./TodoItem.vue";
import TodoInput from "./TodoInput.vue";
import { Button } from "./ui/button";

const todoStore = useTodoStore();

const hasCompletedTodos = computed(() => {
  return todoStore.todos.some((todo) => todo.completed);
});
</script>

<template>
  <div
    class="bg-card rounded-lg shadow-lg p-4 sm:p-6 min-h-[400px] flex flex-col"
  >
    <h1
      class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-card-foreground font-mono"
    >
      Todo List
    </h1>
    <TodoInput class="mb-4 sm:mb-6" />
    <div class="flex-grow overflow-y-auto mb-4 max-h-[300px]">
      <ul
        v-if="todoStore.todos.length"
        aria-label="Todo list"
        class="space-y-2 sm:space-y-3"
      >
        <TodoItem
          v-for="todo in todoStore.todos"
          :key="todo.id"
          v-bind="todo"
        />
      </ul>
      <p v-else class="text-muted-foreground text-center py-4">
        No todos yet. Add one above!
      </p>
    </div>
    <div v-if="hasCompletedTodos" class="border-t pt-4">
      <Button
        @click="todoStore.clearCompleted"
        variant="outline"
        size="sm"
        class="w-full"
      >
        Clear Completed
      </Button>
    </div>
  </div>
</template>
