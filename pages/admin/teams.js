import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";

import AdminReturn from "../../components/AdminReturn";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: false
    };

    this._createTeam = this._createTeam.bind(this);
  }

  _createTeam() {
    this.setState({
      createTeam: !this.state.createTeam
    });

    console.log(this.state.createTeam + " ");
  }

  componentDidMount() {}

  render() {
    if (this.state.createTeam === true) {
      return (
        <div>
          <LayoutGlobal />
         
          <div className="container">
            <h1>Teams</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createTeam}>
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
              <button className="btn-create" onClick={this._createTeam}>
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
         

          <div className="container">
            <h1>Teams</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createTeam}>
                Configure
              </button>
            </div>

            <div className="btn-admin-create-bottom">
              <AdminReturn/>
            </div>

            {this.state.createTeam ? <CreateUser /> : null}

            <IndexReturn />
          </div>
        </div>
      );
    }
  }
}

export default Teams;
