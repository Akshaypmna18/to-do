import React from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import DialogModal from "../../../components/dialogModal";
import useTodo from "../../../store";
import ToolTipComp from "../../../components/toolTip";
import {
  TooltipDialogDemo,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../../components/tooltip-dialog-demo";

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
  // const ToolTipContent = () => <p>Update this task</p>;

  // Uncomment this to try tooltip + dialog + demo
  // return <TooltipDialogDemo />

  return (
    <Tooltip>
      <DialogModal id={id} text={text}>
        <TooltipTrigger>
          <Pencil2Icon className="min-h-[1.5rem] min-w-[1.5rem] cursor-pointer hover:text-rose-500" />
        </TooltipTrigger>
      </DialogModal>
      <TooltipContent>
        <p>Update this task</p>
      </TooltipContent>
    </Tooltip>
  );
};
