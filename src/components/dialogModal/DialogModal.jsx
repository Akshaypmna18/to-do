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

export default function DialogModal({ children, id, text }) {
  const { handleTodo, todo, setTodo, isOpen, setIsOpen } = useTodo(
    (state) => state
  );
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen()}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="bold text-[calc(1.25rem+.5vw)]">
            <big>{id ? "Update Task" : "Add Task"}</big>
          </DialogTitle>
        </DialogHeader>
        <Input
          className="font-[poppins]"
          placeholder="Enter the task..."
          defaultValue={text}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTodo(todo.trim(), id);
          }}
        />
        <DialogFooter>
          <Button
            className="text-[calc(1rem+.5vw)] mx-auto w-[min(90%,10rem)]"
            onClick={() => handleTodo(todo.trim(), id)}
          >
            {id ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
