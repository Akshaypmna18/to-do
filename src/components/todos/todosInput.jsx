import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function TodosInput({ todo, setTodo, addTodo }) {
  return (
    <div className="flex items-center mt-4 w-[min(95%,30rem)] justify-center">
      <Input
        placeholder="Enter the task..."
        className="font-[poppins]"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        name="task-name"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo();
        }}
      />
      <Button
        className="font-[poppins] h-[calc(2rem+1vw)] text-[calc(1rem+.5vw)] whitespace-nowrap px-2"
        onClick={addTodo}
      >
        Add task
      </Button>
    </div>
  );
}

export default TodosInput;
