/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import useTodo from "../../store";
import DialogModal from "../../components/dialogModal";

function AddTodo() {
  const {
    screenWidth,
    updateScreenWidth,
    handleTodo,
    todo,
    setTodo,
    setIsOpen,
  } = useTodo((state) => state);

  const handleResize = () => updateScreenWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTodo(todo.trim());
  };

  const inputRef = useRef();
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target))
      setTodo("");
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return screenWidth > 600 ? (
    <form className="flex items-center mt-4 w-[min(95%,30rem)] justify-center">
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
  ) : (
    <DialogModal>
      <Button
        onClick={() => setIsOpen(true)}
        className="font-[poppins] fixed right-[calc(2.5rem+1vw)] bottom-[calc(3rem+1vh)] text-[calc(2rem+1vw)] rounded-full h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw)]"
      >
        +
      </Button>
    </DialogModal>
  );
}

export default AddTodo;
