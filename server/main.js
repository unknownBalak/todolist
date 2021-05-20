import { Meteor } from "meteor/meteor";
import { TaskCollection } from "/imports/db/TaskCollection.js";
import "/imports/api/taskPublication.js";
import "/imports/api/TaskMethod.js";
import "/imports/api/findUserMethod.js";

const insertTask = (taskText, user) => {
  TaskCollection.insert({ text: taskText, userId: user._id });
};

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);
  if (TaskCollection.find().count() === 0) {
    ["task1", "task2"].forEach(insertTask, user);
  }
});
