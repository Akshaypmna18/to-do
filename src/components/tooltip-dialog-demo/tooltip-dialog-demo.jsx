import { forwardRef } from "react";
import * as TooltipShadcn from "../ui/tooltip";
import * as DialogShadcn from "../ui/dialog";
import * as InputShadcn from "../ui/input";
import * as ButtonShadcn from "../ui/button";
import * as LabelShadcn from "../ui/label";

export const Tooltip = forwardRef((props, ref) => {
  return (
    <TooltipShadcn.TooltipProvider>
      <TooltipShadcn.Tooltip ref={ref} {...props} />
    </TooltipShadcn.TooltipProvider>
  );
});

export const TooltipTrigger = forwardRef((props, ref) => {
  return <TooltipShadcn.TooltipTrigger ref={ref} {...props} asChild />;
});

export const TooltipContent = forwardRef((props, ref) => {
  return <TooltipShadcn.TooltipContent ref={ref} {...props} />;
});

export function TooltipDialogDemo() {
  return (
    <Tooltip>
      <DialogShadcn.Dialog>
        <DialogShadcn.DialogTrigger asChild>
          <TooltipTrigger>
            <ButtonShadcn.Button variant="outline">
              Edit Profile
            </ButtonShadcn.Button>
          </TooltipTrigger>
        </DialogShadcn.DialogTrigger>
        <DialogShadcn.DialogContent className="sm:max-w-[425px]">
          <DialogShadcn.DialogHeader>
            <DialogShadcn.DialogTitle>Edit profile</DialogShadcn.DialogTitle>
            <DialogShadcn.DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogShadcn.DialogDescription>
          </DialogShadcn.DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <LabelShadcn.Label htmlFor="name" className="text-right">
                Name
              </LabelShadcn.Label>
              <InputShadcn.Input
                id="name"
                value="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <LabelShadcn.Label htmlFor="username" className="text-right">
                Username
              </LabelShadcn.Label>
              <InputShadcn.Input
                id="username"
                value="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogShadcn.DialogFooter>
            <ButtonShadcn.Button type="submit">
              Save changes
            </ButtonShadcn.Button>
          </DialogShadcn.DialogFooter>
        </DialogShadcn.DialogContent>
      </DialogShadcn.Dialog>
      <TooltipContent>Just a random tooltip</TooltipContent>
    </Tooltip>
  );
}
