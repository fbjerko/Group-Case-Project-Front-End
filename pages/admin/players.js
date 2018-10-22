import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";
import AdminReturn from "../../components/AdminReturn";
import ListPlayers from "../../components/admin-player/ListPlayers";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
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

          <div className="container">
            <h1>Players</h1>

            <div className="btn-admin-create-btn">
              <button className="btn-create" onClick={this._createPlayer}>
                Configure
              </button>
              <AdminReturn />
            </div>

            <div className="list-info-admin">
              <ListPlayers/>
            </div>

            <IndexReturn />

            {this.state.createPlayer ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default Players;
