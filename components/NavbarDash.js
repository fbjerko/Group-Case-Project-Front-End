import React, {Component} from 'react';
import i18n from "../i18n";
import {Router} from "../routes";
import EditUser from "./EditUser";
import Logout from "./buttons/Logout";

class NavbarDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: i18n.language,
            showEdit: false,
            showLogo: true,
            userName: ""
        }
    }

    componentWillMount() {
        i18n.on('languageChanged', this.onLanguageChanged)
    }

    onLanguageChanged = (lng) => {
        this.setState({lng: lng});
    }

    onEditClick = () => {
        this.setState({
            showEdit: !this.state.showEdit
        });
    }

    componentDidMount() {
        let userName = this.getUserName();
        if (userName != "") {
            this.setState({userName});
        }
    }

    getUserName = () => {
        var name = "userName" + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {

                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    changeLanguage = (event) => {

        console.log(event.target.value);
        i18n.changeLanguage(event.target.value, (err, t) => {
        });

    }

    render() {
        const lng = this.state.lng;
        return (
            <div>
                <div className="nav-bar-index">
                    <div className="nav-bar-options">
                        <option className="btn-lng"
                                onClick={() => window.location.reload()}>{i18n.t("HOME", {lng})}</option>

                    </div>
                    <div className="nav-bar-general">

                        <option className="btn-lng" onClick={this.onEditClick}>
                            {i18n.t("EDIT_ACC", {lng})}
                        </option>
                        <Logout/>
                        <option className="btn-lng" value={'no'} onClick={this.changeLanguage}>Norsk</option>
                        <option className="btn-lng" value={'en'} onClick={this.changeLanguage}>English</option>
                        <p className="text">{i18n.t("USER_NAME", {lng})}: {this.state.userName}</p>
                    </div>

                </div>
                <img style={{marginTop: "8rem"}} src="../static/images/logo.png" alt="" className="logo"
                     onClick={() => window.location.reload()}/>
                <div className="div-edituser">
                    {this.state.showEdit ? <EditUser/> : null}
                </div>

            </div>
        );
    }
}

export default NavbarDash;