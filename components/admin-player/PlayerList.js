import React, { Component } from "react";
import PlayerInfo from "./PlayerInfo";

class PlayerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: "",
      displayPlayer: false
    };

    this.showPlayer = this.showPlayer.bind(this);
    this.closePlayer = this.closePlayer.bind(this);
  }

  showPlayer(id) {
    console.log("huhuhuhu" + id);
    this.setState({
      activePlayer: id,
      displayPlayer: true
    });
  }

  closePlayer() {
    this.setState({
      activePlayer: "",
      displayPlayer: false
    });
  }

  render() {
    const players = this.props.players.map(player => {
      return (
        <tr
          key={player[0]}
          className="tr-admin-get-all"
          onClick={() => this.showPlayer(player[0])}
        >
          <td className="td-admin-get-all">
            {player[1]} {player[2]}{" "}
          </td>

          <td className="td-admin-get-all">{player[3]} </td>
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
          <PlayerInfo
            id={this.state.activePlayer}
            closePlayer={this.closePlayer}
          />
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

            <table className="table-admin-get-all-but">
              <tbody>
                <tr>
              <td
                  className="td-admin-list-but"
                  onClick={this.props.firstPage}
                >
                  First Page
                </td>
                <td
                  className="td-admin-list-but"
                  onClick={this.props.previousPage}
                >
                  Previous Page
                </td>
                <td className="td-admin-list-but" onClick={this.props.nextPage}>
                  Next Page
                </td>
                <td
                  className="td-admin-list-but"
                  onClick={this.props.lastPage}
                >
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
