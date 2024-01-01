import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ".././ui/dialog";

export default function DialogModal({ children, title, Content, open }) {
  return (
    <Dialog open={open}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="bold text-[calc(1.25rem+.5vw)]">
            <big>{title}</big>
          </DialogTitle>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
}
