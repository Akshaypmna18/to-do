import React from "react";
import Theme from "./components/theme";
import TodosInput from "./components/todos/todosForm";
import TodoClear from "./components/todos/todoClear";
import TodosList from "./components/todos/todosList";

function App() {
  return (
    <section className="min-h-[100dvh] lg:mx-[calc(5rem+5dvw)] bg-white dark:bg-[hsl(222,84,4.9)] relative flex flex-col items-center select-none">
      <Theme />

      <h1 className="text-[calc(1rem+4vw)] mt-[calc(5rem+5vh)] font-[poppins] font-bold">
        Just do it.<span className="animate-pulse">|</span>
      </h1>

      <TodosInput />

      <TodosList />

      <TodoClear />
    </section>
  );
}

export default App;
