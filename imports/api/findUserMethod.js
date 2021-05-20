import { check } from "meteor/check";

Meteor.methods({
  find_by_username(name) {
    check(name, String);
    return Accounts.findUserByUsername(name);
  },
});
