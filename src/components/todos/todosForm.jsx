import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import useTodo from "../../store";

function TodosForm() {
  const { todos, addTodo } = useTodo((state) => state);
  const [todo, setTodo] = useState("");
  const handleSubmit = (e) => {
    if (!todo.trim()) alert("Enter a task");
    else {
      if (!todos.some((item) => item.text === todo.trim())) {
        addTodo({ id: Date.now(), text: todo, status: false });
      } else alert("Same task already exists");
    }
    setTodo("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="font-[poppins] fixed right-8 bottom-12 lg:right-[calc(7rem+5dvw)] h-[calc(2rem+1vw)] aspect-square text-[calc(1.5rem+.5vw)] whitespace-nowrap p-3 rounded-full">
                +
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add task</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="bold text-[calc(1.5rem+.5vw)]">
            Add Task
          </DialogTitle>
        </DialogHeader>
        <form action="">
          <Input
            placeholder="Enter the task..."
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="text-[calc(1rem+.5vw)] mt-4"
                onClick={(e) => handleSubmit(e)}
              >
                Add
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TodosForm;
