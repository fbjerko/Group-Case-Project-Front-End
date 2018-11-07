import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import AdminReturn from "../../components/buttons/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import PlayersForm from "../../components/forms/playersForm";
import CreateUser from "../../components/admin-create/CreateUsers";
import Loading from "../../components/buttons/loading";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      ready: false,
      createPlayer: false,
      editPlayer: false,
      currentPage: 0,
      content: ["Players", "Teams"], // Attribute variable names
      contentFields: ["Name", "Team"],
      canEdit: true, // Names/Values of variables,
      playerId: -1
    };

    this._createPlayer = this._createPlayer.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  changePage(command) {
    if (command === 0) {
      this.setState({ currentPage: 0 });
    }
    if (command === 1) {
      if (this.state.currentPage !== 0)
        this.setState(prevState => ({
          currentPage: prevState.currentPage - 1
        }));
    }
    if (command === 2) {
      if (this.state.currentPage + 1 < this.state.players.length / 10) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
    if (command === 3) {
      this.setState({
        currentPage: Math.floor(this.state.players.length / 10)
      });
    }
  }

  _createPlayer() {
    this.setState({
      createPlayer: !this.state.createPlayer
    });

    console.log(this.state.createPlayer + " ");
  }

  edit = playerId => {
    console.log(playerId);
    this.setState({
      updatePlayer: !this.state.updatePlayer,
      playerId: playerId
    });
  };

  async componentDidMount() {
    try {
      const response = await fetch(process.env.API_URL + "/api/player/all");
      const json = await response.json();

      this.setState({
        players: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.ready === true) {
      const players = this.state.players.slice(
        this.state.currentPage * 10,
        (this.state.currentPage + 1) * 10
      );

      if (this.state.createPlayer === true) {
        return (
          <div>
            <LayoutGlobal />
            <PlayersForm edit={"create"} />
          </div>
        );
      } else if (this.state.updatePlayer === true) {
        return (
          <div>
            <LayoutGlobal />
            <PlayersForm edit={"edit"} id={this.state.playerId} />
          </div>
        );
      } else if (this.state.createPlayer === false) {
        return (
          <div>
            <LayoutGlobal />

            <div className="container">
              <div className="btn-admin-config">
                <button className="btn-create" onClick={this._createPlayer}>
                  Create
                </button>
                <AdminReturn />
              </div>

              <ListInfo
                data={players}
                name={this.state.content[0]}
                content={this.state.content}
                contentFields={this.state.contentFields}
                ready={this.state.ready}
                changePage={this.changePage}
                canEdit={this.state.canEdit}
                currentPage={this.state.currentPage}
                edit={this.edit}
              />

              {this.state.createPlayer ? <CreateUser /> : null}
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <LayoutGlobal />
          <Loading icon={true} text={"Loading players..."} />
        </div>
      );
    }
  }
}

export default Players;
