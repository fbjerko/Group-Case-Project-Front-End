import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";
import NavBar from "../../components/NavBar";
import AdminReturn from "../../components/AdminReturn";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createPlayer: false
    };

    this._createPlayer = this._createPlayer.bind(this);
  }

  _createPlayer() {
    this.setState({
      createPlayer: !this.state.createPlayer
    });

    console.log(this.state.createPlayer + " ");
  }

  componentDidMount() {}

  render() {
    if (this.state.createPlayer === true) {
      return (
        <div>
          <LayoutGlobal />
          <NavBar />
          <div className="container">
            <h1>Players</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createPlayer}>
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
              <button className="btn-create" onClick={this._createPlayer}>
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
            <h1>Players</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createPlayer}>
                Configure
              </button>
            </div>

            <div className="btn-admin-create-bottom">
              <AdminReturn/>
            </div>

            {this.state.createPlayer ? <CreateUser /> : null}

            <IndexReturn />
          </div>
        </div>
      );
    }
  }
}

export default Players;
