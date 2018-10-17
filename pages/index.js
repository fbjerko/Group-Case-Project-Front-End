import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import Login from "../components/Login";
import Register from "../components/Register";


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showLogin: false,
        showRegister: false,
        info: ['Tonje', 'Lasse','Fredrik','Karoline']
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

  componentDidMount() {
  }

  render() {
    const infoList = this.state.info.map((inf) =>
    <li> {inf}
    </li>);

    return (
      <div>
        <LayoutGlobal />
        <div className = "frontpage-info1">
        <div className="top">  
        <h2>Matches</h2>
        </div>
        <ul>
          {infoList}
        </ul>
        </div>
        <div className = "frontpage-info2">
        <div className="top">  
        <h2>Players</h2>
        </div>
        <ul>
          {infoList}
        </ul>
        </div>
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
