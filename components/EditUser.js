import React from "react";

function editUser() {

  var xhttp = new XMLHttpRequest();

  xhttp.open("PUT", process.env.API_URL+"/api/users", true);
  xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("token","Bearer "+localStorage.getItem("token"));
  xhttp.send(
    JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("psw").value
        })
  );

  var json = JSON.stringify({
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
