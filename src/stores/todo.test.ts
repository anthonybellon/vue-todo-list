import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { useTodoStore } from "./todo";

describe("Todo Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("adds a todo", () => {
    const store = useTodoStore();
    store.addTodo("Test todo");
    expect(store.todos).toHaveLength(1);
    expect(store.todos[0].text).toBe("Test todo");
  });

  it("updates a todo", () => {
    const store = useTodoStore();
    store.addTodo("Test todo");
    const todo = store.todos[0];
    store.updateTodo({ ...todo, completed: true });
    expect(store.todos[0].completed).toBe(true);
  });

  it("deletes a todo", () => {
    const store = useTodoStore();
    store.addTodo("Test todo");
    const todoId = store.todos[0].id;
    store.deleteTodo(todoId);
    expect(store.todos).toHaveLength(0);
  });

  it("clears completed todos", () => {
    const store = useTodoStore();
    store.addTodo("Todo 1");
    store.addTodo("Todo 2");
    store.updateTodo({ ...store.todos[0], completed: true });
    store.clearCompleted();
    expect(store.todos).toHaveLength(1);
    expect(store.todos[0].text).toBe("Todo 2");
  });

  it("loads todos from localStorage", () => {
    const mockTodos = [{ id: 1, text: "Test todo", completed: false }];
    localStorage.setItem("todos", JSON.stringify(mockTodos));
    const store = useTodoStore();
    store.loadTodos();
    expect(store.todos).toEqual(mockTodos);
  });

  it("saves todos to localStorage", () => {
    const store = useTodoStore();
    store.addTodo("Test todo");
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    expect(savedTodos).toEqual(store.todos);
  });

  it("edits a todo", () => {
    const store = useTodoStore();
    store.addTodo("Test todo");
    const todo = store.todos[0];
    store.updateTodo({ ...todo, text: "Updated todo" });
    expect(store.todos[0].text).toBe("Updated todo");
  });
});
