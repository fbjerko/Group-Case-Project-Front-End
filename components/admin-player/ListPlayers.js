import React, { Component } from "react";

class ListPlayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      ready: false
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`http://localhost:5000/api/players/all`);
      const json = await response.json();
      this.setState({
        players: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.ready === false) {
      return (
        <div>
          Heihei
          <br />
          Vi venter på info
        </div>
      );
    } else {
        return (
            <div>
              Her er info
              <br />
              {this.state.players}
            </div>
          );
    }
  }
}

export default ListPlayers;
