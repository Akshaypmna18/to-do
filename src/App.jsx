import { useEffect, useState } from "react";
import Theme from "./components/theme";
import TodosInput from "./components/todos/todosInput";
import TodoClear from "./components/todos/todoClear";
import Todos from "./components/todos/todos";

function App() {
  // get todos from localstorage
  const getTodo = () => {
    const TODO = JSON.parse(localStorage.getItem("Todos"));
    return TODO || [];
  };
  const [todos, setTodos] = useState(getTodo);
  const [todo, setTodo] = useState("");
  const [isTodo, setIsTodo] = useState(false);

  // capitalizes input
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // add todos
  const addTodo = () => {
    if (!todo.trim()) alert("Enter a task");
    else {
      if (!todos.some((item) => item.text === todo.trim())) {
        setTodos([...todos, { id: Date.now(), text: todo, status: false }]);
        setTodo("");
      } else alert("Same task already exists");
    }
  };

  // delete todo
  const deleteTodo = (id) => {
    let updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  // update todo status
  const updateTodoStatus = (id) => {
    let updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setTodos(updatedTodos);
  };

  // update todos
  useEffect(() => {
    if (todos) localStorage.setItem("Todos", JSON.stringify(todos));
    setIsTodo(todos.length > 0 ? true : false);
  }, [todos]);

  return (
    <section className="min-h-[100dvh] lg:mx-[calc(5rem+5dvw)] bg-white dark:bg-[hsl(222,84,4.9)] relative flex flex-col items-center select-none">
      <Theme />

      <h1 className="text-[calc(1rem+4vw)] mt-[calc(5rem+5vh)] font-[poppins] font-bold">
        Just do it.<span className="animate-pulse">|</span>
      </h1>

      <TodosInput todo={todo} setTodo={setTodo} addTodo={addTodo} />

      <Todos
        todos={todos}
        updateTodoStatus={updateTodoStatus}
        capitalize={capitalize}
        deleteTodo={deleteTodo}
        setTodos={setTodos}
      />

      <TodoClear isTodo={isTodo} setTodo={setTodo} setTodos={setTodos} />
    </section>
  );
}

export default App;
