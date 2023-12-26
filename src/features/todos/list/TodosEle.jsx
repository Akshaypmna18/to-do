import React, { useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { DialogFooter } from "../../../components/ui/dialog";
import DialogModal from "../../../components/DialogModal";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import useTodo from "../../../store";
import ToolTipComp from "../../../components/ToolTip";

export const CheckBoxEle = ({ status, id }) => {
  const { toggleTodoStatus } = useTodo((state) => state);
  const Content = () => <p>{status ? `Uncheck` : `Check`}</p>;
  return (
    <ToolTipComp Content={() => <Content />}>
      <Checkbox
        className={`hover:border-green-800 ml-1 min-h-[1.5rem] min-w-[1.5rem] ${
          status ? "border-green-800" : ""
        }`}
        checked={status}
        onCheckedChange={() => toggleTodoStatus(id)}
      />
    </ToolTipComp>
  );
};

export const DeleteTodoEle = ({ status, id }) => {
  const { removeTodo } = useTodo((state) => state);
  const Content = () => <p>Delete this task</p>;
  return (
    <ToolTipComp Content={() => <Content />}>
      <TrashIcon
        className={`min-h-[1.5rem] min-w-[1.5rem] mt-1 ml-4 cursor-pointer ${
          status ? "text-red-800" : "hover:text-red-800"
        }`}
        onClick={() => removeTodo(id)}
      />
    </ToolTipComp>
  );
};

export const EditTodoEle = ({ id, text }) => {
  const { updateTodo, todos } = useTodo((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const Content = () => {
    const [todo, setTodo] = useState(text);
    const handleUpdate = (id, todo) => {
      if (!todo.trim()) alert("Enter a task");
      else {
        if (!todos.some((item) => item.text === todo.trim())) {
          updateTodo(id, todo);
          setIsOpen(false);
        } else alert("Same task already exists");
      }
    };
    return (
      <>
        <Input
          className="font-[poppins]"
          defaultValue={text}
          onChange={(e) => setTodo(e.target.value)}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              handleUpdate(id, todo);
            }}
            className="text-[calc(1rem+.5vw)] mx-auto w-[min(90%,10rem)]"
          >
            Update
          </Button>
        </DialogFooter>
      </>
    );
  };

  const ToolTipContent = () => <p>Update this task</p>;
  return (
    <DialogModal
      open={isOpen}
      title={"Update todo"}
      Content={() => <Content />}
    >
      <ToolTipComp Content={() => <ToolTipContent />}>
        <Pencil2Icon
          onClick={() => setIsOpen()}
          className="min-h-[1.5rem] min-w-[1.5rem] cursor-pointer hover:text-rose-500"
        />
      </ToolTipComp>
    </DialogModal>
  );
};
