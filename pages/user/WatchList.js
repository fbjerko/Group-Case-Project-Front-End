import React, { Component } from "react";

class WatchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      watchList: [],
      display: 99,
      ready: false
    };

    this.deleteWatchList = this.deleteWatchList.bind(this);
  
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

  async componentDidMount() {
    await this.setState({
      watchList: this.props.watchList,
      ready: true
    }); 
  }

  handleClick(playerId, id) {

    this.props.close();
    
    this.props.showWatchlist(playerId, id);
}

  render() {
    if (this.state.ready === true) {
      let players = [];

      for (var i = 0; i < this.props.watchList[0][1].length; i++) {
        var playerId = this.props.watchList[0][1][i];
        console.log(playerId + " playerID");
      
        players.push(
          <tr key={"p" + playerId}>
            <td
              key={this.state.watchList[0][1][i]}
              className="td-dashboard-watchlist-user"
              onClick={() => this.props.showWatchlist(playerId, 1)}
            >
              {this.props.watchList[0][2][i]}
            </td>
          </tr>
        );
      }

      let teams = [];

      for (var i = 0; i < this.props.watchList[0][3].length; i++) {
        var teamId = this.props.watchList[0][3][i];
        teams.push(
          <tr key={i + i * 10}>
            <td
              key={this.props.watchList[0][3][i]}
              className="td-dashboard-watchlist-user"
              onClick={() => this.props.showWatchlist(teamId, 2)}
            >
              {this.props.watchList[0][4][i]}
            </td>
          </tr>
        );
      }
      console.log(players);

      return (
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
                  Players
                </th>
              </tr>
              {players}

              <tr>
                <th key={2} className="th-dashboard-watchlist-user">
                  Teams
                </th>
              </tr>
              {teams}

              <tr>
                <td
                  key={"Delete"}
                  className="td-admin-but"
                  onClick={() => this.deleteWatchList(this.state.userId)}
                >
                  Delete Watchlist
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
          <div>
              
          </div>
      )
      ;
    }
  }
}

export default WatchList;
