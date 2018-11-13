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
import Players from "../admin/players";
import NavbarUser from "../../components/NavbarUser";


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
  }

  render() {
    let lng = this.state.lng;

    if (this.state.showContent === "Address") {
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
        <NavbarUser/>

        <div className="container-general">
          <h1>{i18n.t("GENERAL", { lng })}</h1>

          <div className="btn-admin-nav-general">
            <button
              className="btn-nav-general"
              id="btn-address"
              onClick={() => Router.pushRoute("admin/general/address")}
            >
              {i18n.t("ADDRESSES", { lng })}
            </button>

            <button
              className="btn-nav-general"
              id="btn-goaltype"
              onClick={() => Router.pushRoute("/admin/general/goaltypes")}
            >
              {i18n.t("GOAL_TYPES", { lng })}
            </button>

            <button
              className="btn-nav-general"
              id="btn-owner"
              onClick={() => Router.pushRoute("/admin/general/owners")}
            >
              {i18n.t("OWNERS", { lng })}
            </button>
          </div>

          <div className="btn-admin-nav-bottom-general">
            <button
              className="btn-nav-general"
              id="btn-season"
              onClick={() => Router.pushRoute("/admin/general/season")}
            >
              {i18n.t("SEASONS", { lng })}
            </button>

            <button
              className="btn-nav-general"
              id="btn-association"
              onClick={() => Router.pushRoute("/admin/general/associations")}
            >
              {i18n.t("ASSOCIATIONS", { lng })}
            </button>

            <button
              className="btn-nav-general"
              id="btn-persons"
              onClick={() => Router.pushRoute("/admin/general/persons")}
            >
              {i18n.t("PERSONS", { lng })}
            </button>

            <button
              className="btn-nav-general"
              id="btn-users"
              onClick={() => Router.pushRoute("/admin/general/users")}
            >
              {i18n.t("USERS", { lng })}
            </button>
          </div>


        </div>
      </div>
    );
  }
}
}

export default General;
