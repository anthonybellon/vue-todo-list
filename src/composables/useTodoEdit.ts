import { ref, watch } from "vue";
import { useTodoStore } from "../stores/todo";

export function useTodoEdit(props: {
  id: number;
  text: string;
  completed: boolean;
}) {
  const todoStore = useTodoStore();
  const isEditing = ref(false);
  const editedText = ref(props.text);

  watch(
    () => props.text,
    (newText) => {
      editedText.value = newText;
    }
  );

  const startEditing = () => {
    isEditing.value = true;
    setTimeout(() => {
      const inputElement = document.getElementById(`edit-todo-${props.id}`);
      if (inputElement instanceof HTMLInputElement) {
        inputElement.focus();
      }
    }, 50);
  };

  const saveEdit = () => {
    if (editedText.value.trim() && editedText.value !== props.text) {
      todoStore.updateTodo({ ...props, text: editedText.value.trim() });
    }
    isEditing.value = false;
  };

  const cancelEdit = () => {
    editedText.value = props.text;
    isEditing.value = false;
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      saveEdit();
    } else if (event.key === "Escape") {
      cancelEdit();
    }
  };

  return {
    isEditing,
    editedText,
    startEditing,
    saveEdit,
    cancelEdit,
    handleKeydown,
  };
}
