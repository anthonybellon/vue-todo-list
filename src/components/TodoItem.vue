<script lang="ts">
import { defineComponent } from "vue";
import { useTodoEdit } from "../composables/useTodoEdit";
import { useTodoStore } from "../stores/todo";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Edit2, Save, X } from "lucide-vue-next";

export default defineComponent({
  name: "TodoItem",
  components: {
    Checkbox,
    Input,
    Button,
    Edit2,
    Save,
    X,
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
    const {
      isEditing,
      editedText,
      startEditing,
      saveEdit,
      cancelEdit,
      handleKeydown,
    } = useTodoEdit(props);

    const toggleComplete = () => {
      todoStore.updateTodo({ ...props, completed: !props.completed });
    };

    return {
      isEditing,
      editedText,
      startEditing,
      saveEdit,
      cancelEdit,
      handleKeydown,
      toggleComplete,
    };
  },
});
</script>

<template>
  <li
    class="flex items-center space-x-3 p-3 bg-accent rounded-md group hover:bg-accent/80 transition-colors"
  >
    <Checkbox
      :checked="completed"
      @update:checked="toggleComplete"
      :aria-label="`Mark ${text} as ${completed ? 'incomplete' : 'complete'}`"
    />
    <div class="flex-grow flex items-center space-x-2">
      <template v-if="!isEditing">
        <span
          :class="{
            'line-through text-muted-foreground': completed,
            'text-accent-foreground': !completed,
          }"
          class="flex-grow"
        >
          {{ text }}
        </span>
        <Button
          @click="startEditing"
          variant="ghost"
          size="icon"
          class="opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Edit todo"
        >
          <Edit2 class="h-4 w-4" />
        </Button>
      </template>
      <template v-else>
        <Input
          v-model="editedText"
          :id="`edit-todo-${id}`"
          class="flex-grow"
          @keydown="handleKeydown"
        />
        <Button
          @click="saveEdit"
          variant="ghost"
          size="icon"
          aria-label="Save changes"
        >
          <Save class="h-4 w-4" />
        </Button>
        <Button
          @click="cancelEdit"
          variant="ghost"
          size="icon"
          aria-label="Cancel editing"
        >
          <X class="h-4 w-4" />
        </Button>
      </template>
    </div>
  </li>
</template>
