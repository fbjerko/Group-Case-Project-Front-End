import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";
import NavBar from "../../components/NavBar";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createUser: false
    };

    this._createUser = this._createUser.bind(this);
  }

  _createUser() {
    this.setState({
      createUser: !this.state.createUser
    });

    console.log(this.state.createUser + " ");
  }

  componentDidMount() {}

  render() {
    if (this.state.createUser === true) {
      return (
        <div>
          <LayoutGlobal />
          <NavBar />
          <div className="container">
            <h1>Users</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createUser}>
                Create
              </button>

              <button className="btn-create" onClick={this._matches}>
                Update
              </button>

              <button className="btn-create" onClick={this._teams}>
                Delete
              </button>
            </div>

            <div className="btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createUser}>
                Back
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <LayoutGlobal />
          <NavBar />

          <div className="container">
            <h1>Users</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createUser}>
                Configure
              </button>
            </div>

            {this.state.createUser ? <CreateUser /> : null}

            <IndexReturn />
          </div>
        </div>
      );
    }
  }
}

export default Create;
