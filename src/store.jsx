import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const todo = (set) => ({
  todos: [],
  addTodo: (todo) => {
    set((state) => ({ todos: [...state.todos, todo] }));
  },
  removeTodo: (todoId) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    }));
  },
  toggleTodoStatus: (todoId) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, status: !todo.status } : todo
      ),
    }));
  },
  setTodos: (todo) => {
    set(() => ({ todos: todo }));
  },
  updateTodo: (todoId, todoText) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, text: todoText } : todo
      ),
    }));
  },
  screenWidth: window.innerWidth,
  updateScreenWidth: (width) => {
    set(() => ({ screenWidth: width }));
  },
});

const useTodo = create(
  devtools(
    persist(todo, {
      name: "todos",
    })
  )
);

export default useTodo;
