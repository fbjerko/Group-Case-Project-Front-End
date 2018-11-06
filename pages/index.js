import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import Login from "../components/Login";
import Register from "../components/Register";
import IndexInfo from "../components/IndexInfo";
import Loading from "../components/buttons/loading";
import i18n from "../i18n"


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
    console.log(i18n);
    return (

        <LayoutGlobal >

        <div className="btn-group-index-login-reg">
          <button className="btn-index-login-reg " onClick={this._onLoginClick}>
              {i18n.t("name.label")}
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

        
        {this.state.showLogin ? <Login close={this._onLoginClick} /> : null}
        {this.state.showRegister ? <Register  /> : null}
        </LayoutGlobal >
      
    );
  }
}

export default Index;
