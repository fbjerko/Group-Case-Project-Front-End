import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";
import NavBar from "../../components/NavBar";
import CreateUser from "../../components/admin-create/CreateUsers";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createUsers: false
    };

    this._createUser = this._createUser.bind(this);
  }

  _createUser() {
    this.setState({
      createUsers: true
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <LayoutGlobal />
        <NavBar />

        <div className="container">
          <h1>Matches</h1>

          <div className="btn-admin-create-top">
            <button className="btn-create" onClick={this._createUser}>
              Users
            </button>

            <button className="btn-create" onClick={this._matches}>
              Matches
            </button>

            <button className="btn-create" onClick={this._teams}>
              Teams
            </button>

            <button className="btn-create" onClick={this._teams}>
              Teams
            </button>
          </div>

          <div className="btn-admin-create-bottom">
            <button className="btn-create" onClick={this._tables}>
              Tables
            </button>

            <button className="btn-create" onClick={this._matches}>
              Matches
            </button>

            <button className="btn-create" onClick={this._teams}>
              Teams
            </button>

            <button className="btn-create" onClick={this._teams}>
              Teams
            </button>
          </div>

          {this.state.createUsers ? <CreateUser /> : null}

          <IndexReturn />
        </div>
      </div>
    );
  }
}

export default Create;
