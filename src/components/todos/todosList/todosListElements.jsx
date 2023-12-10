import React, { useState } from "react";
import { Checkbox } from "../../ui/checkbox";
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
} from "../../ui/alert-dialog";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import useTodo from "../../../states";

export const CheckBoxEle = ({ status, id }) => {
  const { toggleTodoStatus } = useTodo((state) => state);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Checkbox
            className={`mr-2 hover:border-green-800  ${
              status ? "border-green-800" : ""
            }`}
            checked={status}
            onCheckedChange={() => toggleTodoStatus(id)}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{status ? `Uncheck` : `Check`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const EditTodoEle = ({ id, text }) => {
  const [todo, setTodo] = useState(text);
  const { updateTodo, todos } = useTodo((state) => state);
  const handleUpdate = (id, todo) => {
    if (!todos.some((item) => item.text === todo.trim())) updateTodo(id, todo);
    else alert("Same task already exists");
  };
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Pencil2Icon className="h-[calc(.8rem+1vw)] w-[calc(.8rem+1vw)] ml-1 cursor-pointer hover:text-rose-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Update this task</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            <p className="bold text-[calc(1.25rem+.5vw)]">Update Todo</p>
          </DialogTitle>
        </DialogHeader>
        <Input defaultValue={text} onChange={(e) => setTodo(e.target.value)} />
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => handleUpdate(id, todo)}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteTodoEle = ({ status, id }) => {
  const { removeTodo } = useTodo((state) => state);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TrashIcon
                className={`h-[calc(1rem+1vw)] w-[calc(1rem+1vw)] mt-1 ml-1 cursor-pointer ${
                  status ? "text-red-800" : "hover:text-red-800"
                }`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete this task</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-800 text-white sm:bg-primary sm:text-secondary hover:bg-red-800 hover:text-white"
            onClick={() => removeTodo(id)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
