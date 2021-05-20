import React, { useState } from "react";
import { insertCB } from "./alertCB.js";
import { Meteor } from "meteor/meteor";
import "./css/taskForm.css";

function updateTodoList(text) {
  if (!text) return;
  Meteor.call("task.insert", text, insertCB);
}

function alertError() {
  return alert("Plese Insert Task List!");
}

export function TaskForm({ user }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) {
      return alertError();
    }
    updateTodoList(text, user._id);
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="taskForm">
      <input
        type="text"
        required
        aria-required
        placeholder="Type to add new tasks"
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
