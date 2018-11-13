import React from "react";
import Popupp from "../popupp";
import SearchField from "../admin-create/SearchField";

class MatchGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team_1: "",
      team_2: "",
      goalType: "",
      desc: "A goal for the history books",
      showPop: false,
      status: "Nothing",
      team_1_players: [],
      team_2_players: [],
      selectedPlayers: [],
      ready: false,
      step: 1,
      activeId: "",
      activePlayer: "",
      activePlayerName: "",
      homeOrAway: ""
    };
  }

  updateSearchFieldGoal = id => {
    console.log(id);
    this.setState({ goalType: id });
  };

  async updateSearchFieldTeam1(id) {
    try {
      const response = await fetch(
        process.env.API_URL + "/api/team/getPlayersByTeamId/" + id,
        {
          credentials: "include",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        team_1_players: json,
        team_1: id
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateSearchFieldTeam2(id) {
    try {
      const response = await fetch(
        process.env.API_URL + "/api/team/getPlayersByTeamId/" + id,
        {
          credentials: "include",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        team_2_players: json,
        team_2: id,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentWillMount() {
    await this.updateSearchFieldTeam1(this.props.team_1_id);
    await this.updateSearchFieldTeam2(this.props.team_2_id);
  }

  sendMatchGoal = () => {
    var xhttp = new XMLHttpRequest();

    let json = (
      JSON.stringify({
        description: this.state.desc,
        goalTypeId: this.state.goalType,
        playerId: this.state.activePlayer,
        footballMatchId: this.props.matchId,
        
        
      })
    );

    console.log(json);

    xhttp.open("POST", process.env.API_URL + "/api/matchGoal", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization","Bearer " + localStorage.getItem("token"));
    xhttp.withCredentials = true;
    xhttp.send(
      JSON.stringify({
        goalTypeId: this.state.goalType,
        footballMatchId: this.props.matchId,
        description: this.state.desc,
        playerId: this.state.activePlayer,
        teamId: this.state.activeId
      })
    );
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status == 201) {
          console.log("Created");
          this.setState({ status: "Created" });
        } else if (xhttp.status == 403) {
          console.log("Failed to create");
          this.setState({ status: "Failed to create" });
        }
        this.setState({ showPop: true });
      }
    };
  };
  selectPlayer = event => {
    let selectedPlayers = this.state.selectedPlayers.slice(0);

    if (selectedPlayers.indexOf(event.target.id) === -1) {
      selectedPlayers.push(event.target.id);
    } else {
      selectedPlayers.splice(selectedPlayers.indexOf(event.target.id), 1);
    }

    this.setState({ selectedPlayers });
  };

  render() {
    let output;

    console.log(this.state.step + " is step");

    if (this.state.step === 1) {
      output = (
        <div>
          <h1>Create New MatchGoal</h1>

          <h2>Select team</h2>

          <table className="table-admin-matchgoal-but">
            <tbody>
              <tr>
                <td
                  className="td-admin-but"
                  onClick={() =>
                    this.setState({
                      step: 2,
                      activeId: this.props.team_1_id,
                      activeName: this.props.team_1_name,
                      homeOrAway: "Home"
                    })
                  }
                >
                  <h2>{this.props.team_1_name}</h2>
                </td>
                <td
                  className="td-admin-but"
                  onClick={() =>
                    this.setState({
                      step: 2,
                      activeId: this.props.team_2_id,
                      activeName: this.props.team_2_name,
                      homeOrAway: "Away"
                    })
                  }
                >
                  <h2>{this.props.team_2_name}</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (this.state.step === 2) {
      let players;
      if (this.state.homeOrAway === "Home") {
        players = this.state.team_1_players;
      } else if (this.state.homeOrAway === "Away") {
        players = this.state.team_2_players;
      } else {
        this.setState({
          step: 1
        });
      }

      output = (
        <div>
          <h1>Create New MatchGoal</h1>
          <h2>Select Player</h2>

          <h2>{this.state.activeName}:</h2>
          <div className="div-admin-get-all">
            <table>
              <tbody>
                <tr>
                  <th>Player</th>
                  <th>Position</th>
                </tr>
                {players.map(player => {
                  return (
                    <tr onClick={this.selectPlayer}>
                      <td
                        className="td-admin-matchgoal"
                        id={player[0]}
                        onClick={() =>
                          this.setState({
                            step: 3,
                            activePlayer: player[0],
                            activePlayerName: player[1]
                          })
                        }
                      >
                        {player[1]}
                      </td>
                      <td id={player[0] + "p"}>{player[2]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (this.state.step === 3) {
      output = (
        <div>
          <h1>Create New MatchGoal</h1>
          <br />
          <h2>{this.state.activePlayerName} scored a goal for {this.state.activeName}!</h2>
          <br />
          <h2>Please specify the goal type:</h2>

          <p>Goal type</p>
          <SearchField
            type={"goalType"}
            handleChange={this.updateSearchFieldGoal}
          />
          <br />
          <br />
          <p>Description</p>
          <input
            onChange={this.updateInput}
            
            type="text"
            placeholder="Write a description"
            id="description"
          />
          <br />
          <br />
          <input
            className="btn-index"
            type="button"
            value="Submit"
            onClick={this.sendMatchGoal}
          />
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
    }

    if (this.state.ready) {
      return (
        <div className="container">
          <div>{output}</div>

          <button className="btn-dashboard-back" onClick={this.props.close}>
            Back
          </button>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default MatchGoal;

/*

 <div className="create-match-container">
          <div style={{ marginRight: "50px" }}>
            <h2>Create new match goal</h2>
           
            <p>Goal type</p>
            <SearchField
              type={"goalType"}
              handleChange={this.updateSearchFieldGoal}
            />
            <br />
            <br />
            <p>Description</p>
            <input
              onChange={this.updateInput}
              value={this.state.desc}
              type="text"
              placeholder="Write a description"
              id="description"
            />
            <br />
            <br />
            <input
              className="btn-index"
              type="button"
              value="Submit"
              onClick={this.sendMatchGoal}
            />

            <button className="btn-dashboard-back" onClick={this.props.close}>
              Back
            </button>
          </div>
          <div style={{ width: "300px", marginLeft: "50px" }}>
            <h2>{this.props.team_1_name}:</h2>
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
            <h2>{this.props.team_2_name}:</h2>

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
      );
    }
    */
