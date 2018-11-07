import React, { Component } from "react";
import PlayersForm from "../../components/forms/playersForm";
import Loading from "../buttons/loading";
import i18n from "../i18n"

class PlayerInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: "0",
      playerInfo: [],
      playerName: "",
      edit: false,
      ready: false,
      watchListText: "",
      inWatchList: false,
      lng:i18n.language
    };

    this._edit = this._edit.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);


  }

  componentDidMount() {
    i18n.on('languageChanged', this.onLanguageChanged)
    
    }
    onLanguageChanged = (lng)=>{
    this.setState({lng:lng});
    }

  _edit() {
    this.setState({
      edit: !this.state.edit
    });
  }

  async componentDidMount() {
    console.log("ID player: " + this.props.id);

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
      playerId: this.props.id,
      playerName: this.name,
      userId: this.props.userId
    });

    console.log(json);

    xhttp.open("PUT", process.env.API_URL + "/api/watchlist", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        playerId: this.props.id,
        playerName: this.name,
        teamId: "",
        teamName: "",
        userId: this.props.userId
      })
    );
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status === 200 || xhttp.status === 201) {
          console.log("Watchlist updated");

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





  render(){

    let lng = this.state.lng;
    let buttons; // Decides if we can edit or not
    if (this.props.canEdit === true) {
      buttons = (
        <table className="table-admin-but">
          <tbody>
            <tr>
              <td className="td-admin-but" onClick={()=>this.props.editPlayer(this.props.id)}>
              {i18n.t("EDIT",{lng})}
              </td>
              <td className="td-admin-but" onClick={this.props.previousPage}>
              {i18n.t("DELETE",{lng})}
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
      const player = this.state.playerInfo;

      this.name= player.person.firstName + " " + player.person.lastName
    
        
      return (
        <div>
          <div className="div-admin-get-all">
            <h1>
            {this.name}
            </h1>
            <table className="table-admin-get-one">
              <tbody>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> {i18n.t("PLAYER",{lng})} ID</th>
                  <td className="td-admin-get-one">{player.playerId}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> {i18n.t("NAME",{lng})}</th>
                  <td className="td-admin-get-one">
                  {this.name}
                  </td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> {i18n.t("TEAM",{lng})}</th>
                  <td className="td-admin-get-one">{player.team.name}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> {i18n.t("NUMBER",{lng})}</th>
                  <td className="td-admin-get-one">{player.number}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> {i18n.t("POSITION",{lng})}</th>
                  <td className="td-admin-get-one">{player.normalPosition}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> {i18n.t("DATE_OF_BIRTH",{lng})}</th>
                  <td className="td-admin-get-one">
                    {player.person.dateOfBirth}
                  </td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> {i18n.t("ADDRESS",{lng})}</th>
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
            {buttons}
          </div>
          <button className="btn-admin-player" onClick={this.props.close}>
          {i18n.t("BACK",{lng})}
          </button>
        </div>
      );


    }
    



    if (this.state.ready === true && this.state.edit === true) {
      return <PlayersForm id={this.props.id} edit={"edit"} />;
    } else {
      return <Loading icon={true} text={"Loading player..."}/>;
    }
  }
}

export default PlayerInfo;
