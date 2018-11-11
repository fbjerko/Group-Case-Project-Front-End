import React, {Component} from 'react';
import i18n from "../i18n";
import Logout from "./buttons/Logout";
import {Router} from "../routes";
import EditUser from "./EditUser";


class NavbarUser extends Component {

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
                                onClick={() => Router.pushRoute("/admin")}>{i18n.t("HOME", {lng})}</option>
                        <div className="dropdown">
                            <option className="btn-lng"
                                    onClick={() => Router.push("/admin/players")}>{i18n.t("PLAYERS", {lng})}</option>
                            <div className="dropdown-content">
                                <option className="btn-lng"
                                        onClick={() => Router.pushRoute("/admin/players?create=true")}>{i18n.t("CREATE", {lng})}</option>
                                <option className="btn-lng"
                                        onClick={() => Router.push("/admin/players")}>{i18n.t("SHOW_ALL", {lng})}</option>
                            </div>
                        </div>

                        <div className="dropdown">
                            <option className="btn-lng"
                                    onClick={() => Router.push("/admin/managers")}>{i18n.t("MANAGERS", {lng})}</option>
                            <div className="dropdown-content">
                                <option className="btn-lng"
                                        onClick={() => Router.pushRoute("/admin/managers?create=true")}>{i18n.t("CREATE", {lng})}</option>
                                <option className="btn-lng"
                                        onClick={() => Router.push("/admin/managers")}>{i18n.t("SHOW_ALL", {lng})}</option>
                            </div>
                        </div>
                        <div className="dropdown">
                            <option className="btn-lng"
                                    onClick={() => Router.push("/admin/teams")}>{i18n.t("TEAMS", {lng})}</option>
                            <div className="dropdown-content">
                                <option className="btn-lng"
                                        onClick={() => Router.pushRoute("/admin/teams?create=true")}>{i18n.t("CREATE", {lng})}</option>
                                <option className="btn-lng"
                                        onClick={() => Router.push("/admin/teams")}>{i18n.t("SHOW_ALL", {lng})}</option>
                            </div>
                        </div>
                        <div className="dropdown">
                            <option className="btn-lng"
                                    onClick={() => Router.push("/admin/matches")}>{i18n.t("MATCHES", {lng})}</option>
                            <div className="dropdown-content">
                                <option className="btn-lng"
                                        onClick={() => Router.pushRoute("/admin/matches?create=true")}>{i18n.t("CREATE", {lng})}</option>
                                <option className="btn-lng"
                                        onClick={() => Router.push("/admin/matches")}>{i18n.t("SHOW_ALL", {lng})}</option>
                            </div>
                        </div>
                        <div className="dropdown">
                            <option className="btn-lng"
                                    onClick={() => Router.push("/admin/stadiums")}>{i18n.t("STADIUMS", {lng})}</option>
                            <div className="dropdown-content">
                                <option className="btn-lng"
                                        onClick={() => Router.pushRoute("/admin/stadiums?create=true")}>{i18n.t("CREATE", {lng})}</option>
                                <option className="btn-lng"
                                        onClick={() => Router.push("/admin/stadiums")}>{i18n.t("SHOW_ALL", {lng})}</option>
                            </div>
                        </div>

                        <div className="dropdown">
                            <option className="btn-lng"
                                    onClick={() => Router.push("/admin/general")}>{i18n.t("GENERAL", {lng})}</option>
                            <div className="dropdown-content">
                                <div className="dropdown-content2">
                                    <option className="btn-lng"
                                            onClick={() => Router.pushRoute("/admin/general/users")}>{i18n.t("USERS", {lng})}</option>

                                </div>
                                <div className="dropdown-content2">
                                    <option className="btn-lng"
                                            onClick={() => Router.push("/admin/general/address")}>{i18n.t("ADDRESSES", {lng})}</option>
                                    <div className="dropdown-content1">
                                        <option className="btn-lng"
                                                onClick={() => Router.pushRoute("/admin/general/address?create=true")}>{i18n.t("CREATE", {lng})}</option>

                                    </div>
                                </div>
                                <div className="dropdown-content2">
                                    <option className="btn-lng"
                                            onClick={() => Router.push("/admin/general/associations")}>{i18n.t("ASSOCIATIONS", {lng})}</option>

                                    <div className="dropdown-content1">
                                        <option className="btn-lng"
                                                onClick={() => Router.pushRoute("/admin/general/associations?create=true")}>{i18n.t("CREATE", {lng})}</option>

                                    </div>
                                </div>

                                <div className="dropdown-content2">
                                    <option className="btn-lng"
                                            onClick={() => Router.push("/admin/general/goaltypes")}>{i18n.t("GOAL_TYPES", {lng})}</option>

                                    <div className="dropdown-content1">
                                        <option className="btn-lng"
                                                onClick={() => Router.pushRoute("/admin/general/goaltypes?create=true")}>{i18n.t("CREATE", {lng})}</option>

                                    </div>
                                </div>
                                <div className="dropdown-content2">
                                    <option className="btn-lng"
                                            onClick={() => Router.push("/admin/general/owners")}>{i18n.t("OWNERS", {lng})}</option>

                                    <div className="dropdown-content1">
                                        <option className="btn-lng"
                                                onClick={() => Router.pushRoute("/admin/general/owners?create=true")}>{i18n.t("CREATE", {lng})}</option>

                                    </div>
                                </div>
                                <div className="dropdown-content2">
                                    <option className="btn-lng"
                                            onClick={() => Router.push("/admin/general/persons")}>{i18n.t("PERSONS", {lng})}</option>

                                    <div className="dropdown-content1">
                                        <option className="btn-lng"
                                                onClick={() => Router.pushRoute("/admin/general/persons?create=true")}>{i18n.t("CREATE", {lng})}</option>

                                    </div>
                                </div>
                                <div className="dropdown-content2">
                                    <option className="btn-lng"
                                            onClick={() => Router.push("/admin/general/season")}>{i18n.t("SEASONS", {lng})}</option>

                                    <div className="dropdown-content1">
                                        <option className="btn-lng"
                                                onClick={() => Router.pushRoute("/admin/general/season?create=true")}>{i18n.t("CREATE", {lng})}</option>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-bar-general">
                        <option className="btn-lng"
                                onClick={() => Router.pushRoute("/admin/documentation")}>{i18n.t("DOCUMENTATION", {lng})}
                        </option>
                        <option className="btn-lng" onClick={this.onEditClick}>
                            {i18n.t("EDIT_ACC", {lng})}
                        </option>
                        <Logout/>
                        <option className="btn-lng" value={'no'} onClick={this.changeLanguage}>Norsk</option>
                        <option className="btn-lng" value={'en'} onClick={this.changeLanguage}>English</option>

                    </div>
                    <p className="text">{i18n.t("USER_NAME", {lng})}: {this.state.userName}</p>

                </div>
                <img style={{marginTop: "8rem"}} src="../static/images/logo.png" alt="" className="logo"
                     onClick={() => Router.push("/admin")}/>
                <div className="div-edituser">
                    {this.state.showEdit ? <EditUser/> : null}
                </div>
            </div>

        );
    }
}

export default NavbarUser;

