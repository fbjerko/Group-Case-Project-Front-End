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
    console.log(" PLayersss" + this.props.players);
    const players = this.props.players.map(player => {
      return (
        <button
          key={player.playerId}
          className="btn-admin-get-players"
          onClick={() => this.showPlayer(player.playerId)}
        >
          Name: {player.person.firstName} {player.person.lastName} Team: " + {player.team.name}
        </button>
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
          <div className="btn-group-admin-get-all">{players}</div>
          <button onClick={this.props.previousPage}>Previous Page</button>
          <button onClick={this.props.nextPage}>Next Page</button>
        </div>
      );
    }
  }
}

export default PlayerList;

/*


 onClick={this.showPlayer}
   



     
      */
