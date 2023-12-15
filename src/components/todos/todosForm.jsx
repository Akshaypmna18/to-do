import React, { useEffect, useState } from "react";
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
  const { todos, addTodo, screenWidth, updateScreenWidth } = useTodo(
    (state) => state
  );
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    if (screenWidth > 600) e.preventDefault();
    if (!todo.trim()) alert("Enter a task");
    else {
      if (!todos.some((item) => item.text === todo.trim())) {
        addTodo({ id: Date.now(), text: todo, status: false });
      } else alert("Same task already exists");
    }
    setTodo("");
  };

  const handleResize = () => updateScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth > 600 ? (
    <form className="flex items-center mt-4 w-[min(95%,30rem)] justify-center">
      <Input
        placeholder="Enter the task..."
        className="font-[poppins]"
        onChange={(e) => setTodo(e.target.value)}
        autoFocus
        value={todo}
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
  ) : (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="font-[poppins] fixed right-8 bottom-12 text-[calc(2rem+1vw)] rounded-full h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw)]">
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
              className="text-[calc(1rem+.5vw)] mx-auto w-[min(90%,10rem)]"
              onClick={(e) => handleSubmit(e)}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TodosForm;
