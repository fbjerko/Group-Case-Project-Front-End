import React from "react";

const EditUser = () => (
  <div className="editform-div" id="myForm">
    <form className="form-container">
      <h2>Your account</h2>

   <label for="firstname"><b>First name</b></label>
    <input type="text" placeholder="Enter First name" className="firstname" required/>

    <label for="lastname"><b>Last name</b></label>
    <input type="text" placeholder="Enter Last Name" className="lastname" required/>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" className="email" required/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" className="psw" required/>

    <label for="psw-rep"><b>Repeat Password</b></label>
    <input type="password" placeholder="Repeat Password" className="psw-rep" required/>

      <button
        type="button"
        className="save-btn"
        onClick={console.log("Så flink du er til å lagre")}
      >
        Save changes
      </button>
    </form>
  </div>
);

export default EditUser;
