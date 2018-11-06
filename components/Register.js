import React from "react";
import { Router } from "../routes";
import Loading from "./buttons/loading";





class Register extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      status:"Fill out user information"
    }
  }

    checkAll=()=> {
    this.checkEmail();
    this.checkPassword();
    this.checkUserName();
}

    checkUserName=()=> {
    if (document.getElementById("userName").value !== "") {
        document.getElementById("userName").style.backgroundColor = "#75f15c";
    } else {
        document.getElementById("userName").style.backgroundColor = "#dde6eb";
    }
}

    checkEmail=()=> {
    let email = document.getElementById("email").value;
    let emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailResult = emailRGEX.test(email);
    if (emailResult) {
        document.getElementById("email").style.backgroundColor = "#75f15c";
    }
    if (!emailResult) {
        document.getElementById("email").style.backgroundColor = "#dde6eb";
    }
}

    checkPassword=()=> {
    let psw = document.getElementById("psw").value;
    let psw2 = document.getElementById("psw-rep").value;
    var pswRGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    var pswResult = pswRGEX.test(psw);
    if (pswResult) {
        document.getElementById("psw").style.backgroundColor = "#75f15c";
    }
    if (psw === psw2 && psw !== "") {
        document.getElementById("psw-rep").style.backgroundColor = "#75f15c";
    }

    if (!pswResult) {
        document.getElementById("psw").style.backgroundColor = "#dde6eb";
    }
    if (psw !== psw2) {
        document.getElementById("psw-rep").style.backgroundColor = "#dde6eb";
    }
    if (psw === "") {
        document.getElementById("psw").style.backgroundColor = "#dde6eb";
        document.getElementById("psw-rep").style.backgroundColor = "#dde6eb";
    }
}

    validate=(event)=> {
    event.preventDefault();

    var userName = document.getElementById("userName").value;
    if (userName === "") {
        return this.loginFailed();
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
            this.registerUser();
        } else {
            //   "psw doesn't match. Try again";
            this.loginFailed();
        }
    } else if (pswResult && !emailResult) {
        if (psw === psw2) {
            //  "Enter a valid E-Mail address";
        } else {
            // "Enter a valid E-Mail address and a matching psw";
        }
        this.loginFailed();
    } else if (!pswResult && emailResult) {
        //"Enter a valid psw";
        this.loginFailed();
    } else {
        // "Enter a valid Email and psw";
        this.loginFailed();
    }
}

    newUserSuccess=(userName)=> {
    document.getElementById("userName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("psw").value = "";
    document.getElementById("psw-rep").value = "";
    this.checkAll();
    //User has been added
}

    newUserFailed=()=> {
    document.getElementById("userName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("psw").value = "";
    document.getElementById("psw-rep").value = "";
    this.checkAll();
    //User already exists
}

    loginFailed=()=> {
    document.getElementById("psw").value = "";
    document.getElementById("psw-rep").value = "";
    this.checkAll();
}
   registerUser=()=> {
    console.log(document.getElementById("userName").value);
    this.setState({status:"Creating user"});
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", process.env.FRONT_END_URL + "/register", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
        JSON.stringify({
            userName: document.getElementById("userName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("psw").value
        })
    );
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.status == 201) {
                console.log("Registered User");
                this.setState({status:"User created!"});
            } else if (xhttp.status != 200) {
                console.log("authFailed");
                this.setState({status:"Could not create user"});
            }
        }
    };
}

    render(){
    let loading;
    if(this.state.status=="Fill out user information"){
      loading=<Loading icon={false} text={"Fill out user information"}/>;
    }else if(this.state.status=="Creating user"){
        loading=<Loading icon={true} text={"Creating User"}/>;
    }else if(this.state.status=="Could not create user"){
        loading=<Loading icon={false} text={"Failed creating user!"}/>;
    }else if(this.state.status=="User created!"){
        loading=<Loading icon={false} text={"User created"}/>;
    }
        return(<div className="form-div" id="myForm">
            <form className="form-container">
                {loading}
                <h2>Register</h2>

                <b>User name</b>
                <input
                    type="text"
                    placeholder="Enter User name"
                    id="userName"
                    onInput={this.checkUserName}
                />

                <b>Email</b>
                <input
                    type="text"
                    placeholder="Enter Email"
                    id="email"
                    onInput={this.checkEmail}
                />

                <b>Password</b>
                <input
                    type="password"
                    placeholder="Enter psw"
                    id="psw"
                    onInput={this.checkPassword}
                />

                <b>Repeat Password</b>
                <input
                    type="password"
                    placeholder="Repeat psw"
                    id="psw-rep"
                    onInput={this.checkPassword}
                />

                <button type="button" className="btn-" onClick={this.validate}>
                    Register
                </button>
            </form>
        </div>)
    }

}

export default Register;
