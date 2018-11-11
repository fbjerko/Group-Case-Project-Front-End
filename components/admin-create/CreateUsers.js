import React from "react";
import { Router } from "../../routes";

function postPlayer() {
  console.log(document.getElementById("firstName").value);

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      // Bruker finnes, sjekker passord
      //alert("User " + username + " has been added");
      Router.pushRoute("/admin/create");
    }

    if (xhttp.status !== 200) {
      console.log("Failed");
      Router.pushRoute("/admin/create ");
    }
  };
  xhttp.open("POST", process.env.API_URL+"/api/person", true);
  xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("token","Bearer "+localStorage.getItem("token"));
  xhttp.withCredentials=true;
  xhttp.send(
    JSON.stringify({
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        dateOfBirth: document.getElementById("dateOfBirth").value
      })
  );
} 

 

const CreateUser = () => (
  <div className="form-div" id="myForm">
    <form className="form-container">
      <h2>Register</h2>

      <b>First Name</b>
      <input
        type="text"
        placeholder="First Name"
        id="firstName"
        className="firstName"
        required
      />

      <b>Last Name</b>
      <input
        type="text"
        placeholder="Last Name"
        id="lastName"
        className="firstName"
        required
      />

      <b>Date of Birth</b>
      <input
        type="text"
        placeholder="Date of Birth"
        id="dateOfBirth"
        className="dateOfBirth"
        required
      />

      <button type="button" className="btn" onClick={postPlayer}>
        Create
      </button>
    </form>
  </div>
);

export default CreateUser;
