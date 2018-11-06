import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import EditUser from "../components/EditUser";
import IndexReturn from "../components/buttons/IndexReturn";
import { Router } from "../routes";
import PlayerInfo from "../components/admin-view/PlayerInfo";
import TeamInfo from "../components/admin-view/TeamInfo";
import WatchList from "./user/WatchList"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      userId: "",
      watchList: [],
      activeId: 0,
      display: 99,
      ready: false
    };

    this._onEditClick = this._onEditClick.bind(this);
    this.showWatchlist = this.showWatchlist.bind(this);
    this.deleteWatchList = this.deleteWatchList.bind(this);
    this.updateWatchList = this.updateWatchList.bind(this);
    this.close = this.close.bind(this);
  }

  _onEditClick() {
    this.setState({
      showEdit: !this.state.showEdit
    });
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

  async deleteWatchList(id) {
    var xhttp = new XMLHttpRequest();

    xhttp.open(
      "GET",
      process.env.API_URL + "/api/watchlist/" + id + "/delete",
      true
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status === 200 || xhttp.status === 201) {
          console.log("Deleted");
            this.setState({
              activeId: 0
            });
          
        } else if (xhttp.status !== 200) {
          console.log("Failed to add to watchlist");
          this.setState({
            activeId: 0
          });
        }
      }
    };
  }

  close() {
    this.setState({
      activeId: "",
      display: 99
    });
  }

  async getWatchList() {
    try {
      const response = await fetch(
        process.env.API_URL + "/api/watchlist/" + this.state.userId + "/user"
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        watchList: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    await this.setState({
      userId: this.getCookie()
    });

    this.getWatchList();
    console.log(this.state.userId + " is userId");
  
  }

  updateWatchList() {
    this.getWatchList();
    console.log("Watchlist update");
  }
  

  render() {
    if (this.state.ready === true) {

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
      } else {
        return (
          <div>
            <LayoutGlobal />

            <div className="container">
            <WatchList watchList = {this.state.watchList} showWatchlist={this.showWatchlist}/>
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
    } else {
      return (
        <div>
          <LayoutGlobal/>
          <h2>Loading...</h2>
        </div>
      );
    }
  }
}

export default Dashboard;

/*

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


          */
