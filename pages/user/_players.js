import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import UserReturn from "../../components/buttons/UserReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import PlayerInfo from "../../components/admin-view/PlayerInfo";
import TeamInfo from "../../components/admin-view/TeamInfo";
import WatchList from "./WatchList"

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      ready: false,
      createPlayer: false,
      currentPage: 0,
      content: ["Players", "Teams"], // Attribute variable names
      contentFields: ["Name", "Team"], // Names/Values of variables
      canEdit: false,
      userId: "",
      activeId: 0,
      display: 99,
    };

    this._createPlayer = this._createPlayer.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.showWatchlist = this.showWatchlist.bind(this);
    this.close = this.close.bind(this);
  }

  firstPage() {
    this.setState({ currentPage: 0 });
  }
  lastPage() {
    this.setState({ currentPage: Math.floor(this.state.players.length / 10) });
    console.log(this.state.currentPage);
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

  getCookie() {
    var name = "id" + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  async componentDidMount() {
    await this.setState({
      userId: this.getCookie()
    });

    console.log(this.state.userId + " is userId / players");

    try {
      const response = await fetch(process.env.API_URL + "/api/player/all");
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
  async showWatchlist(id, action) {

    await this.setState({
      activeId: 0,
      display: 99
    });
    await this.setState({
      activeId: id,
      display: action
    });

    console.log(this.state.activeId + " active id"),
      console.log(this.state.display + " display");
  }

  close() {
    this.setState({
      activeId: "",
      display: 99
    });
  }

  render() {
    const players = this.state.players.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    if (this.state.display === 1) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
          <WatchList watchList = {this.state.watchList} showWatchlist={this.showWatchlist}/>
            <PlayerInfo
              id={this.state.activeId}
              close={this.close}
              canEdit={false}
              userId={this.state.userId}
              updateWatchList={this.updateWatchlist}

            />
          </div>
        </div>
      );
    } else if (this.state.display === 2) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
          <WatchList watchList = {this.state.watchList} showWatchlist={this.showWatchlist}/>
            <TeamInfo
              id={this.state.activeId}
              close={this.close}
              canEdit={false}
              userId={this.state.userId}
            />
          </div>
        </div>
      );
    }
    if (this.state.createPlayer === true) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <h1>Players</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create">Create</button>

              <button className="btn-create">Update</button>

              <button className="btn-create">Delete</button>
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
          <WatchList showWatchlist={this.showWatchlist} close={this.close}/>
            <div className="btn-admin-config">
              <UserReturn />
            </div>

            <ListInfo
              data={players}
              name = {this.state.content[0]}
              content={this.state.content}
              contentFields={this.state.contentFields}
              ready={this.state.ready}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              firstPage={this.firstPage}
              lastPage={this.lastPage}
              canEdit={this.state.canEdit}
              userId={this.state.userId}
              currentPage={this.state.currentPage}
            />

            {this.state.createPlayer ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default Players;
