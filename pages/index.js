import React, { Component } from "react";
import Head from "next/head";
import LayoutGlobal from "../components/LayoutGlobal";
import Login from "../components/Login";
import Register from "../components/Register";
import IndexInfo from "../components/IndexInfo";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showRegister: false,
      tables: false,
      matches: false,
      teams: false
    };

    this._onLoginClick = this._onLoginClick.bind(this);
    this._onRegisterClick = this._onRegisterClick.bind(this);
    this._matches = this._matches.bind(this);
    this._teams = this._teams.bind(this);
    this._tables = this._tables.bind(this);
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

  _tables() {
    this.setState({
      tables: !this.state.tables,
      teams: false,
      matches: false
    });
  }

  _teams() {
    this.setState({
      teams: !this.state.teams,
      matches: false,
      tables: false
    });
  }

  
  componentDidMount() {}

  render() {
    return (
      <div>
        <LayoutGlobal />

        <div className="btn-group">
          <button className="btn-index-top" onClick={this._onLoginClick}>
            Log in
          </button>

          <button className="btn-index-top" onClick={this._onRegisterClick}>
            Register
          </button>
        </div>

        <div className="btn-index-menu">
          <button className="index-menu" onClick={this._tables}>
            Tables
          </button>

          <button className="index-menu" onClick={this._matches}>
            Matches
          </button>

          <button className="index-menu" onClick={this._teams}>
            Teams
          </button>

          {this.state.tables ? <IndexInfo tables={this.state.tables}/> : null}
          {this.state.matches ? <IndexInfo matches={this.state.matches}/> : null}
          {this.state.teams ? <IndexInfo teams={this.state.teams}/> : null}
        </div>
        {this.state.showLogin ? <Login /> : null}
        {this.state.showRegister ? <Register /> : null}
      </div>
    );
  }
}

export default Index;
