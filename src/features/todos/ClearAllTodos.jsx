import React, { useEffect } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import useTodo from "../../store";
import AlertDialogModal from "../../components/alertDialogModal";

function ClearAllTodos() {
  const { todos, setTodos, isTodo, setIsTodo } = useTodo((state) => state);

  useEffect(() => {
    setIsTodo();
  }, [todos]);

  const Content = () => (
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
  );

  const Desc = () => (
    <>
      This action cannot be undone. This will permanently delete all of your
      tasks from our servers.
    </>
  );

  return isTodo ? (
    <AlertDialogModal
      Content={() => <Content />}
      title={"Are you absolutely sure?"}
      Desc={() => <Desc />}
    >
      <Button className="font-[poppins] text-[calc(1rem+.5vw)] px-2 max-w-[10rem] mx-auto mb-8">
        Clear List
      </Button>
    </AlertDialogModal>
  ) : null;
}

export default ClearAllTodos;
