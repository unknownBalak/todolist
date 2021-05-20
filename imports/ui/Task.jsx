import React from "react";
import "./css/Task.css";
export function Task({ task, onCheckBoxClick, onDeleteClick }) {
  return (
    <li>
      <div>
        <input
          type="checkbox"
          checked={!!task.isChecked}
          onClick={() => onCheckBoxClick(task)}
          className="checkbox"
          readOnly
        />
        <span>{task.text}</span>
      </div>
      <div>
        <button type="submit" onClick={() => onDeleteClick(task)}>
          &times;
        </button>
      </div>
    </li>
  );
}
