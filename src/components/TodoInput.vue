<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTodoStore } from "../stores/todo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default defineComponent({
  name: "TodoInput",
  components: {
    Button,
    Input,
  },
  setup() {
    const todoStore = useTodoStore();
    const newTodo = ref("");

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value);
        newTodo.value = "";
      }
    };

    return {
      newTodo,
      addTodo,
    };
  },
});
</script>

<template>
  <div class="flex space-x-2">
    <Input
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="Add a new todo"
      aria-label="New todo input"
      class="flex-grow"
    />
    <Button @click="addTodo" variant="default"> Add </Button>
  </div>
</template>
