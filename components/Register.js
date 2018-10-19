import React from "react";
import { Router } from "../routes";

function registerUser() {
  console.log(document.getElementById("userName").value);

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {

      Router.pushRoute("/");
      alert("User registered");
      console.log("USer Register");
      console.log(json);
    }

    if (xhttp.status !== 200) {
      
      console.log()
    }
  };
  xhttp.open("POST", "http://localhost:5000/api/user", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      userName: document.getElementById("userName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("psw").value
    })
  );

  var json = JSON.stringify({
    userName: document.getElementById("userName").value,
    email: document.getElementById("email").value,
    password: document.getElementById("psw").value
  });
}

const Register = () => (
  <div className="form-div" id="myForm">
    <form className="form-container">
      <h2>Register</h2>

      <b>User name</b>
      <input type="text" placeholder="Enter User name" id="userName" required />

      <b>Email</b>
      <input type="text" placeholder="Enter Email" id="email" required />

      <b>Password</b>
      <input type="password" placeholder="Enter Password" id="psw" required />

      <b>Repeat Password</b>
      <input
        type="password"
        placeholder="Repeat Password"
        id="psw-rep"
        required
      />

      <button type="button" className="btn" onClick={registerUser}>
        Register
      </button>
    </form>
  </div>
);

export default Register;
