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

export default function DialogModal({
  children,
  title,
  open,
  todo,
  setTodo,
  func,
  id,
  text,
}) {
  return (
    <Dialog open={open}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="bold text-[calc(1.25rem+.5vw)]">
            <big>{title}</big>
          </DialogTitle>
        </DialogHeader>
        <Input
          className="font-[poppins]"
          placeholder="Enter the task..."
          defaultValue={text}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") func(todo.trim(), id);
          }}
        />
        <DialogFooter>
          <Button
            className="text-[calc(1rem+.5vw)] mx-auto w-[min(90%,10rem)]"
            onClick={() => func(todo.trim(), id)}
          >
            {id ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
