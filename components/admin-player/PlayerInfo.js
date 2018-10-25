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
        playerInfo: json,
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
          <div className="div-admin-get-all">
          <h1>{player.person.firstName} {player.person.lastName}</h1>
            <table className="table-admin-get-one">
              <tbody>
              <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Player ID</th>
                  <td className="td-admin-get-one">{player.playerId}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Name</th>
                  <td className="td-admin-get-one">{player.person.firstName} {player.person.lastName}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Team</th>
                  <td className="td-admin-get-one">{player.team.name}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Number</th>
                  <td className="td-admin-get-one">{player.number}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Position</th>
                  <td className="td-admin-get-one">{player.normalPosition}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Date Of Birth</th>
                  <td className="td-admin-get-one">{player.person.dateOfBirth}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Address</th>
                  <td className="td-admin-get-one">{player.person.address.addressLine1} {player.person.address.addressLine2} {player.person.address.addressLine3}, {player.person.address.postalCode}, {player.person.address.city}, {player.person.address.country}</td>
                </tr>
                
              </tbody>
            </table>
            <table className="table-admin-but">
              <tbody>
                <tr>
              <td
                  className="td-admin-but"
                  onClick={this.props.firstPage}
                >
                  EDIT
                </td>
                <td
                  className="td-admin-but"
                  onClick={this.props.previousPage}
                >
                  DELETE
                </td>
               
                </tr>
              </tbody>
            </table>
          </div>
          <button className="btn-admin-player" onClick={this.props.closePlayer}>
            Back
          </button>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default PlayerInfo;
