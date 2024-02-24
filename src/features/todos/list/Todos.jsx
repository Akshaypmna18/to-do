import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useTodo from "../../../store";
import { CheckBoxEle, EditTodoEle, DeleteTodoEle } from "./TodosEle";

function TodosList() {
  const { todos, toggleTodoStatus, setTodos } = useTodo((state) => state);
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
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
              .sort((a, b) => (a.status === b.status ? 0 : a.status ? 1 : -1))
              .map((todo, pos) => {
                return (
                  <Draggable
                    key={todo.id}
                    draggableId={`${todo.id}`}
                    index={pos}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`flex items-center shadow justify-between text-[calc(1.25rem+.5vw)] p-2 border hover:border-yellow-500 rounded grow max-w-[90dvw] ${
                          todo.status
                            ? "line-through text-gray-500 hover:border-yellow-200"
                            : ""
                        }`}
                      >
                        <CheckBoxEle todo={todo} />
                        <span
                          className="flex-grow text-center mx-8"
                          onClick={() => toggleTodoStatus(todo.id)}
                        >
                          {capitalize(todo.text)}
                        </span>
                        <EditTodoEle todo={todo} />
                        <DeleteTodoEle todo={todo} />
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

export default TodosList;
