import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from ".././ui/tooltip";

export default function ToolTipComp({ children, Content }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <Content />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
