import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import { Router } from "../../routes";
import i18n from "../../i18n";
import Address from "./general/address";
import Associations from "./general/associations";
import GoalTypes from "./general/goaltypes";
import Owners from "./general/owners";
import Persons from "./general/persons";
import Seasons from "./general/season";
import Users from "./general/users";


class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: i18n.language,
      showContent: ""
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount() {
    i18n.on("languageChanged", this.onLanguageChanged);
  }
  onLanguageChanged = lng => {
    this.setState({ lng: lng });
  };

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
          <div className="btn-admin-config">
            <button
              type="button"
              className="btn-ret-admin"
              onClick={() => this.changeContent("")}
            >
              Return to Dashboard
            </button>
          </div>

          <Players  close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "Address") {
      return (
        <div>

       
          <Address close={this.changeContent}/>
          
        
        </div>
      );
    } else if (this.state.showContent === "GoalType") {
      return (
        <div>
          

          <GoalTypes close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "Owners") {
      return (
        <div>
       

          <Owners close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "Seasons") {
      return (
        <div>
         

          <Seasons close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "Associations") {
      return (
        <div>
        
          <Associations close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "Persons") {
      return (
        <div>
        
          <Persons close={this.changeContent} />
        </div>
      );
    } else if (this.state.showContent === "Users") {
      return (
        <div>
        
          <Users close={this.changeContent} />
        </div>
      );
    } else {

    

    return (
      <div>
        <LayoutGlobal />

        <div className="container-general">
          <h1>{i18n.t("GENERAL", { lng })}</h1>

          <div className="btn-admin-nav-general">
            <button
              className="btn-nav-general"
              id="btn-address"
              onClick={() => this.changeContent("Address")}
            >
              {i18n.t("ADDRESSES", { lng })}
            </button>

            <button
              className="btn-nav-general"
              id="btn-goaltype"
              onClick={() => this.changeContent("GoalType")}
            >
              {i18n.t("GOAL_TYPES", { lng })}
            </button>

            <button
              className="btn-nav-general"
              id="btn-owner"
              onClick={() => this.changeContent("Owners")}
            >
              {i18n.t("OWNERS", { lng })}
            </button>
          </div>

          <div className="btn-admin-nav-bottom-general">
            <button
              className="btn-nav-general"
              id="btn-season"
              onClick={() => this.changeContent("Seasons")}
            >
              {i18n.t("SEASONS", { lng })}
            </button>

            <button
              className="btn-nav-general"
              id="btn-association"
              onClick={() => this.changeContent("Associations")}
            >
              {i18n.t("ASSOCIATIONS", { lng })}
            </button>

            <button
              className="btn-nav-general"
              id="btn-persons"
              onClick={() => this.changeContent("Persons")}
            >
              {i18n.t("PERSONS", { lng })}
            </button>

            <button
              className="btn-nav-general"
              id="btn-users"
              onClick={() => this.changeContent("Users")}
            >
              {i18n.t("USERS", { lng })}
            </button>
          </div>

          <button
            className="btn-admin-player"
            onClick={() => this.props.close("")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}
}

export default General;
