import React, { Component } from "react";

class PlayerInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: "0",
      playerInfo: "",
      ready: false
    };
  }

  async componentWillMount() {
    // "await fetch(`http://localhost:5000/api/user/all`);"
    console.log("Hey");
    try {
      const response = await fetch(
        `http://localhost:5000/api/player/` + this.props.id
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        playerInfo: json + "",
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const player = this.state.playerInfo;
    if (this.state.ready === true) {
      return (
        <div>
          <h1>ID: {player.playerId}</h1>
          <br />
          {player[1] + ""}
          <br />
          <h2>Her henter vi info om hver enkelt spiller</h2>
        </div>
      );
    }
    else {
      return(
        <div>Loading</div>
      )
    }
  } 
}

export default PlayerInfo;
