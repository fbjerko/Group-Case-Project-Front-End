import React from "react";
import { Router } from "../routes";
import Loading from "./buttons/loading";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading : false,
            loadingText : "Authenticating",
            failed:false
        }
    }

    render(){
        let loading;
        if(this.state.loading){
            loading = <Loading text={"Authenticating..."} icon={true}/>;
        }else if(this.state.failed){
            loading=<Loading text={"Authenticating failed"} icon={false}/>
        }

        return(

            <div className="form-div" id="myForm">
                <form className="form-container">
                    <h2>Log in</h2>

                    <b>Email</b>

                    <input type="text" id="email" placeholder="Enter Email" className="email" required />

                    <b>Password</b>
                    {loading}
                    <input
                        id="psw"
                        type="password"
                        placeholder="Enter Password"
                        className="psw"
                        required
                    />

                    <button
                        type="button"
                        className="btn"
                        onClick={() => {

                            this.setState({loading:true});
                            var xhttp = new XMLHttpRequest();

                            xhttp.open("POST", process.env.FRONT_END_URL+"/login", true);
                            xhttp.setRequestHeader("Content-type", "application/json");
                            xhttp.send(
                                JSON.stringify({
                                    password: document.getElementById('psw').value,
                                    email: document.getElementById("email").value
                                })
                            );
                            xhttp.onreadystatechange = ()=>{
                                if (xhttp.readyState == XMLHttpRequest.DONE) {
                                    console.log(xhttp);
                                    if(xhttp.status==200){
                                        let body = JSON.parse(xhttp.responseText);
                                        console.log(body);
                                        if(body.message=='admin'){
                                            console.log("Admin logged in");
                                            Router.pushRoute("/admin");}
                                        else if (body.message=='user'){
                                            console.log("user logged in");
                                            Router.pushRoute("/dashboard");}
                                    }else if(xhttp.status!=200){
                                        console.log("authFailed");
                                        this.setState({loading:false,failed:true});
                                    }



                                }
                            }

                        }
                        }
                    >
                        Login
                    </button>

                </form>
            </div>
        )
    }
}


export default Login;