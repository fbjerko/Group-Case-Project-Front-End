import React from "react";
import { Router } from "../routes";

const Login = () => (
  <div className="form-div" id="myForm">
    <form className="form-container">
      <h2>Login</h2>

      <label for="email">
        <b>Email</b>
      </label>
      <input type="text" placeholder="Enter Email" className="email" required />

      <label for="psw">
        <b>Password</b>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        className="psw"
        required
      />

      <button
        type="button"
        className="btn"
        onClick={() => Router.pushRoute("/admin")}
      >
        Login Admin
      </button>
      <button
        type="button"
        className="btn"
        onClick={() => Router.pushRoute("/dashboard")}
      >
        Login User
      </button>
    </form>
  </div>
);

export default Login;
