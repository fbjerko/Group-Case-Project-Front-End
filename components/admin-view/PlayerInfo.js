import React, { Component } from "react";
import PlayersForm from "../../components/forms/playersForm";
import Loading from "../buttons/loading";
import i18n from "../../i18n";

class PlayerInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: "0",
      playerInfo: [],
      playerName: "",
      edit: "0",
      ready: false,
      watchListText: "",
      inWatchList: false,
      lng: i18n.language,
      failed: false,
      success: false
    };

  
    this.addToWatchList = this.addToWatchList.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);
    this.doEdit = this.doEdit.bind(this);
  }

  componentDidMount() {
    i18n.on("languageChanged", this.onLanguageChanged);
  }

  onLanguageChanged = lng => {
    this.setState({ lng: lng });
  };



  async componentDidMount() {
    console.log("ID player: " + this.props.id);

    try {
      const response = await fetch(
        process.env.FRONT_END_URL+"/test",
        {
          credentials: "include"
        }
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

  deletePlayer = () => {
    console.log(process.env.API_URL + "/api/player/" + this.props.id);
    let xhttp = new XMLHttpRequest();
    xhttp.open(
      "DELETE",
      process.env.API_URL + "/api/player/" + this.props.id,
      true
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        console.log("DONE");
        if (xhttp.status === 200) {
          this.setState({ success: true, failed: false });
          console.log("Yay");
        } else if (xhttp.status == 403) {
          this.setState({ failed: true, success: false });
          console.log("Damn");
        }
      }
    };
    xhttp.send(null);
  };

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
      playerName: name,
      userId: this.props.userId
    });

    console.log(json);

    xhttp.open("PUT", process.env.API_URL + "/api/favouriteList", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(
      JSON.stringify({
        playerId: this.props.id,
        playerName: name,
        teamId: "",
        teamName: "",
        userId: this.props.userId,
        edit: 0
      })
    );
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status === 200 || xhttp.status === 201) {
          console.log("Watchlist updated");

          if (this.state.inWatchList === true) {
            this.setState({
              watchListText: name + " Removed from Watchlist"
            });
          } else {
            this.setState({
              watchListText: name + " Added to Watchlist"
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

  doEdit(command) {
    this.setState({
      edit: command
    });
  }

  render() {
    let loading;
    let lng = this.state.lng;
    let name;

    if (this.state.success) {
      loading = (
        <Loading
          text={i18n.t("PLAYER", { lng }) + " " + i18n.t("DELETED", { lng })}
          icon={false}
        />
      );
    } else if (this.state.failed) {
      loading = (
        <Loading
          text={i18n.t("DELETE", { lng }) + " " + i18n.t("FAIL", { lng })}
          icon={false}
        />
      );
    }
    let buttons; // Decides if we can edit or not
    if (this.props.canEdit === true) {
      {
        loading;
      }
      buttons = (
        <table className="table-admin-but">
          <tbody>
            <tr>
              <td
                className="td-admin-but"
                onClick={() => this.doEdit("1")}
              >
                {i18n.t("EDIT", { lng })}
              </td>
              <td className="td-admin-but" onClick={this.deletePlayer}>
                {i18n.t("DELETE", { lng })}
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

      name = player.person.firstName + " " + player.person.lastName;

      if (this.state.edit === "1") {
          return( 
            <PlayersForm id={this.props.id} edit={"edit"} close={this.doEdit}/>
          );
      } else if (this.state.edit === "0") {
        return (
          <div>
            <div className="div-admin-get-all">
              <h1>{name}</h1>
              <table className="table-admin-get-one">
                <tbody>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one">
                      {" "}
                      {i18n.t("PLAYER", { lng })} ID
                    </th>
                    <td className="td-admin-get-one">{player.playerId}</td>
                  </tr>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one">
                      {" "}
                      {i18n.t("NAME", { lng })}
                    </th>
                    <td className="td-admin-get-one">{name}</td>
                  </tr>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one">
                      {" "}
                      {i18n.t("TEAM", { lng })}
                    </th>
                    <td className="td-admin-get-one">{player.team.name}</td>
                  </tr>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one">
                      {" "}
                      {i18n.t("NUMBER", { lng })}
                    </th>
                    <td className="td-admin-get-one">{player.number}</td>
                  </tr>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one">
                      {" "}
                      {i18n.t("POSITION", { lng })}
                    </th>
                    <td className="td-admin-get-one">
                      {player.normalPosition}
                    </td>
                  </tr>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one">
                      {" "}
                      {i18n.t("DATE_OF_BIRTH", { lng })}
                    </th>
                    <td className="td-admin-get-one">
                      {player.person.dateOfBirth}
                    </td>
                  </tr>
                  <tr className="tr-admin-get-one">
                    <th className="th-admin-get-one">
                      {" "}
                      {i18n.t("ADDRESS", { lng })}
                    </th>
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
              {i18n.t("BACK", { lng })}
            </button>
          </div>
        );
      }
    } else {
      return <Loading icon={true} text={"Loading player..."} />;
    }
  }
}

export default PlayerInfo;
