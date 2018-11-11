import React, {Component} from 'react';
import i18n from "../i18n";


class NavbarIndex extends Component {

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


        i18n.changeLanguage(event.target.value, (err, t) => {
        });

    }

    render() {
        const lng = this.state.lng;
        return (
            <div>
                <div className="nav-bar-index">
                    <option className="btn-lng" onClick={this.props.onLoginClick}>
                        {i18n.t("LOG_IN", {lng})}
                    </option>

                    <option className="btn-lng" onClick={this.props.onRegisterClick}>
                        {i18n.t("REGISTER", {lng})}
                    </option>
                    <option className="btn-lng" value={'no'} onClick={this.changeLanguage}>Norsk</option>
                    <option className="btn-lng" value={'en'} onClick={this.changeLanguage}>English</option>
                </div>
                <img style={{marginTop: "8rem"}} src="../static/images/logo.png" alt="" className="logo" />
            </div>

        );
    }
}

export default NavbarIndex;