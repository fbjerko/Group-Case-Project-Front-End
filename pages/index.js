import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import LayoutGlobal from "../components/LayoutGlobal";
import Login from "../components/Login";
import Register from "../components/Register";
import IndexInfo from "../components/IndexInfo";


const context = React.createContext();

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showRegister: false,
      matches: false,
      teams: false
    };

    this._onLoginClick = this._onLoginClick.bind(this);
    this._onRegisterClick = this._onRegisterClick.bind(this);
    this._matches = this._matches.bind(this);
    this._teams = this._teams.bind(this);
  }

  _onLoginClick() {
    this.setState({
      showLogin: !this.state.showLogin,
      showRegister: false
    });
  }

  _onRegisterClick() {
    this.setState({
      showRegister: !this.state.showRegister,
      showLogin: false
    });
  }

  _matches() {
    this.setState({
      matches: !this.state.matches,
      tables: false,
      teams: false
    });
  }


  _teams() {
    this.setState({
      teams: !this.state.teams,
      matches: false,
      tables: false
    });
  }

  
  componentDidMount() {
      //console.log(process.env.API_URL);

  }

  render() {
    const { t, i18n } = this.props;

    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
      };
    return (
        <LayoutGlobal >
          <button onClick={() => changeLanguage("no")}>Norsk</button>
          <button onClick={() => changeLanguage("en")}>English</button>
        <div className="btn-group-index-login-reg">
          <button className="btn-index-login-reg " onClick={this._onLoginClick}>
          {t("LOG_IN")}
          </button>
          <button className="btn-index-login-reg " onClick={this._onRegisterClick}>
            Register
          </button>
        </div>

        <div className="btn-group-index-toggle-info">

          <button className="btn-index-toggle" onClick={this._matches}>
            Matches
          </button>

          <button className="btn-index-toggle" onClick={this._teams}>
            Players
          </button>

          {this.state.matches ? <IndexInfo matches={this.state.matches}/> : null}
          {this.state.teams ? <IndexInfo teams={this.state.teams}/> : null}
        </div>

        
        {this.state.showLogin ? <Login /> : null}
        {this.state.showRegister ? <Register /> : null}
        </LayoutGlobal >
      
    );
  }
}

export default withNamespaces("translations", {wait: true}) (Index);
