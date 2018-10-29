import React from "react";

function editUser() {
  console.log(document.getElementById("userName").value);

  var xhttp = new XMLHttpRequest();

  xhttp.open("PUT", "http://localhost:5000/api/user", true);
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

const EditUser = () => (
  <div className="editform-div" id="myForm">
    <form className="form-container">
      <h2>Your account</h2>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" className="email" required/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" className="psw" required/>

    <label for="psw-rep"><b>Repeat Password</b></label>
    <input type="password" placeholder="Repeat Password" className="psw-rep" required/>

      <button
        type="button"
        className="save-btn"
        onClick={editUser}
      >
        Save changes
      </button>
    </form>
  </div>
);

export default EditUser;
