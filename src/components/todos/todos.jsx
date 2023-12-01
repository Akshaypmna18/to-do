import React from "react";
import { Checkbox } from "../ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Todos({ todos, updateTodoStatus, capitalize, deleteTodo, setTodos }) {
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    const reorderdTodos = [...todos];
    const sourceIndex = source.index,
      destinationIndex = destination.index;
    const [removedTodo] = reorderdTodos.splice(sourceIndex, 1);
    reorderdTodos.splice(destinationIndex, 0, removedTodo);
    console.log(sourceIndex);
    console.log(destinationIndex);
    console.log(removedTodo);
    console.log(reorderdTodos);
    return setTodos(reorderdTodos);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="to-do-list">
        {(provided) => (
          <ul
            className="flex flex-col gap-4 pt-4 pb-8 lg:pt-8"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos
              .filter((item) => item !== null)
              .sort((a, b) => (a.status === b.status ? 0 : a.status ? 1 : -1))
              .map((item, pos) => {
                const { text, id, status } = item;
                return (
                  <Draggable key={id} draggableId={`${id}`} index={pos}>
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`flex items-center shadow justify-between text-[calc(1rem+.5vw)] p-2 px-4 border hover:border-yellow-500 rounded ${
                          status
                            ? "line-through text-gray-500 hover:border-yellow-200"
                            : ""
                        }`}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Checkbox
                                className={`mr-2 hover:border-green-800  ${
                                  status ? "border-green-800" : ""
                                }`}
                                checked={status}
                                onCheckedChange={() => updateTodoStatus(id)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{status ? `Uncheck` : `Check`}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <span
                          className="flex-grow text-center"
                          onClick={() => updateTodoStatus(id)}
                        >
                          {capitalize(text)}
                        </span>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className={
                                      status
                                        ? `ml-2 cursor-pointer text-red-800`
                                        : `ml-2 cursor-pointer hover:text-red-800`
                                    }
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete this task</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your task from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-800 text-white sm:bg-primary sm:text-secondary hover:bg-red-800 hover:text-white"
                                onClick={() => deleteTodo(id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </li>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Todos;
