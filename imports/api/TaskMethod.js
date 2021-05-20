import { check } from "meteor/check";
import { TaskCollection } from "../db/TaskCollection.js";
Meteor.methods({
  "task.insert"(text) {
    check(text, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    // console.log(this.userId);
    return TaskCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },
  "task.remove"(taskId) {
    check(taskId, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    const task = TaskCollection.find({ _id: taskId, userId: this.userId });
    if (!task) throw new Meteor.Error("Access Denied!!");

    return TaskCollection.remove(taskId);
  },
  "task.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    const task = TaskCollection.find({ _id: taskId, userId: this.userId });
    if (!task) throw new Meteor.Error("Access Denied!!");
    return TaskCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
