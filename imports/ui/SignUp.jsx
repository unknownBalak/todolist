import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
// import {signUpCB} from "./alertCB.js";
import "./css/login.css";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function signUpCB(error, user) {
    if (user) {
      alert("User Already Exist please login!!");
    } else {
      Accounts.createUser({
        username: username,
        password: password,
      });
      alert("User Registered, Head over to login Page!");
    }
  }
  const submit = (e) => {
    e.preventDefault();
    Meteor.call("find_by_username", username, signUpCB);

    e.target.reset();
  };
  return (
    <form onSubmit={submit} className="login-form">
      <label htmlFor="username"> New Username</label>

      <input
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>

      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">SignUp</button>
    </form>
  );
};
