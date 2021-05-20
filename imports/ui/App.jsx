import React, { useState, Fragment } from "react";
import { Task } from "./Task.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "../db/TaskCollection.js";
import "./css/app.css";
import { TaskForm } from "./TaskForm.jsx";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { checkCB, removeCB } from "./alertCB.js";
console.log("calling from app.jsx");
function toggleChecked({ _id, isChecked }) {
  Meteor.call("task.setIsChecked", _id, !isChecked, checkCB);
}

function deleteTask(task) {
  Meteor.call("task.remove", task._id, removeCB);
}

const hideCheckedData = { isChecked: { $ne: true } };

export const App = () => {
  const [filteredData, setfilteredData] = useState("");
  const [signUp, setSignUp] = useState(false);

  const user = useTracker(() => Meteor.user());

  // console.log(user);
  const { tasks, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [] };
    if (!user) {
      return { ...noDataAvailable, isLoading: false };
    }
    const handler = Meteor.subscribe("task");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const useFilter = user ? { userId: user._id } : {};
    const pendingOnlyFilter = { ...hideCheckedData, ...useFilter };
    const tasks = TaskCollection.find(filteredData ? pendingOnlyFilter : useFilter, {
      sort: { createdAt: -1 },
    }).fetch();
    return { tasks, isLoading: true };
  });

  const logout = () => {
    Meteor.logout();
  };
  // console.log(tasks);

  function renderPage() {
    if (signUp) {
      return <SignUp />;
    } else {
      return <Login />;
    }
  }
  function updateState() {
    setSignUp((prev) => !prev);
  }

  return (
    <div className="noteBook">
      <h1>
        <span>TODO List!</span>
        {user ? (
          <span className="user" onClick={logout}>
            🚪{user.username}
          </span>
        ) : (
          <span className="user" onClick={updateState}>
            🚪{signUp ? "Login" : "SignUp"}
          </span>
        )}
      </h1>
      {user ? (
        <Fragment>
          <TaskForm user={user} />
          <div className="btnContainer">
            <button onClick={() => setfilteredData((prev) => !prev)} className="filterBtn">
              {filteredData ? "Show All" : "Filter By Done"}
            </button>
          </div>
          {/* {!isLoading && <div className="loading">loading...</div>} */}
          <ul>
            {tasks.map((task) => (
              <Task
                key={task._id}
                task={task}
                onDeleteClick={deleteTask}
                onCheckBoxClick={toggleChecked}
              />
            ))}
          </ul>
        </Fragment>
      ) : (
        renderPage()
      )}
    </div>
  );
};
