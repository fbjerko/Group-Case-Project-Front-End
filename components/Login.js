import React from "react";
import { Router } from "../routes";

const Login = () => (
  <div className="form-div" id="myForm">
    <form className="form-container">
      <h2>Login</h2>

      <b>Email</b>

      <input type="text" id="email" placeholder="Enter Email" className="email" required />

      <b>Password</b>

      <input
        id="psw"
        type="password"
        placeholder="Enter Password"
        className="psw"
        required
      />

      <button
        type="button"
        className="btn"
        onClick={() => {
          fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password: document.getElementById('psw').value,
              email: document.getElementById("email").value
            })
          }).then((response)=>{
            
              if(response.status==200){
                Router.pushRoute("/admin");
              }
            });

          }}
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
