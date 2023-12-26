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
  updateTodo: (todoId, todoText) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, text: todoText } : todo
      ),
    }));
  },
  toggleTodoStatus: (todoId) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, status: !todo.status } : todo
      ),
    }));
  },
  // to update todos
  setTodos: (todo) => {
    set(() => ({ todos: todo }));
  },
  //to update add todo method
  screenWidth: window.innerWidth,
  updateScreenWidth: (width) => {
    set(() => ({ screenWidth: width }));
  },
  // components
  isOpen: false,
  setIsOpen: (value) => {
    set(() => ({ isOpen: value }));
  },
  // for clear list button
  isTodo: false,
  setIsTodo: () => {
    set((state) => ({ isTodo: state.todos.length > 0 ? true : false }));
  },
  // for individual todo
  // todo: "",
  // setTodo: (value) => ({ todo: value }),
});

const useTodo = create(
  devtools(
    persist(todo, {
      name: "todos",
    })
  )
);

export default useTodo;
