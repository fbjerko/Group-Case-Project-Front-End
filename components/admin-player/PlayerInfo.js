import React, { Component } from "react";

class PlayerInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: "0",
      playerInfo: [],
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
        playerInfo: json ,
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
          <p>ID: {player.playerId}</p>
          <p>First Name: {player.person.firstName}</p>
          <p>Last Name: {player.person.lastName}</p>
          <p>Date Of Birth: {player.person.dateOfBirth}</p>
          <p>Country: {player.person.address.country}</p>
          <p>Team: {player.team.name}</p>
          

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
