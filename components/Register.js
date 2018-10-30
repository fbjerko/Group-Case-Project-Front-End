import React from "react";
import { Router } from "../routes";


function registerUser() {
  console.log(document.getElementById("userName").value);




    var xhttp = new XMLHttpRequest();

    xhttp.open("POST",  process.env.API_URL+"/user", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
        JSON.stringify({
            userName: document.getElementById("userName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("psw").value
        })
    );
    xhttp.onreadystatechange = ()=>{
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if(xhttp.status==200){
                console.log('Registered User');
                Router.pushRoute("/");
            }else if(xhttp.status!=200){
                console.log("authFailed")
            }



        }
    }
 
}

function checkAll() {
  checkEmail();
  checkPassword();
  checkUserName();
}

function checkUserName() {
  if (document.getElementById("userName").value !== "") {
    document.getElementById("userName").style.backgroundColor = "#75f15c";
  } else {
    document.getElementById("userName").style.backgroundColor = "#dde6eb";
  }
}

function checkEmail() {


  let email = document.getElementById("email").value;
  let emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var emailResult = emailRGEX.test(email);
  if(emailResult){
    document.getElementById("email").style.backgroundColor = "#75f15c";
  }
  if(!emailResult){
    document.getElementById("email").style.backgroundColor = "#dde6eb";
  }
}

function checkPassword() {
  
  let psw = document.getElementById("psw").value;
  let psw2 = document.getElementById("psw-rep").value;
  var pswRGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  var pswResult = pswRGEX.test(psw);
  if(pswResult){
    document.getElementById("psw").style.backgroundColor = "#75f15c";
  }
  if(psw === psw2 && psw !== ""){
    document.getElementById("psw-rep").style.backgroundColor = "#75f15c";
  }

  if(!pswResult ){
    document.getElementById("psw").style.backgroundColor = "#dde6eb";
  }
  if(psw !== psw2 ){
    document.getElementById("psw-rep").style.backgroundColor = "#dde6eb";
  }
  if(psw === ""){
    document.getElementById("psw").style.backgroundColor = "#dde6eb";
    document.getElementById("psw-rep").style.backgroundColor = "#dde6eb";
  }
}

function validate(event) {
  event.preventDefault();

  var userName = document.getElementById("userName").value;
  if (userName === "") {
    return loginFailed();
  }

  var email = document.getElementById("email").value;
  var psw = document.getElementById("psw").value;
  var psw2 = document.getElementById("psw-rep").value;

  var emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var emailResult = emailRGEX.test(email);
  var pswRGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  var pswResult = pswRGEX.test(psw);

  if (pswResult === true && emailResult === true) {
    if (psw === psw2) {
      registerUser();
    } else {
     
     //   "psw doesn't match. Try again";
      loginFailed();
    }
  } else if (pswResult && !emailResult) {
    if (psw === psw2) {
      
      //  "Enter a valid E-Mail address";
    } else {
      
       // "Enter a valid E-Mail address and a matching psw";
    }
    loginFailed();
  } else if (!pswResult && emailResult) {
    //"Enter a valid psw";
    loginFailed();
  } else {
 
     // "Enter a valid Email and psw";
    loginFailed();
  }
}

function newUserSuccess(userName) {
  document.getElementById("userName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("psw").value = "";
  document.getElementById("psw-rep").value = "";
  checkAll();
 //User has been added
}

function newUserFailed() {
  document.getElementById("userName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("psw").value = "";
  document.getElementById("psw-rep").value = "";
  checkAll();
  //User already exists
}



function loginFailed() {
  document.getElementById("psw").value = "";
  document.getElementById("psw-rep").value = "";
  checkAll();
  
}


 








const Register = () => (
  <div className="form-div" id="myForm">
    <form className="form-container">
      <h2>Register</h2>

      <b>User name</b>
      <input type="text" placeholder="Enter User name" id="userName" onInput={checkUserName} />

      <b>Email</b>
      <input type="text" placeholder="Enter Email" id="email" onInput={checkEmail} />

      <b>Password</b>
      <input type="password" placeholder="Enter psw" id="psw" onInput={checkPassword} />

      <b>Repeat Password</b>
      <input
        type="password"
        placeholder="Repeat psw"
        id="psw-rep"
        onInput={checkPassword}
        
      />

      <button type="button" className="btn-" onClick={validate}>
        Register
      </button>
    </form>
  </div>
);

export default Register;
