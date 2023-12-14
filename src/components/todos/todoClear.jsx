import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import useTodo from "../../store";

function TodoClear() {
  const { todos, setTodos } = useTodo((state) => state);
  const [isTodo, setIsTodo] = useState(false);
  useEffect(() => {
    todos.length > 0 ? setIsTodo(true) : setIsTodo(false);
  }, [todos]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={
            isTodo
              ? ` font-[poppins] text-[calc(1rem+.5vw)] px-2 max-w-[10rem] mx-auto mb-8`
              : `hidden`
          }
        >
          Clear List
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all of
            your tasks from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-800 text-white sm:bg-primary sm:text-secondary hover:bg-red-800 hover:text-white"
            onClick={() => {
              setTodos([]);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default TodoClear;
