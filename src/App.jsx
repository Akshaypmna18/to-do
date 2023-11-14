import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Theme from "./theme";
import { Checkbox } from "./ui/checkbox";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function App() {
  // get todos from localstorage
  const getTodo = () => {
    const TODO = JSON.parse(localStorage.getItem("Todo"));
    return TODO || [];
  };
  const [todos, setTodos] = useState(getTodo);
  const [todo, setTodo] = useState("");
  const [isTodo, setIsTodo] = useState(false);

  // capitalizes input
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // add todos
  const addTodo = () => {
    if (!todo) alert("Enter a task");
    else {
      if (!todos.some((item) => item.text === todo))
        setTodos([...todos, { id: Date.now(), text: todo, status: false }]);
      else alert("Same task already exists");
    }
  };

  // update todos
  useEffect(() => {
    if (todos.length > 0) localStorage.setItem("Todo", JSON.stringify(todos));
    setIsTodo(todos.length > 0 ? true : false);
  }, [todos]);

  return (
    <div className="min-h-[100dvh] lg:mx-[calc(5rem+5dvw)] bg-white dark:bg-[hsl(222,84,4.9)] relative flex flex-col items-center select-none">
      <Theme />

      <h1 className="text-[calc(1rem+4vw)] mt-[calc(5rem+5vh)] font-[poppins] font-bold">
        Just do it.<span className="animate-pulse">|</span>
      </h1>

      <div className="flex items-center mt-4 w-[min(95%,30rem)] justify-center">
        <Input
          placeholder="Enter the task..."
          className="font-[poppins]"
          onChange={(e) => setTodo(e.target.value)}
          name="task-name"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
              e.target.value = "";
              setTodo("");
            }
          }}
        />
        <Button
          className="font-[poppins] h-[calc(2rem+1vw)] text-[calc(1rem+.5vw)] whitespace-nowrap px-2"
          onClick={addTodo}
        >
          Add task
        </Button>
      </div>

      <ul className="flex flex-col gap-4 pt-4 pb-8 lg:pt-8">
        {todos.map((item, pos) => {
          const { text } = item;
          return (
            <li
              key={pos}
              className="flex items-center shadow justify-between text-[calc(1rem+.5vw)] p-2 px-4 border rounded"
            >
              <Checkbox className="mr-2 hover:border-green-800 data-[state=checked]:bg-green-800 data-[state=checked]:border-green-800" />
              {capitalize(text)}
              <FontAwesomeIcon
                icon={faTrashCan}
                className="ml-2 cursor-pointer hover:text-red-800"
              />
            </li>
          );
        })}
        <Button
          className={
            isTodo
              ? ` font-[poppins] text-[calc(1rem+.5vw)] px-4 py-5 max-w-[10rem] mx-auto`
              : `hidden`
          }
          onClick={() => {
            localStorage.removeItem("Todo");
            setTodos([]);
          }}
        >
          Clear List
        </Button>
      </ul>
    </div>
  );
}

export default App;
