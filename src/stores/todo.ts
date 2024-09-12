import { defineStore } from "pinia";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    addTodo(text: string) {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
      };
      this.todos.push(newTodo);
      this.saveTodos();
    },
    updateTodo(todo: Todo) {
      const index = this.todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) {
        this.todos[index] = { ...this.todos[index], ...todo };
        this.saveTodos();
      }
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveTodos();
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
      this.saveTodos();
    },
    loadTodos() {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    },
    saveTodos() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
});
