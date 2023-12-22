/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useTodo from "../../store";
import DialogModal from "../DialogModal";
import { DialogFooter } from "../ui/dialog";

function TodosForm() {
  const { todos, addTodo, screenWidth, updateScreenWidth } = useTodo(
    (state) => state
  );

  const [todo, setTodo] = useState("");

  const handleResize = () => updateScreenWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    if (screenWidth > 600) e.preventDefault();
    if (!todo.trim()) alert("Enter a task");
    else {
      if (!todos.some((item) => item.text === todo.trim())) {
        addTodo({ id: Date.now(), text: todo, status: false });
        setTodo("");
      } else alert("Same task already exists");
    }
  };

  const [open, setOpen] = useState(false);

  const Content = () => {
    const [todo, setTodo] = useState("");
    const handleSubmit = () => {
      if (!todo.trim()) alert("Enter a task");
      else {
        if (!todos.some((item) => item.text === todo.trim())) {
          addTodo({ id: Date.now(), text: todo, status: false });
          setTodo("");
          setOpen(false);
        } else alert("Same task already exists");
      }
    };
    return (
      <>
        <Input
          className="font-[poppins]"
          placeholder="Enter the task..."
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
        <DialogFooter>
          <Button
            className="text-[calc(1rem+.5vw)] mx-auto w-[min(90%,10rem)]"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </DialogFooter>
      </>
    );
  };

  const inputRef = useRef();
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setTodo("");
    }
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
    <DialogModal title={"Add task"} Content={() => <Content />} open={open}>
      <Button
        onClick={() => setOpen()}
        className="font-[poppins] fixed right-8 bottom-12 text-[calc(2rem+1vw)] rounded-full h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw)]"
      >
        +
      </Button>
    </DialogModal>
  );
}

export default TodosForm;
