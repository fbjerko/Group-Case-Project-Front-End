import React, { Component } from "react";
import PlayerInfo from "./PlayerInfo";
import TeamInfo from "../admin-team/TeamInfo";

class PlayerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: "",
      displayPlayer: false,
      displayTeam: false
    };

    this.showPlayer = this.showPlayer.bind(this);
    this.close = this.close.bind(this);
    this.showTeam = this.showTeam.bind(this);
  }

  showPlayer(id) {
    console.log("huhuhuhu" + id);
    this.setState({
      activeId: id,
      displayPlayer: true,
      displayTeam: false
    });
  }

  showTeam(id) {
    this.setState({
      activeId: id,
      displayTeam: true,
      displayPlayer: false
    });
  }

  close() {
    this.setState({
      activeId: "",
      displayPlayer: false,
      displayTeam: false
    });
  }

  render() {
    const players = this.props.players.map(player => {
      return (
        <tr key={player[0]} className="tr-admin-get-all">
          <td
            className="td-admin-get-all"
            onClick={() => this.showPlayer(player[0])}
          >
            {player[1]}{" "}
          </td>

          <td
            className="td-admin-get-all"
            key={player[2]}
            onClick={() => this.showTeam(player[2])}
          >
            {player[3]}{" "}
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
    } else if (this.state.displayPlayer === true) {
      return (
        <div>
          <PlayerInfo id={this.state.activeId} close={this.close} />
        </div>
      );
    } else if (this.state.displayTeam === true) {
      return (
        <div>
          <TeamInfo id={this.state.activeId} close={this.close} />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Players</h1>
          <div className="div-admin-get-all">
            <table className="table-admin-get-all">
              <tbody>
                <tr className="tr-admin-get-all">
                  <th className="th-admin-get-all"> Name</th>
                  <th className="th-admin-get-all"> Team</th>
                </tr>

                {players}
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

export default PlayerList;

/*


 onClick={this.showPlayer}
   



     
      */
