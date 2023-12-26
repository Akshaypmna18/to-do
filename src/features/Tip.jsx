import React from "react";
import AlertDialogModal from "../components/AlertDialogModal";
import {
  AlertDialogFooter,
  AlertDialogAction,
} from "../components/ui/alert-dialog";

function Tip() {
  const Content = () => (
    <AlertDialogFooter>
      <AlertDialogAction>Okay</AlertDialogAction>
    </AlertDialogFooter>
  );

  const Desc = () => (
    <>
      You can <strong>prioritize</strong> tasks through
      <strong> drag and drop</strong>
    </>
  );

  return (
    <AlertDialogModal
      Content={() => <Content />}
      title={"Tip"}
      Desc={() => <Desc />}
    >
      <p className="text-[calc(1rem+1vw)] cursor-pointer w-[calc(1.5rem+1vw)] h-[calc(1.5rem+1vw)] border rounded-full absolute top-12 right-[calc(4rem+3vw)] flex items-center justify-center font-semibold">
        <span>i</span>
      </p>
    </AlertDialogModal>
  );
}

export default Tip;
