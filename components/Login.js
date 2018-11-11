import React from "react";
import {Router} from "../routes";
import Loading from "./buttons/loading";
import i18n from "../i18n"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingText: "Authenticating",
            failed: false,
            lng: i18n.language
        }
    }

    componentDidMount() {
        i18n.on('languageChanged', this.onLanguageChanged)

    }

    onLanguageChanged = (lng) => {
        this.setState({lng: lng});
    }

    render() {
        let lng = this.state.lng;
        let loading;
        if(this.state.loading){
            loading = <Loading text={i18n.t("AUTH",{lng})} icon={true}/>;
        }else if(this.state.failed){
            loading=<Loading text={i18n.t("AUTH",{lng}) + " " + i18n.t("FAIL",{lng})} icon={false}/>
        }


        return (

            <div className="form-div" id="myForm">
                <form className="form-container">
                    <h2>{i18n.t("LOG_IN", {lng})}</h2>

                    <b>{i18n.t("USERNAME", {lng})}</b>

                    <input type="text" id="username" placeholder={i18n.t("ENTER", {lng}) + " " + i18n.t("USERNAME", {lng})}
                           className="email" required/>

                    <b>{i18n.t("PASS", {lng})}</b>
                    {loading}
                    <input
                        id="psw"
                        type="password"
                        placeholder={i18n.t("ENTER", {lng}) + " " + i18n.t("PASS", {lng})}
                        className="psw"
                        required
                    />

                    <button
                        type="button"
                        className="btn-"
                        onClick={() => {

                            console.log("sending")
                            this.setState({loading:true});

                            var xhttp = new XMLHttpRequest();
                            const body = JSON.stringify({
                                password: document.getElementById('psw').value,
                                userName: document.getElementById('username').value
                            });
                            console.log(body);
                            xhttp.open("POST", process.env.FRONT_END_URL + "/login", true);
                            xhttp.setRequestHeader("Content-type", "application/json");
                            xhttp.send(body);
                            xhttp.onreadystatechange = () => {
                                if (xhttp.readyState == XMLHttpRequest.DONE) {
                                    console.log(xhttp.status);
                                    if (xhttp.status == 200) {
                                        let body = JSON.parse(xhttp.responseText);
                                        console.log(body);
                                        if (body.role == 'admin') {
                                            console.log("Admin logged in");
                                            localStorage.setItem("token",body.token);

                                            Router.pushRoute("/admin");
                                        }
                                        else if (body.role == 'user') {
                                            console.log("user logged in");
                                            Router.pushRoute("/dashboard");
                                        }
                                    } else if (xhttp.status != 200) {
                                        console.log("authFailed");
                                        this.setState({loading: false, failed: true});
                                    }


                                }
                            }

                        }
                        }
                    >
                        {i18n.t("LOG_IN", {lng})}
                    </button>

                </form>
            </div>
        )
    }
}


export default Login;