import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import Login from "../components/Login";
import Register from "../components/Register";


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showLogin: false,
        showRegister: false
    };

    this._onLoginClick = this._onLoginClick.bind(this);
    this._onRegisterClick = this._onRegisterClick.bind(this);
  }

  _onLoginClick() {
      this.setState({
          showLogin : !this.state.showLogin,
          showRegister: false
      })
  }

  _onRegisterClick() {
    this.setState({
        showRegister : !this.state.showRegister,
        showLogin: false
    })
}

  componentDidMount() {}

  render() {
    return (
      <div>
        <LayoutGlobal />
        <div className="btn-group">
          <button 
            className="btn-index"
            onClick={this._onLoginClick}
            >
            Log in</button>

          <button className="btn-index"
            onClick={this._onRegisterClick}
            >

            Register</button>
          </div>

          {this.state.showLogin ? <Login /> : null}
          {this.state.showRegister ? <Register /> : null}
        
      </div>
    );
  }
}

export default Index;
