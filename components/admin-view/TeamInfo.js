import React, { Component } from "react";

class TeamInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamId: "0",
      teamInfo: [],
      ready: false
    };
    this.addToWatchList = this.addToWatchList.bind(this);
  }

  async componentWillMount() {

    try {
      const response = await fetch(
          process.env.API_URL+"/api/team/" + this.props.id
      );
      const json = await response.json();
      console.log("hduashduas " + json);
      this.setState({
        teamInfo: json,
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
      teamId: this.props.id,
      teamName: name,
      userId: this.props.userId
    });

    console.log(json);

    xhttp.open("PUT", process.env.API_URL + "/api/watchlist", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        playerId: "",
        playerName: "",
        teamId: this.props.id,
        teamName: name,
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
  }

  render() {
   
    if (this.state.ready === true) {
      
      const team = this.state.teamInfo;
      const name = team.name;
      if (this.props.canEdit === true) {
      return (
        <div>
          <div className="div-admin-get-all">
            <h1>
              {team.name} 
            </h1>
            <table className="table-admin-get-one">
              <tbody>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Team ID</th>
                  <td className="td-admin-get-one">{team.teamId}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Name</th>
                  <td className="td-admin-get-one">
                    {team.name}
                  </td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Manager</th>
                  <td className="td-admin-get-one">{team.coach.person.firstName} {team.coach.person.lastName}</td>
                </tr>


                 <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Country</th>
                  <td className="td-admin-get-one"> {team.location.address.country}</td>
                </tr>
              
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Owner</th>
                  <td className="td-admin-get-one">{team.owner.person.firstName} {team.owner.person.lastName}</td>
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
                  <td className="td-admin-get-one">{team.association.name}</td>
                </tr>
                
                
              </tbody>
            </table>
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
          </div>
          <button  onClick={this.props.close}>
            Back
          </button>
        </div>
      );
    }  if (this.props.canEdit === false) {
      return (
        <div>
          <div className="div-admin-get-all">
            <h1>
              {team.name} 
            </h1>
            <table className="table-admin-get-one">
              <tbody>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Team ID</th>
                  <td className="td-admin-get-one">{team.teamId}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Name</th>
                  <td className="td-admin-get-one">
                    {team.name}
                  </td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Manager</th>
                  <td className="td-admin-get-one">{team.coach.person.firstName} {team.coach.person.lastName}</td>
                </tr>


                 <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Country</th>
                  <td className="td-admin-get-one"> {team.location.address.country}</td>
                </tr>
              
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Owner</th>
                  <td className="td-admin-get-one">{team.owner.person.firstName} {team.owner.person.lastName}</td>
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
                  <td className="td-admin-get-one">{team.association.name}</td>
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
          <button  onClick={this.props.close}>
            Back
          </button>
        </div>
      );
    }
   } else {
      return <div>Loading</div>;
    }
  }
}

export default TeamInfo;

/*

   {team.person.address.addressLine1}{" "}
                    {team.person.address.addressLine2}{" "}
                    {team.person.address.addressLine3},{" "}
                    {team.person.address.postalCode},{" "}
                    {team.person.address.city},{" "}
                    {team.person.address.country}

                    */
