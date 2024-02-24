import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from ".././ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useTodo from "../../store";

export default function DialogModal({ children, defaultTodo }) {
  const {
    handleTodo,
    // create todo
    todo,
    setTodo,
    isOpen,
    setIsOpen,
    // update todo
    selectedTodo,
    setSelectedTodo,
  } = useTodo((state) => state);
  const open = defaultTodo ? defaultTodo.id === selectedTodo?.id : isOpen;
  const handleOpenChange = (nextOpen) => {
    if (defaultTodo) {
      setSelectedTodo(nextOpen ? defaultTodo : null);
      setTodo(nextOpen ? defaultTodo.text : "");
      return;
    }

    setIsOpen(nextOpen);
    setTodo(nextOpen ? todo : "");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="bold text-[calc(1.25rem+.5vw)]">
            <big>{selectedTodo?.id ? "Update Task" : "Add Task"}</big>
          </DialogTitle>
        </DialogHeader>
        <Input
          className="font-[poppins]"
          placeholder="Enter the task..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTodo(todo.trim(), selectedTodo?.id);
          }}
        />
        <DialogFooter>
          <Button
            className="text-[calc(1rem+.5vw)] mx-auto w-[min(90%,10rem)]"
            onClick={() => handleTodo(todo.trim(), selectedTodo?.id)}
          >
            {selectedTodo?.id ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
