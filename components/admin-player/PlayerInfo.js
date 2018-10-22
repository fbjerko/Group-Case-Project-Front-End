import React from "react";

class PlayerInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: "0"
    };
  }

  render() {
    return <div>{this.playerId};</div>;
  }
}

export default PlayerInfo;
