import { Meteor } from "meteor/meteor";
import { TaskCollection } from "/imports/db/TaskCollection.js";

function publishTasks() {
  // console.log("Task is being published for current user!!");
  return TaskCollection.find({ userId: this.userId });
}

Meteor.publish("task", publishTasks);
