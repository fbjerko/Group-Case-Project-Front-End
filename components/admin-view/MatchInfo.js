import React, { Component } from "react";
import MatchGoalForm from "../forms/matchgoalForm";

class MatchInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matchId: "0",
      matchInfo: [],
      matchGoals: [],
      ready: false,
      addGoal: false,
      status: "Nothing",
      showPop: false,
      showPopDelete: false,
    };

    this.addGoal = this.addGoal.bind(this);
  }

  async componentWillMount() {
    try {
      const response = await fetch(
        process.env.API_URL + "/api/footballMatch/" + this.props.id,
        {
          credentials: "include",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        matchInfo: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        process.env.API_URL + "/api/matchGoal/all",
        {
          credentials: "include",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        matchGoals: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update() {
    try {
      const response = await fetch(
        process.env.API_URL + "/api/matchGoal/all",
        {
          credentials: "include",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        matchGoals: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  addGoal() {
    this.setState({
      addGoal: !this.state.addGoal
    });
    this.update();
  }

  deleteMatch() {
    let xhttp = new XMLHttpRequest();
    xhttp.open(
        "DELETE",
        process.env.API_URL + "/api/footballMatch/" + this.props.id + "/delete",
        true
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"));
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            console.log("DONE");
            if (xhttp.status === 200) {
              this.setState({ status: "Match Deleted" });
                console.log("Yay");
               
            } else if (xhttp.status == 403) {
              this.setState({ status: "Failed to delete" });
             
            }
            this.setState({ showPopDelete: true });
            
        }
    };
    xhttp.send(null);
    
  }

  removeGoal(id) {
    let xhttp = new XMLHttpRequest();
    xhttp.open(
        "DELETE",
        process.env.API_URL + "/api/matchGoal/" + id + "/delete",
        true
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"));
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            console.log("DONE");
            if (xhttp.status === 200) {
              this.setState({ status: "Goal Deleted" });
                console.log("Yay");
               
            } else if (xhttp.status == 403) {
              this.setState({ status: "Failed to delete" });
             
            }
            this.setState({ showPop: true });
            this.update();
        }
    };
    xhttp.send(null);
    
}
  

  render() {
    if (this.state.showPop) {
      setTimeout(
        function() {
          this.setState({
            showPop: false
          });

        }.bind(this),
        3000
      );
      return (
        <div className="container">
          <h1>{this.state.status}</h1>
        </div>
      );
    }
    if (this.state.showPopDelete) {
      setTimeout(
        function() {
          this.setState({
            showPopDelete: false
          });
          this.props.close("");
          
        }.bind(this),
        3000
      );
      return (
        <div className="container">
          <h1>{this.state.status}</h1>
        </div>
      );
    }
    let buttons; // Decides if we can edit or not
    if (this.props.canEdit === true) {
      buttons = (
        <table className="table-admin-but">
          <tbody>
            <tr>
             
              <td className="td-admin-but" onClick={() => this.deleteMatch()}>
                DELETE MATCH
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      buttons = <br />;
    }

    let config;

    if (this.state.addGoal) {
      return (
        <MatchGoalForm
          close={this.addGoal}
          team_1_id={this.state.matchInfo.homeTeam.teamId}
          team_1_name={this.state.matchInfo.homeTeam.name}
          team_2_id={this.state.matchInfo.awayTeam.teamId}
          team_2_name={this.state.matchInfo.awayTeam.name}
          matchId={this.state.matchInfo.footballMatchId}
        />
      );
    }

    if (this.state.ready === true) {
      let goals = [];
      let result = "Not Played";
      let homeGoals = 0;
      let awayGoals = 0;

      let edit;
     

      this.state.matchGoals.map(goal => {
        if(this.state.canEdit === true) {
          edit = (
            <td className="td-admin-get-one-match-smaller"
            onClick={() => this.removeGoal(goal[0])}
            >
             x
            </td>
          )
        } else {
          edit = ("");
        }
        if (
          goal[4] ===
          this.state.matchInfo.footballMatchId
        ) {
          goals.push(
            <tr key={goal[0]} className="tr-admin-get-one">
              <td className="td-admin-get-one-match">
                {goal[7]}
              </td>
              <td className="td-admin-get-one-match">
              {goal[9]}
              </td>
              <td className="td-admin-get-one-match-small">
                {goal[3]}
              </td>
              {edit}
             
            </tr>
          );

          if (goal[7] === this.state.matchInfo.homeTeam.name) {
            homeGoals++;
          }
          if (goal[7] === this.state.matchInfo.awayTeam.name) {
            awayGoals++;
          }
        }
      });

      result = homeGoals + " - " + awayGoals;

      const match = this.state.matchInfo;

      let deleteGoal;
      let addGoal;

      if(this.state.canEdit === true) {
        deleteGoal = (
          <th className="th-admin-get-one-match-small">Delete</th>
        );
        addGoal = (
          <div className="admin-config">
            <button className="btn-create" onClick={this.addGoal}>
              Add Goal
            </button>
          </div>
        );
      } else {
        deleteGoal = ("");
        addGoal = ("");
      }

      console.log(match);
      return (
        <div className="div-admin-get-all">
        
          {addGoal}

            <h1>Match</h1>
           <table className="table-admin-get-one-match-header">
            <tbody>
            <tr className="tr-admin-get-one">
                <th className="th-admin-get-one-match-header"> Home Team </th>
                <th className="th-admin-get-one-match-small"> Result </th>
                <th className="th-admin-get-one-match-header"> Away Team</th>
              </tr>
              <tr className="tr-admin-get-one">
                <th className="th-admin-get-one-match-header"> {match.homeTeam.name}</th>
                <th className="th-admin-get-one-match-small"> {result}</th>
                <th className="th-admin-get-one-match-header"> {match.awayTeam.name}</th>
              </tr>
            </tbody>
          </table>
          <h2>Goals</h2>

          <table className="table-admin-get-one-match-header">
            <tbody>
          
              <tr className="tr-admin-get-one">
                <th className="th-admin-get-one-match">Team</th>
                <th className="th-admin-get-one-match"> Player</th>
                <th className="th-admin-get-one-match-small">Goal Type</th>
                {deleteGoal}
              </tr>

              {goals}
            </tbody>
          </table>

           <table className="table-admin-get-one-match-header">
            <tbody>
              <tr className="tr-admin-get-one">
                <th className="th-admin-get-one-match-small"> Date</th>
                <th className="th-admin-get-one-match-small"> League</th>
              </tr>
              <tr className="tr-admin-get-one">
                <td className="td-admin-get-one-match-small">{match.matchDate}</td>
                <td className="td-admin-get-one-match-small">{match.season.name}</td>
              </tr>
            </tbody>
          </table>

          {buttons}
          <button
            className="btn-dashboard-back"
            onClick={() => this.props.close("")}
          >
            Back
          </button>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default MatchInfo;

/*

   return (
        <div>
          <div className="div-admin-get-all">
            <h1>
              {match.homeTeam.name} vs {match.awayTeam.name}
            </h1>

            {buttons}
            <button
              className="btn-admin-player"
              onClick={() => this.props.close("")}
            >
              Back
            </button>
          </div>
        </div>
      );
    } else {

        */
