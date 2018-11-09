import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import IndexReturn from "../components/buttons/Logout";
import { Router } from "../routes";
import EditUser from "../components/EditUser";
import i18n from "../i18n";
import NavbarUser from "../components/NavbarUser";
import Players from "./admin/players";
import Teams from "./admin/teams";
import Managers from "./admin/managers";
import Matches from "./admin/matches";
import Stadiums from "./admin/stadiums";
import General from "./admin/general";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      players: false,
      showContent: "",
      lng: i18n.language,
      players: []
    };

    this._onEditClick = this._onEditClick.bind(this);
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount() {
    i18n.on("languageChanged", this.onLanguageChanged);

    try {
      fetch(process.env.API_URL + "/api/player/all").then(
          (response) => response.json()
      ).then((json) => {
          this.setState({
              players: json,
              ready: true
          })
      });
  } catch (error) {
      console.log(error);
  }
  }
  onLanguageChanged = lng => {
    this.setState({ lng: lng });
  };

  _onEditClick() {
    this.setState({
      showEdit: !this.state.showEdit
    });
  }

  changeContent(contentType) {
    this.setState({
      showContent: contentType
    });
    console.log("HDDA");
  }

  render() {
    let lng = this.state.lng;

    if (this.state.showContent === "Players") {
      return (
        <div>
         

          <Players players={this.state.players}  close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "Managers") {
      return (
        <div>

       
          <Managers close={this.changeContent}/>
          
        
        </div>
      );
    } else if (this.state.showContent === "Teams") {
      return (
        <div>
          

          <Teams close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "Matches") {
      return (
        <div>
       

          <Matches close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "General") {
      return (
        <div>
         

          <General close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "Stadiums") {
      return (
        <div>
        
          <Stadiums close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "") {
      return (
        <div>
          <LayoutGlobal />
          <NavbarUser onEditClick={this._onEditClick} />
          <div className="container">
            <div className="btn-admin-nav">
              <button
                className="btn-nav"
                id="btn-players"
                onClick={() => this.changeContent("Players")}
              >
                {i18n.t("PLAYERS", { lng })}
              </button>
              <button
                className="btn-nav"
                id="btn-managers"
                onClick={() => this.changeContent("Managers")}
              >
                {i18n.t("MANAGERS", { lng })}
              </button>
              <button
                className="btn-nav"
                id="btn-teams"
                onClick={() => this.changeContent("Teams")}
              >
                {i18n.t("TEAMS", { lng })}
              </button>
            </div>

            <div className="btn-admin-nav-bottom">
              <button
                className="btn-nav"
                id="btn-matches"
                onClick={() => this.changeContent("Matches")}
              >
                {i18n.t("MATCHES", { lng })}
              </button>

              <button
                className="btn-nav"
                id="btn-stadium"
                onClick={() => this.changeContent("Stadiums")}
              >
                {i18n.t("STADIUMS", { lng })}
              </button>

              <button
                className="btn-nav"
                id="btn-general"
                onClick={() => this.changeContent("General")}
              >
                {i18n.t("GENERAL", { lng })}
              </button>
            </div>

            <div className="div-edituser">
              {this.state.showEdit ? <EditUser /> : null}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <LayoutGlobal />
          <h2>{i18n.t("LOADING", { lng })}</h2>
        </div>
      );
    }
  }
}

export default Admin;
