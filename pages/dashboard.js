import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import EditUser from "../components/EditUser";
import IndexReturn from "../components/buttons/IndexReturn";
import { Router } from "../routes";
import PlayerInfo from "../components/admin-view/PlayerInfo";
import UserReturn from "../components/buttons/UserReturn";

import TeamInfo from "../components/admin-view/TeamInfo";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      userId: "",
      watchList: [],
      activeId: 0,
      display: 99
    };

    this._onEditClick = this._onEditClick.bind(this);
    this.showPlayer = this.showPlayer.bind(this);
    this.showTeam = this.showTeam.bind(this);
    this.close = this.close.bind(this);
  }

  _onEditClick() {
    this.setState({
      showEdit: !this.state.showEdit
    });
  }

  _onTeamClick() {
    this.setState({
      showTeam: !this.state.showTeam
    });
  }

  _onMatchClick() {
    this.setState({
      showMatchInfo: !this.state.showMatchInfo
    });
  }

  addToWatchList() {
    var xhttp = new XMLHttpRequest();

    var json = JSON.stringify({
      playerId: this.state.activeId,

      userId: this.state.userId
    });

    console.log(json);

    xhttp.open("PUT", process.env.API_URL + "/api/watchlist", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        playerId: this.state.activeId,

        userId: this.state.userId
      })
    );
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status === 200 || xhttp.status === 201) {
          console.log("Watchlist updated");
          this.close;
        } else if (xhttp.status !== 200) {
          console.log("Failed to add to watchlist");
          this.close;
        }
      }
    };
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
        console.log(c.substring(name.length, c.length) + " is cookie");
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  async showPlayer(id) {
    await this.setState({
      activeId: id,
      display: 5
    });

    this.addToWatchList();

    console.log(this.state.activeId + " active id"),
      console.log(this.state.display + " display");
  }

  async showTeam(id) {
    await this.setState({
      activeId: id,
      display: 2
    });

    console.log(id);
  }

  close() {
    this.setState({
      activeId: "",
      display: 99
    });
  }

  async componentDidMount() {
    await this.setState({
      userId: this.getCookie()
    });

    console.log(this.state.userId + " is userId");

    /*
    try {
      const response = await fetch(process.env.API_URL + '/api/watchlist/' + this.state.userId + '/user');
      const json = await response.json();
      console.log(json);
      this.setState({
        watchList: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }*/

    this.setState({
      watchList: []
    });

    /*
        [3999, // Watchlist ID
          [2982, "Niklas Dorsch", 2984, "Maurice Multhaup"], // Player Id = i*2, Name = i*2+1
          [2355, "RRC de Waterloo", 2417, "SV Babelsberg 03"], // Team id = i*2, Name = i*2+1
        3998], // Player Id 
    */
  }

  render() {
    const watchList = [
      3999,
      [2982, "Niklas Dorsch", 2984, "Maurice Multhaup"],
      [2355, "RRC de Waterloo", 2417, "SV Babelsberg 03"],
      3998
    ];

    let players = [];

    for (var i = 0; i < watchList[1].length; i++) {
      var playerId = watchList[1][i];
      console.log(playerId + " HER er ID");
      players.push(
        <tr key={i}>
          <td
            key={watchList[1][i]}
            className="td-dashboard-watchlist-user"
            onClick={() => this.showPlayer(playerId)}
          >
            {watchList[2][i]}
          </td>
        </tr>
      );
    }

    let teams = [];

    for (var i = 0; i < watchList[3].length; i++) {
      var teamId = watchList[3][i];
      teams.push(
        <tr key={i + i * 10}>
          <td
            key={watchList[3][i]}
            className="td-dashboard-watchlist-user"
            onClick={() => this.showTeam(teamId)}
          >
            {watchList[4][i]}
          </td>
        </tr>
      );
    }

    if (this.state.display === 1) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <PlayerInfo
              id={this.state.activeId}
              close={this.close}
              canEdit={false}
              userId={this.state.userId}
            />
          </div>
        </div>
      );
    } else if (this.state.display === 2) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <TeamInfo
              id={this.state.activeId}
              close={this.close}
              canEdit={false}
              userId={this.state.userId}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">

          <div className="dashboard-watchlist-container">
          <table className="dashboard-watchlist-user">
                <tbody>
                  <tr>
                    <th key={0} className="th-dashboard-watchlist-user">
                      Watchlist
                    </th>
                  </tr>
                  <tr>
                    <th key={1} className="th-dashboard-watchlist-user">
                      Teams
                    </th>
                  </tr>

                  {players}

                  <tr>
                    <th key={2} className="th-dashboard-watchlist-user">
                      Teams
                    </th>
                  </tr>
                  {teams}
                </tbody>
              </table>
          </div>
            <div className="btn-admin-nav">
            

              <button
                className="btn-nav"
                id="btn-players"
                onClick={() => Router.pushRoute("/dashboard/players")}
              >
                Players
              </button>

              <button
                className="btn-nav"
                id="btn-teams"
                onClick={() => Router.pushRoute("/dashboard/teams")}
              >
                Teams
              </button>
            </div>

            <div className="btn-admin-nav-bottom">
              <button
                className="btn-nav"
                id="btn-managers"
                onClick={() => Router.pushRoute("/dashboard/managers")}
              >
                Managers
              </button>

              <button
                className="btn-nav"
                id="btn-matches"
                onClick={() => Router.pushRoute("/dashboard/matches")}
              >
                Matches
              </button>

              <button
                className="btn-nav"
                id="btn-stadium"
                onClick={() => Router.pushRoute("/dashboard/stadiums")}
              >
                Stadiums
              </button>
            </div>
            <button
              type="button"
              className="btn-edit"
              onClick={this._onEditClick}
            >
              Edit account
            </button>
            <div className="div-edituser">
              {this.state.showEdit ? <EditUser /> : null}
            </div>
          </div>

          <IndexReturn />
        </div>
      );
    }
  }
}

export default Dashboard;
