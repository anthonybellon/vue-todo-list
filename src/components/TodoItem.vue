<script lang="ts">
import { defineComponent } from "vue";
import { useTodoStore } from "../stores/todo";
import { Checkbox } from "./ui/checkbox";

export default defineComponent({
  name: "TodoItem",
  components: {
    Checkbox,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const todoStore = useTodoStore();

    const toggleComplete = () => {
      todoStore.updateTodo({ ...props, completed: !props.completed });
    };

    return {
      toggleComplete,
    };
  },
});
</script>

<template>
  <li class="flex items-center space-x-3 p-3 bg-accent rounded-md">
    <Checkbox
      :checked="completed"
      @update:checked="toggleComplete"
      :aria-label="`Mark ${text} as ${completed ? 'incomplete' : 'complete'}`"
    />
    <span
      :class="{
        'line-through text-muted-foreground': completed,
        'text-accent-foreground': !completed,
      }"
      class="flex-grow"
    >
      {{ text }}
    </span>
  </li>
</template>
