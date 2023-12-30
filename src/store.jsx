import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const todo = (set, get) => ({
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
  // for clear list button
  isTodo: false,
  setIsTodo: () => {
    set((state) => ({ isTodo: state.todos.length > 0 ? true : false }));
  },
  todo: "",
  setTodo: (value) => {
    set(() => ({ todo: value }));
  },
  // Modal control
  isOpen: false,
  setIsOpen: (value) => {
    set(() => ({ isOpen: value }));
  },
  handleTodo: (todo, id) => {
    if (!todo) alert("Enter a task");
    else {
      if (!get().todos.some((item) => item.text === todo)) {
        if (id) {
          get().updateTodo(id, todo);
        } else {
          get().addTodo({ id: Date.now(), text: todo, status: false });
        }
        get().setTodo("");
        get().setIsOpen(false);
      } else alert("Same task already exists");
    }
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
