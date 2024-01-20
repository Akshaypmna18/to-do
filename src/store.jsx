import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const todo = (set, get) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),

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
  // to update todos after drag and drop
  setTodos: (todos) => set({ todos }),
  // for clear list button
  isTodo: false,
  setIsTodo: () => {
    set((state) => ({ isTodo: state.todos.length > 0 ? true : false }));
  },
  todo: "",
  setTodo: (todo) => set({ todo }),
  // Modal control
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
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
    persist(
      todo,
      {
        name: "todos",
      },
      { name: "theme" }
    )
  )
);

export default useTodo;
