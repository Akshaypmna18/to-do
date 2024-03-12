import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import useTodo from "../../../store";
import DialogModal from "../../../components/dialogModal";
import { useRef, useEffect } from "react";

function AddTodo() {
  const handleTodo = useTodo((state) => state.handleTodo);

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTodo(inputRef.current.value.trim());
    inputRef.current.value = "";
  };

  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      typeof inputRef.current.contains === "function" &&
      !inputRef.current.contains(event.target)
    )
      inputRef.current.value = "";
  };

  useEffect(() => {
    const handleDocumentClick = (event) => handleClickOutside(event);
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [inputRef]);

  return (
    <>
      <form className="hidden sm:flex items-center mt-4 w-[min(95%,30rem)] justify-center">
        <Input
          placeholder="Enter the task..."
          className="font-[poppins]"
          ref={inputRef}
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
