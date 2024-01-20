/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import useTodo from "../../../store";
import DialogModal from "../../../components/dialogModal";

function AddTodo({ inputRef }) {
  const { handleTodo, todo, setTodo } = useTodo((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTodo(todo.trim());
  };

  return (
    <>
      <form className="hidden sm:flex items-center mt-4 w-[min(95%,30rem)] justify-center">
        <Input
          placeholder="Enter the task..."
          className="font-[poppins]"
          onChange={(e) => setTodo(e.target.value)}
          ref={inputRef}
          value={todo}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
        />
        <Button
          className="font-[poppins] h-[calc(2rem+1vw)] text-[calc(1rem+.5vw)] whitespace-nowrap px-2"
          onClick={(e) => handleSubmit(e)}
        >
          Add task
        </Button>
      </form>
      <DialogModal>
        <Button className="sm:hidden font-[poppins] fixed right-[calc(2.5rem+1vw)] bottom-[calc(3rem+1vh)] text-[calc(2rem+1vw)] rounded-full h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw)]">
          +
        </Button>
      </DialogModal>
    </>
  );
}

export default AddTodo;
