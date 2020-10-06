import React from "react";

export default function TodoListItem({
  todo,
  onRemovePressed,
  onCompletePressed,
}) {
  return (
    <div className="todo-item-container">
      <h3>{todo.text}</h3>
      <div className="button-container">
        {todo.isCompleted ? null : (
          <button
            className="completed-button"
            onClick={() => onCompletePressed(todo.id)}
          >
            Mark as completed
          </button>
        )}
        <button
          className="remove-button"
          onClick={() => onRemovePressed(todo.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
