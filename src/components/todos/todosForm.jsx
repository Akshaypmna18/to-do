import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useTodo from "../../store";

function TodosForm() {
  const { todos, addTodo } = useTodo((state) => state);
  const [todo, setTodo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) alert("Enter a task");
    else {
      if (!todos.some((item) => item.text === todo.trim())) {
        addTodo({ id: Date.now(), text: todo, status: false });
      } else alert("Same task already exists");
    }
    setTodo("");
  };

  return (
    <form className="flex items-center mt-4 w-[min(95%,30rem)] justify-center">
      <Input
        placeholder="Enter the task..."
        className="font-[poppins]"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        name="task-name"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit(e);
        }}
      />
      <Button
        className="font-[poppins] h-[calc(2rem+1vw)] text-[calc(1rem+.5vw)] whitespace-nowrap px-2"
        onClick={(e) => handleSubmit(e)}
      >
        Add task
      </Button>
    </form>
  );
}

export default TodosForm;
