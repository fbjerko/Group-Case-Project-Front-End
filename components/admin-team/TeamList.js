import React, { Component } from "react";
import TeamInfo from "./TeamInfo";
import ManagerInfo from "../admin-manager/ManagerInfo";

class TeamList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTeam: "",
      activeManager: "",
      displayTeam: false,
      displayManager: false
    };

    this.showTeam = this.showTeam.bind(this);
    this.close = this.close.bind(this);
    this.showManager = this.showManager.bind(this);
  }

  showTeam(id) {
    console.log("huhuhuhu" + id);
    this.setState({
      activeTeam: id,
      displayTeam: true,
      displayManager: false
    });
  }

  showManager(id) {
    console.log("DSHUAHUASD" + id);
    this.setState({
      activeManager: id,
      displayManager: true,
      displayTeam: false
    });
  }

  close() {
    this.setState({
      activeTeam: "",
      displayTeam: false,
      displayManager: false
    });
  }

  render() {
    const teams = this.props.teams.map(team => {
      return (
        <tr key={team[0]} className="tr-admin-get-all">
          <td
            className="td-admin-get-all"
            onClick={() => this.showTeam(team[0])}
          >
            {team[1]} {""}
          </td>

          <td key={team[2]}
            className="td-admin-get-all"
            onClick={() => this.showManager(team[2])}
          >
            {team[3]} {""}
          </td>
        </tr>
      );
    });

    if (this.props.ready === false) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    } else if (this.state.displayTeam === true) {
      return (
        <div>
          <TeamInfo id={this.state.activeTeam} close={this.close} />
        </div>
      );
    } else if (this.state.displayManager === true) {
      return (
        <div>
          <ManagerInfo id={this.state.activeManager} close={this.close} />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Teams</h1>
          <div className="div-admin-get-all">
            <table className="table-admin-get-all">
              <tbody>
                <tr className="tr-admin-get-all">
                  <th className="th-admin-get-all"> Name</th>
                  <th className="th-admin-get-all"> Manager</th>
                </tr>

                {teams}
              </tbody>
            </table>

            <table className="table-admin-but">
              <tbody>
                <tr>
                  <td className="td-admin-but" onClick={this.props.firstPage}>
                    First Page
                  </td>
                  <td
                    className="td-admin-but"
                    onClick={this.props.previousPage}
                  >
                    Previous Page
                  </td>
                  <td className="td-admin-but" onClick={this.props.nextPage}>
                    Next Page
                  </td>
                  <td className="td-admin-but" onClick={this.props.lastPage}>
                    Last Page
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default TeamList;
