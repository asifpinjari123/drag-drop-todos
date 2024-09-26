import React from "react";
import { useDrag, useDrop } from "react-dnd";
const ItemType = "CARD";
const DraggableCard = ({ todo, index, moveCard }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Use the drop hook to handle drop functionality
  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      const draggedIndex = draggedItem.index;
      if (draggedIndex !== index) {
        moveCard(draggedIndex, index);
        draggedItem.index = index;
      }
    },
  });

  const combinedRef = (node) => {
    dragRef(dropRef(node));
  };

  return (
    <div
      ref={combinedRef}
      className="card"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
    >
      <p>
        <strong>#{index + 1}:</strong> {todo.title}
      </p>
    </div>
  );
};

// TodoList component to render the list of draggable cards
const TodoList = ({ todos, moveCard }) => {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <DraggableCard
          key={todo.id}
          index={index}
          todo={todo}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

export default TodoList;
