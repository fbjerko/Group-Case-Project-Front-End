import React from "react";
import { Router } from "../routes";
import Loading from "./buttons/loading";
import i18n from "../i18n"





class Register extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      status:"Fill out user information",
      lng:i18n.language
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

    this.setState({status:"Creating user"});
    var xhttp = new XMLHttpRequest();
    console.log(process.env.API_URL + "/api/auth/signup");
    xhttp.open("POST", process.env.API_URL + "/api/auth/signup", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
        JSON.stringify({
            userName: document.getElementById("userName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("psw").value,
            role:["user"]
        })
    );
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == XMLHttpRequest.DONE) {

            if (xhttp.status == 200) {
                console.log("Registered User");
                this.setState({status:"User created!"});
            } else if (xhttp.status != 200) {
                console.log("authFailed");
                this.setState({status:"Could not create user"});
            }
        }
    };
}

componentDidMount() {
    i18n.on('languageChanged', this.onLanguageChanged)
    
    }
    onLanguageChanged = (lng)=>{
    this.setState({lng:lng});
    }

    render(){
    let lng = this.state.lng;
    let loading;
    if(this.state.status=="Fill out user information"){
      loading=<Loading icon={false} text={i18n.t("FILL_USER",{lng})}/>;
    }else if(this.state.status=="Creating user"){
        loading=<Loading icon={true} text={i18n.t("CREATING_USER",{lng})}/>;
    }else if(this.state.status=="Could not create user"){
        loading=<Loading icon={false} text={i18n.t("CREATED_FAILED",{lng})}/>;
    }else if(this.state.status=="User created!"){
        loading=<Loading icon={false} text={i18n.t("USER_CREATED",{lng})}/>;
    }
        return(<div className="form-div" id="myForm">
            <form className="form-container">
                {loading}
                <h2>{i18n.t("REGISTER",{lng})}</h2>

                <b>{i18n.t("USERNAME",{lng})}</b>
                <input
                    type="text"
                    placeholder={i18n.t("ENTER",{lng}) +" "+ i18n.t("USERNAME",{lng})}
                    id="userName"
                    onInput={this.checkUserName}
                />

                <b>{i18n.t("EMAIL",{lng})}</b>
                <input
                    type="text"
                    placeholder={i18n.t("ENTER",{lng}) + " " + i18n.t("EMAIL",{lng})}
                    id="email"
                    onInput={this.checkEmail}
                />

                <b>{i18n.t("PASS",{lng})}</b>
                <input
                    type="password"
                    placeholder={i18n.t("ENTER",{lng}) +" "+ i18n.t("PASS",{lng})}
                    id="psw"
                    onInput={this.checkPassword}
                />

                <b>{i18n.t("REP_PASS",{lng})}</b>
                <input
                    type="password"
                    placeholder={i18n.t("REP_PASS",{lng})}
                    id="psw-rep"
                    onInput={this.checkPassword}
                />

                <button type="button" className="btn-" onClick={this.validate}>
                {i18n.t("REGISTER",{lng})}
                </button>
            </form>
        </div>)
    }

}

export default Register;
