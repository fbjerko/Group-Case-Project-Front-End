import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";

import AdminReturn from "../../components/AdminReturn";
import ListPlayers from "../../components/admin-player/PlayerList";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      ready: false,
      createPlayer: false,
      currentPage: 0
    };

    this._createPlayer = this._createPlayer.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  previousPage() {
    if (this.state.currentPage !== 0)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    console.log(this.state.currentPage);
  }

  nextPage() {
    console.log(this.state.players.length);
    console.log(this.state.players.length / 10);
    if (this.state.currentPage + 1 < this.state.players.length / 10) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
    console.log(this.state.currentPage);
  }

  _createPlayer() {
    this.setState({
      createPlayer: !this.state.createPlayer
    });

    console.log(this.state.createPlayer + " ");
  }

  async componentDidMount() {
    console.log("Hey");
    try {
      const response = await fetch(`http://localhost:5000/api/player/all`);
      const json = await response.json();
      console.log(json);
      this.setState({
        players: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const players = this.state.players.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
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
            <div className="btn-admin-config">
              <button className="btn-create" onClick={this._createPlayer}>
                Configure
              </button>
              <AdminReturn />
            </div>

            <div className="list-info-admin">
              <ListPlayers
                players={players}
                ready={this.state.ready}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
              />
            </div>

            <h2>Page {this.state.currentPage + 1}</h2>
            {this.state.createPlayer ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default Players;
