import React, { Component } from "react";
import PlayersForm from "../../components/forms/playersForm";
import Loading from "../buttons/loading";

class PlayerInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: "0",
      playerInfo: [],
      edit: false,
      ready: false
    };


    this._edit = this._edit.bind(this);
        this.addToWatchList = this.addToWatchList. bind(this);
  


  }



  _edit() {
    this.setState({
      edit: !this.state.edit
    });

  }
  

  async componentDidMount() {

    console.log("ID player: " + this.props.id );

    try {
      const response = await fetch(
        process.env.API_URL + "/api/player/" + this.props.id
      );
      const json = await response.json();

      console.log(json);
      await this.setState({

        playerInfo: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  addToWatchList(name) {
    console.log(this.props.id + " ID FROM");
    var xhttp = new XMLHttpRequest();

    var json = JSON.stringify({
      playerId: this.props.id,
      playerName: name,
      userId: this.props.userId
    });

    console.log(json);

    xhttp.open("PUT", process.env.API_URL + "/api/watchlist", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        playerId: this.props.id,
        playerName: name,
        userId: this.props.userId
      })
    );
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status === 200 || xhttp.status === 201) {
          console.log("Watchlist updated");
          this.props.close;
        } else if (xhttp.status !== 200) {
          console.log("Failed to add to watchlist");
          this.props.close;
        }
      }
    };

    /*

    watchlistId
    playerId
    teamID
    userId

    */
  }

  render() {

    if(this.state.ready === true){


    const player = this.state.playerInfo;

    const name = player.person.firstName + " " + player.person.lastName;



    
    if (this.props.canEdit === true) {

      return (
        <div>
          <div className="div-admin-get-all">
            <h1>
              {player.person.firstName} {player.person.lastName}
            </h1>
            <table className="table-admin-get-one">
              <tbody>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Player ID</th>
                  <td className="td-admin-get-one">{player.playerId}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Name</th>
                  <td className="td-admin-get-one">
                    {player.person.firstName} {player.person.lastName}
                  </td>
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
                  <td className="td-admin-get-one">
                    {player.person.dateOfBirth}
                  </td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Address</th>
                  <td className="td-admin-get-one">
                    {player.person.address.addressLine1}{" "}
                    {player.person.address.addressLine2}{" "}
                    {player.person.address.addressLine3},{" "}
                    {player.person.address.postalCode},{" "}
                    {player.person.address.city},{" "}
                    {player.person.address.country}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table-admin-but">
              <tbody>
                <tr>


                  <td className="td-admin-but" onClick={()=>this.props.editPlayer(this.props.id)}>
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
          <button className="btn-admin-player" onClick={this.props.close}>
            Back
          </button>
        </div>
      );

    } 
    if (this.props.canEdit === false) {
      return (
        <div>
          <div className="div-admin-get-all">
            <h1>
              {player.person.firstName} {player.person.lastName}
            </h1>
            <table className="table-admin-get-one">
              <tbody>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Player ID</th>
                  <td className="td-admin-get-one">{player.playerId}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Name</th>
                  <td className="td-admin-get-one">
                    {player.person.firstName} {player.person.lastName}
                  </td>
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
                  <td className="td-admin-get-one">
                    {player.person.dateOfBirth}
                  </td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Address</th>
                  <td className="td-admin-get-one">
                    {player.person.address.addressLine1}{" "}
                    {player.person.address.addressLine2}{" "}
                    {player.person.address.addressLine3},{" "}
                    {player.person.address.postalCode},{" "}
                    {player.person.address.city},{" "}
                    {player.person.address.country}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table-admin-but">
              <tbody>
                <tr>

                  <td
                    className="td-admin-but"
                    onClick={() => this.addToWatchList(name)}
                  >
                    Add to Watchlist

            
                </td>
               

                </tr>
              </tbody>
            </table>
          </div>
          <button className="btn-admin-player" onClick={this.props.close}>
            Back
          </button>
        </div>
      );

    }
    


    } else {
      return <Loading icon={true} text={"Loading player..."}/>;
    }
  }
}

export default PlayerInfo;
