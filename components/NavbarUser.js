import React, {Component} from 'react';
import i18n from "../i18n";
import Logout from "./buttons/Logout";


class NavbarUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: i18n.language
        }
    }

    componentWillMount() {
        i18n.on('languageChanged', this.onLanguageChanged)
    }

    onLanguageChanged = (lng) => {
        this.setState({lng: lng});
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
                    <option className="btn-lng" onClick={this.props.onEditClick}>
                        {i18n.t("EDIT_ACC", {lng})}
                    </option>
                    <Logout/>
                    <option className="btn-lng" value={'no'} onClick={this.changeLanguage}>Norsk</option>
                    <option className="btn-lng" value={'en'} onClick={this.changeLanguage}>English</option>
                </div>
                <img src="../static/images/logo.png" alt="" className="logo"/>
            </div>

        );
    }
}

export default NavbarUser;

