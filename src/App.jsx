import React from "react";
import Theme from "./components/Theme";
import TodosForm from "./components/todos/TodosForm";
import TodoClear from "./components/todos/TodoClear";
import TodosList from "./components/todos/todosList/TodosList";
import AlertDialogModal from "./components/AlertDialogModal";
import {
  AlertDialogFooter,
  AlertDialogAction,
} from "./components/ui/alert-dialog";

function App() {
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
    <main className="min-h-[100svh] lg:mx-[calc(5rem+5dvw)] bg-white dark:bg-[hsl(222,84,4.9)] relative flex flex-col items-center select-none">
      <AlertDialogModal
        Content={() => <Content />}
        title={"Tip"}
        Desc={() => <Desc />}
      >
        <p className="text-[calc(1rem+1vw)] cursor-pointer w-[calc(1.5rem+1vw)] h-[calc(1.5rem+1vw)] border rounded-full absolute top-12 right-[calc(4rem+3vw)] flex items-center justify-center font-semibold">
          <span>i</span>
        </p>
      </AlertDialogModal>
      <Theme />

      <h1 className="text-[calc(3rem+2.5vw)] mt-[calc(5rem+5vh)] font-[poppins] font-bold text-center px-4">
        Just do it.<span className="animate-pulse">|</span>
      </h1>

      <TodosForm />

      <TodosList />

      <TodoClear />
    </main>
  );
}

export default App;
