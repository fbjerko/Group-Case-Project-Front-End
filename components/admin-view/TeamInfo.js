import React, { Component } from "react";

class TeamInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamId: "0",
      teamInfo: [],
      ready: false,
      watchListText: "",
      inWatchList: false
    };
    this.addToWatchList = this.addToWatchList.bind(this);
  }

  async componentWillMount() {
    try {
      const response = await fetch(
        process.env.API_URL + "/api/team/" + this.props.id,{
              credentials: 'include',headers:{Authorization:"Bearer "+localStorage.getItem("token")}
          }
      );
      const json = await response.json();

      this.setState({
        teamInfo: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }

    if (this.state.inWatchList === true) {
      this.setState({
        watchListText: "Remove from Watchlist"
      });
    } else {
      this.setState({
        watchListText: "Add to Watchlist"
      });
    }
  }

  addToWatchList(name) {
    if (this.state.inWatchList === true) {
      this.setState({
        watchListText: "Removing..."
      });
    } else {
      this.setState({
        watchListText: "Adding to Watchlist..."
      });
    }
    console.log(this.props.id + " ID FROM");
    var xhttp = new XMLHttpRequest();

    var json = JSON.stringify({
      teamId: this.props.id,
      teamName: name,
      userId: this.props.userId
    });

    console.log(json);

    xhttp.open("PUT", process.env.API_URL + "/api/favouriteList", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"))
    xhttp.withCredentials=true;
    xhttp.send(
      JSON.stringify({
        teamId: this.props.id,
        teamName: this.name,
        playerId: "",
        playerName: "",
        userId: this.props.userId
      })
    );
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status === 200 || xhttp.status === 201) {
          if (this.state.inWatchList === true) {
            this.setState({
              watchListText: this.name + " Removed from Watchlist"
            });
          } else {
            this.setState({
              watchListText: this.name + " Added to Watchlist"
            });
            this.props.updateWatchList;
            setTimeout(
              function() {
                this.setState({
                  watchListText: "Remove from Watchlist"
                });
              }.bind(this),
              2000
            );
          }
        } else if (xhttp.status !== 200) {
          console.log("Failed to add to watchlist");
          this.setState({
            watchListText: "Failed. Try adding again"
          });
        }
      }
    };
  }

  render() {

    let buttons;
    if(this.props.canEdit === true) {
      buttons = (
        <table className="table-admin-but">
        <tbody>
          <tr>
            <td className="td-admin-but" onClick={this.props.firstPage}>
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
      );
    } else {
      buttons = (
        <table className="table-admin-but">
        <tbody>
          <tr>
            <td
              className="td-admin-but"
              onClick={() => this.addToWatchList(name)}
            >
              {this.state.watchListText}
            </td>
          </tr>
        </tbody>
      </table>
      );
    }
    if (this.state.ready === true) {
      const team = this.state.teamInfo;

      this.name = team.name;
        return (
          <div>
            <div className="div-admin-get-all">
              <h1>{this.name}</h1>
              <table className="table-admin-get-one">
                <tbody>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one"> Team ID</th>
                    <td className="td-admin-get-one">{team.teamId}</td>
                  </tr>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one"> Name</th>
                    <td className="td-admin-get-one">{this.name}</td>
                  </tr>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one"> Manager</th>
                    <td className="td-admin-get-one">
                      {team.coach.person.firstName} {team.coach.person.lastName}
                    </td>
                  </tr>

                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one"> Country</th>
                    <td className="td-admin-get-one">
                      {team.location.address.country}
                    </td>
                  </tr>

                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one"> Owner</th>
                    <td className="td-admin-get-one">
                      {team.owner.person.firstName} {team.owner.person.lastName}
                    </td>
                  </tr>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one"> Address</th>
                    <td className="td-admin-get-one">
                      {team.location.address.addressLine1}
                      {team.location.address.addressLine2}
                      {team.location.address.addressLine3},
                      {team.location.address.postalCode},
                      {team.location.address.city}
                    </td>
                  </tr>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one"> Association</th>
                    <td className="td-admin-get-one">
                      {team.association.name}
                    </td>
                  </tr>
                </tbody>
              </table>
            {buttons}
            </div>
            <button onClick={this.props.close}>Back</button>
          </div>
        );
      }
      else {
      return <div>Loading</div>;
    }
  }
}

export default TeamInfo;

