import React from "react";
import {Router} from "../routes";
import Loading from "./buttons/loading";
import i18n from "../i18n"


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "Fill out user information",
            lng: i18n.language,
            loading:false,
            pwValid:false,
            userNameValid:false,
            emailValid:false,
            infoText:i18n.t("CREATE_USER_INFO",i18n.language),
            infoPosition:"5rem"
        }
    }

    checkAll = () => {
        this.checkEmail();
        this.checkPassword();
        this.checkUserName();
    }

    checkUserName = () => {
        if (document.getElementById("userName").value !== "") {

            this.setState({userNameValid:true});
        } else {

            this.setState({userNameValid:false});
        }
    }

    checkEmail = () => {
        let email = document.getElementById("email").value;
        let emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailResult = emailRGEX.test(email);
        if (emailResult) {
            this.setState({emailValid:true});
        }
        if (!emailResult) {

            this.setState({pwValid:false});
        }
    }

    checkPassword = () => {
        let psw = document.getElementById("psw").value;
        let psw2 = document.getElementById("psw-rep").value;
        var pswRGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        var pswResult = pswRGEX.test(psw);
        if (pswResult) {

            this.setState({pwValid:true});
        }
        if (psw === psw2 && psw !== "") {

        }

        if (!pswResult) {

            this.setState({pwValid:false});
        }
        if (psw !== psw2) {

        }
        if (psw === "") {

            this.setState({pwValid:false});
        }
    }

    validate = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        var userName = document.getElementById("userName").value;
        if (userName === "") {
            this.setState({loading:false});
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
                this.setState({status:"Password is not valid"})
                this.loginFailed();
            }
        } else if (pswResult && !emailResult) {
            if (psw === psw2) {
                this.setState({infoText:"Email not valid",infoPosition:"5rem"})
            } else {
                this.setState({infoText:"Password does not match",infoPosition:"5rem"})
            }
            this.loginFailed();
        } else if (!pswResult && emailResult) {
            this.setState({infoText:"Password is not valid",infoPosition:"5rem"})
            this.loginFailed();
        } else {
            // "Enter a valid Email and psw";
            this.loginFailed();
        }

    }

    newUserSuccess = (userName) => {
        this.props.close(userName)
    }

    newUserFailed = () => {
        document.getElementById("userName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("psw").value = "";
        document.getElementById("psw-rep").value = "";
        this.checkAll();
        //User already exists
    }

    loginFailed = () => {
        document.getElementById("psw").value = "";
        document.getElementById("psw-rep").value = "";
        this.setState({loading:false});
        this.checkAll();
    }
    registerUser = () => {

        this.setState({status: "Creating user"});
        var xhttp = new XMLHttpRequest();
        console.log(process.env.API_URL + "/api/auth/signup");
        xhttp.open("POST", process.env.API_URL + "/api/auth/signup", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
                userName: document.getElementById("userName").value,
                email: document.getElementById("email").value,
                password: document.getElementById("psw").value,
                role: ["user"]
            })
        );
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == XMLHttpRequest.DONE) {
                let body=JSON.parse(xhttp.responseText);
                this.setState({loading:false});
                console.log(body);
                if (xhttp.status == 200) {
                    console.log("Registered User");
                    this.newUserSuccess(document.getElementById("userName").value)
                } else if (xhttp.status == 400) {
                    console.log("authFailed");
                    this.setState({infoText: body.message,infoPosition:"38rem",status:"Failed creating user"});
                    if(body.item=="userName"){
                        this.setState({userNameValid:false})
                    }else if(body.item=="email"){
                        this.setState({infoText: body.message,infoPosition:"38rem"})
                    }
                }
            }
        };
    }

    componentDidMount() {
        i18n.on('languageChanged', this.onLanguageChanged)

    }

    onLanguageChanged = (lng) => {
        this.setState({lng: lng,infoText:i18n.t("CREATE_USER_INFO",this.state.language),infoPosition:"5rem"});
    }

    changeInfoText=(event)=>{
        console.log(event.target.id);
        if(event.target.id=="userName"){
            this.setState({infoText:i18n.t("USER_NAME_INFO",this.state.language),infoPosition:"8.0rem"})
        }else if(event.target.id=="email"){
            this.setState({infoText:i18n.t("EMAIL_INFO",this.state.language),infoPosition:"16.2rem"})
        }else if(event.target.id=="psw" || event.target.id=="psw-rep"){
            this.setState({infoText:i18n.t("PASSWORD_INFO",this.state.language),infoPosition:"24.5rem"})
        }
    }

    render() {
        let lng = this.state.lng;
        let loading;
        if (this.state.status == "Fill out user information") {
            loading = <Loading icon={false} text={i18n.t("FILL_USER", {lng})}/>;
        } else if (this.state.status == "Creating user") {
            loading = <Loading icon={true} text={i18n.t("CREATING_USER", {lng})}/>;
        }else if (this.state.status == "User created!") {
            loading = <Loading icon={false} text={i18n.t("USER_CREATED", {lng})}/>;
        } else if(this.state.status == "Failed creating user"){
            loading = <Loading icon={false} text={i18n.t("CREATED_FAILED",lng)}/>;
        }
        return (<div className="form-div" id="myForm">
            <p style={{marginRight:"1rem",opacity:"0.5",fontSize:"1.2rem",width:"10rem",position:"relative",top:this.state.infoPosition}}>{this.state.infoText}</p>
            <form className="form-container">
                {loading}
                <h2>{i18n.t("REGISTER", {lng})}</h2>

                <b>{i18n.t("USERNAME", {lng})} {this.state.userNameValid?null:<span style={{color:"red"}}>*</span>} </b>

                <input
                    onFocus={this.changeInfoText}
                    type="text"
                    placeholder={i18n.t("ENTER", {lng}) + " " + i18n.t("USERNAME", {lng})}
                    id="userName"
                    onInput={this.checkUserName}
                />

                <b>{i18n.t("EMAIL", {lng})} {this.state.emailValid?null:<span style={{color:"red"}}>*</span>}</b>
                <input
                    onFocus={this.changeInfoText}
                    type="text"
                    placeholder={i18n.t("ENTER", {lng}) + " " + i18n.t("EMAIL", {lng})}
                    id="email"
                    onInput={this.checkEmail}
                />

                <b>{i18n.t("PASS", {lng})} {this.state.pwValid?null:<span style={{color:"red"}}>*</span>}</b>
                <input
                    onFocus={this.changeInfoText}
                    type="password"
                    placeholder={i18n.t("ENTER", {lng}) + " " + i18n.t("PASS", {lng})}
                    id="psw"
                    onInput={this.checkPassword}
                />

                <b>{i18n.t("REP_PASS", {lng})} {this.state.pwValid?null:<span style={{color:"red"}}>*</span>}</b>
                <input
                    onFocus={this.changeInfoText}
                    type="password"
                    placeholder={i18n.t("REP_PASS", {lng})}
                    id="psw-rep"
                    onInput={this.checkPassword}
                />




                    <button type="button" className="btn-" onClick={this.validate} style={{display:"flex",justifyContent:"center"}}>
                        {this.state.loading?<div className="loadingIcon"/>:i18n.t("REGISTER", {lng})}
                    </button>


            </form>
        </div>)
    }

}

export default Register;
