import AddTodo from "../../features/todos/addTodo";
import ClearAllTodos from "../../features/todos/ClearAllTodos";
import Todos from "../../features/todos/list/Todos";
import Theme from "../../features/Theme";
import Tip from "../../features/Tip";

function Todo() {
  return (
    <main className="min-h-[100svh] lg:mx-[calc(5rem+5dvw)] relative flex flex-col items-center select-none">
      <Theme />
      <Tip />

      <h1 className="text-[calc(3rem+2.5vw)] mt-[calc(5rem+5vh)] font-[poppins] font-bold text-center px-4">
        Just do it.<span className="animate-pulse">|</span>
      </h1>

      <AddTodo />

      <Todos />

      <ClearAllTodos />
    </main>
  );
}

export default Todo;
