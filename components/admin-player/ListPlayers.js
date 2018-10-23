import React, { Component } from "react";
import PlayerInfo from "./PlayerInfo";

class ListPlayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      ready: false,
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
      })
  }

  async componentDidMount() {
    // "await fetch(`http://localhost:5000/api/user/all`);"
    console.log("Hey");
    try {
      const response = await fetch(`http://localhost:5000/api/player/all`);
        const json = await response.json();
      console.log(json);
      this.setState({
        players: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const players = this.state.players.map(player => {
      return (
        <li key={player.playerId}>
          <button
            className="btn-admin-player"
            onClick={() => this.showPlayer(player.playerId)}
          >
            {player.playerId + " "}
          </button>
        </li>
      );
    });

    if (this.state.ready === false) {
      return (
        <div>
          Heihei
          <br />
          Vi venter på info
        </div>
      );
    } else if (this.state.displayPlayer === true) {
      return (
        <div>
          <div>
            <PlayerInfo id={this.state.activePlayer} />
          </div>
          <button
            className="btn-admin-player"
            onClick={this.closePlayer}
          >
           Back
          </button>
        </div>
      );
    } else {
      return (
        <div>
            <br/>
          <ul>{players}</ul>
          <br />
        </div>
      );
    }
  }
}

export default ListPlayers;

/*


 onClick={this.showPlayer}
   



     
      */
