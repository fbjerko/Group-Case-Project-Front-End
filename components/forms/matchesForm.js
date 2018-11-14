import React from "react";
import Popupp from "../popupp";
import SearchField from "../admin-create/SearchField";

class MatchesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      team1: "",
      team1Name: "",
      team2Name: "",
      team2: "",
      team_1: "",
      team_2: "",
      match_date: "",
      season_id: "",
      location_id: "",
      showPop: false,
      status: "Nothing",
      team_1_players: [],
      team_2_players: [],
      selectedPlayers: [],
      step: 1,
      ready: false,
      vs: "",
      nextText: "Next"
    };
    this.selectPlayers = this.selectPlayers.bind(this);
    this.updateSearchFieldLocation = this.updateSearchFieldLocation.bind(this);
    this.updateSearchFieldSeason = this.updateSearchFieldSeason.bind(this);
    this.sendMatch = this.sendMatch.bind(this);
  }

  async updateSearchFieldSeason(id) {
    console.log(id + " is ID" );
    await this.setState({ 
      season_id: id 
    });
  }

  async updateSearchFieldLocation(id) {
    console.log(id + " is ID" );
    await this.setState({ location_id: id });
  }

  updateSearchFieldTeam1(id) {
    const url = process.env.API_URL + "/api/team/getPlayersByTeamId/" + id;
    fetch(url, {
      credentials: "include",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).then(response =>
      response.json().then(body => {
        this.setState({
          team_1_players: body,
          team_1: id
        });
      })
    );
  }

  updateSearchFieldTeam2(id) {
    const url = process.env.API_URL + "/api/team/getPlayersByTeamId/" + id;
    fetch(url, {
      credentials: "include",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).then(response =>
      response.json().then(body => {
        this.setState({ team_2_players: body, team_2: id });
      })
    );
  }

  updateInput = event => {
    if (event.target.id == "match_date") {
      this.setState({ match_date: event.target.value });
    }
    console.log(this.state.match_date + "is date");
  };

  sendMatch() {
  
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", process.env.API_URL + "/api/footballMatch", true);
    xhttp.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
   
    xhttp.withCredentials = true;
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
       playersId: this.state.selectedPlayers,
        date: this.state.match_date,
        homeTeamId: this.state.team1,
        awayTeamId: this.state.team2,
        seasonId: this.state.season_id,
        locationId: this.state.location_id
      })
    );

  

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status == 201) {
          this.setState({ status: "Created" });
        
        } else if (xhttp.status == 403) {
          this.setState({ status: "Failed to create" });
        }
        this.setState({ showPop: true });
      }
    };
  }


  selectedPlayers = [];
  async selectPlayers(id) {

    if(id === -1) {
      await this.setState({
        selectedPlayers: this.selectedPlayers
      })
  
    } else {
  
    this.selectedPlayers.push(id);
    document.getElementById(id).style.color = "yellow";
    document.getElementById(id).style.background = "rgb(99, 97, 97)";

    }
  
  }

  async componentDidMount() {
    if (this.props.teams === undefined) {
      try {
        const response = await fetch(process.env.API_URL + "/api/team/all", {
          credentials: "include",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
        const json = await response.json();

        this.setState({
          teams: json,
          ready: true
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({
        ready: true
      });
    }
  }

  setTeam(id, name) {
    if (this.state.team1 === "" && id === this.state.team2) {
      this.setState({
        team2: "",
        team2Name: "",
        vs: ""
      });
    } else if (this.state.team1 === "") {
      if (this.state.team2 !== id) {
        this.setState({
          team1: id,
          team1Name: name,
          vs: ""
        });
      }
      this.updateSearchFieldTeam1(id);
    } else if (this.state.team1 === id) {
      this.setState({
        team1: "",
        team1Name: "",
        vs: ""
      });
      document.getElementById(id).style.background = "none";
    } else if (this.state.team2 === id) {
      this.setState({
        team2: "",
        team2Name: "",
        vs: ""
      });
      document.getElementById(id).style.background = "none";
    } else {
      this.setState({
        team2: id,
        team2Name: name,
        vs: "vs"
      });
      this.updateSearchFieldTeam2(id);
    }

    document.getElementById(id).style.background = "rgb(99, 97, 97)";
    console.log("team1 " + this.state.team1 + "| Team 2 " + this.state.team2);
  }

  render() {
    let output;
    let teams = [];

    if (this.state.ready) {
      if (this.state.step === 1) {
        console.log("1 " + this.state.selectedPlayers);
        console.log("2 " + this.state.match_date);
        console.log("3 " + this.state.team1);
        console.log("4 " + this.state.team2),
        console.log("5 " + this.state.season_id);
        console.log("6 " + this.state.location_id);
        this.props.teams.map(team => {
          teams.push(
            <tr>
              <td
                id={team[0]}
                className="td-admin-but"
                onClick={() => this.setTeam(team[0], team[1])}
              >
                {team[1]}
              </td>
            </tr>
          );
        });
        output = (
          <div className="container">
            <h1>Create new match</h1>

            <h2>Select two teams</h2>

            <h2>
              {this.state.team1Name} {this.state.vs} {this.state.team2Name}
            </h2>

            <table className="table-matches-form">
              <tbody>{teams}</tbody>
            </table>

            <table className="table-matches-form">
              <tbody>
                <tr>
                  <td
                    className="td-admin-but"
                    onClick={() => {
                      if (
                        this.state.team2Name !== "" &&
                        this.state.team1Name !== ""
                      ) {
                        this.setState({
                          step: 2
                        });
                      } else {
                        this.setState({
                          nextText: "Please select two teams"
                        });
                        setTimeout(
                          function() {
                            this.setState({
                              nextText: "Next"
                            });
                          }.bind(this),
                          1100
                        );
                      }
                    }}
                  >
                    {this.state.nextText}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
      if (this.state.step === 2) {
        console.log("1 " + this.state.selectedPlayers);
        console.log("2 " + this.state.match_date);
        console.log("3 " + this.state.team1);
        console.log("4 " + this.state.team2),
        console.log("5 " + this.state.season_id);
        console.log("6 " + this.state.location_id);
        let homeTeams = [];
        let awayTeams = [];

        this.state.team_1_players.map(player => {
          homeTeams.push(
            <tr>
              <td id={player[2]} className="td-admin-but">
                {player[2]}
              </td>
              <td
                id={player[0]}
                className="td-admin-but"
                onClick={() => this.selectPlayers(player[0])}
              >
                {player[1]}
              </td>
            </tr>
          );
        });

        this.state.team_2_players.map(player => {
          awayTeams.push(
            <tr>
              <td
                id={player[0]}
                className="td-admin-but"
                onClick={() => this.selectPlayers(player[0])}
              >
                {player[1]}
              </td>
              <td id={player[2]} className="td-admin-but">
                {player[2]}
              </td>
            </tr>
          );
        });
        output = (
          <div>
            <h1>Select Players</h1>

            <div className="div-table-matches-players">
              <table className="table-matches-form-players">
                <tbody>
                  <th
                    id={1}
                    className="th-admin-get-all-matches-result-small"
                    colSpan={2}
                    text-align="center"
                  >
                    {this.state.team1Name}
                  </th>
                  {homeTeams}
                </tbody>
              </table>

              <button
                className="btn-matches"
                onClick={() => {

                  this.selectPlayers(-1);
                  this.setState({

                    step: 3
                  }) }
                }
              >
                Next
              </button>

              <table className="table-matches-form-players">
                <tbody>
                  <th
                    id={2}
                    className="th-admin-get-all-matches-result-small"
                    colSpan={2}
                  >
                    {this.state.team2Name}
                  </th>
                  {awayTeams}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (this.state.step === 3) {
        console.log("1 " + this.state.selectedPlayers);
        console.log("2 " + this.state.match_date);
        console.log("3 " + this.state.team1);
        console.log("4 " + this.state.team2),
        console.log("5 " + this.state.season_id);
        console.log("6 " + this.state.location_id);
        output = (
          <div>
            <h1>
              {this.state.team1Name} {this.state.vs} {this.state.team2Name}
            </h1>

            <p> Select Season</p>
            <SearchField
              type={"season"}
              handleChange={this.updateSearchFieldSeason}
            />
            
            <p>Select Location</p>
            <SearchField
              type={"location"}
              handleChange={this.updateSearchFieldLocation}
            />
            <p>Match date</p>
            <input
              onChange={this.updateInput}
              value={this.state.match_date}
              type="date"
              placeholder="Write a match_date"
              id="match_date"
            />
 <br />
            <br />
            <button
             
             onClick={this.sendMatch}
              
            >
              Play
            </button>
          </div>
        );
      }

      if (this.state.showPop) {
        setTimeout(
          function() {
            this.setState({
              showPop: false
            });
            this.props.close();
          }.bind(this),
          3000
        );
        return (
          <div className="container">
            <h1>{this.state.status}</h1>
          </div>
        );
      } else {
        return <div className="container">{output}</div>;
      }
    } else {
      return <div>Loading</div>;
    }
  }
}

export default MatchesForm;

/*

<div className="create-match-container">
          <div style={{ marginRight: "50px" }}>
            <br />
            <br />
            <p>Match date</p>
            <input
              onChange={this.updateInput}
              value={this.state.match_date}
              type="date"
              placeholder="Write a match_date"
              id="match_date"
            />
            <br />
            <br />
            <p>Season</p>
            <SearchField
              type={"season"}
              handleChange={this.updateSearchFieldSeason}
            />
            <br />
            <br />
            <p>Location</p>
            <SearchField
              type={"location"}
              handleChange={this.updateSearchFieldLocation}
            />
            <br />
            <br />
            <input
              className="btn-index"
              type="button"
              value="Submit"
              onClick={this.sendMatch}
            />
          </div>
          <div style={{ width: "300px", marginLeft: "50px" }}>
            <h2>Home team:</h2>
            <table>
              <tbody>
                {this.state.team_1_players.map(player => {
                  if (
                    this.state.selectedPlayers.indexOf(player[0].toString()) !=
                    -1
                  ) {
                    return (
                      <tr
                        id={player[0]}
                        style={{ color: "yellow" }}
                        key={player[0]}
                        onClick={this.selectPlayer}
                      >
                        <td id={player[0]}>{player[1]}</td>
                        <td id={player[0]}>{player[2]}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr
                        style={{ color: "white" }}
                        key={player[0]}
                        onClick={this.selectPlayer}
                      >
                        <td id={player[0]}>{player[1]}</td>
                        <td id={player[0]}>{player[2]}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
          <div style={{ width: "300px", marginLeft: "50px" }}>
            <h2>Away team:</h2>

            <table>
              <tbody>
                {this.state.team_2_players.map(player => {
                  if (
                    this.state.selectedPlayers.indexOf(player[0].toString()) !=
                    -1
                  ) {
                    return (
                      <tr
                        id={player[0]}
                        style={{ color: "yellow" }}
                        key={player[0]}
                        onClick={this.selectPlayer}
                      >
                        <td id={player[0]}>{player[1]}</td>
                        <td id={player[0]}>{player[2]}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr
                        id={player[0]}
                        style={{ color: "white" }}
                        key={player[0]}
                        onClick={this.selectPlayer}
                      >
                        <td id={player[0]}>{player[1]}</td>
                        <td id={player[0]}>{player[2]}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>

        */
