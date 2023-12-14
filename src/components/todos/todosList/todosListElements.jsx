import React, { useState } from "react";
import { Checkbox } from "../../ui/checkbox";
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
import useTodo from "../../../store";

export const CheckBoxEle = ({ status, id }) => {
  const { toggleTodoStatus } = useTodo((state) => state);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Checkbox
            className={`hover:border-green-800 ml-1 h-6 w-6 ${
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
              <Pencil2Icon className="h-6 w-6 cursor-pointer hover:text-rose-500" />
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
            <p className="bold text-[calc(1.25rem+1vw)]">Update Todo</p>
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TrashIcon
            className={`h-6 w-6 mt-1 ml-4 cursor-pointer ${
              status ? "text-red-800" : "hover:text-red-800"
            }`}
            onClick={() => removeTodo(id)}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete this task</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
