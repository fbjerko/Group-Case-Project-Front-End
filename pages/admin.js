import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import IndexReturn from "../components/buttons/IndexReturn";
import { Router } from "../routes";
import EditUser from "../components/EditUser";
import i18n from "../i18n"




class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
       showEdit: false,
       players: false,
       lng:i18n.language
    };

    this._onEditClick = this._onEditClick.bind(this);
  }

  componentDidMount() {
    i18n.on('languageChanged', this.onLanguageChanged)
    
    }
    onLanguageChanged = (lng)=>{
    this.setState({lng:lng});
    }

  _onEditClick() {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  }

  componentDidMount() {}

  render() {
    let lng = this.state.lng;
    return (
      <div>
  <LayoutGlobal />
        
        <div className="container">
       

        <div className="btn-admin-nav">
              <button className="btn-nav" id="btn-players" onClick={() => Router.push("/admin/players")}>
              {i18n.t("PLAYERS",{lng})}
              </button>

              <button className="btn-nav" id="btn-managers" onClick={() => Router.push("/admin/managers")}>
              {i18n.t("MANAGERS",{lng})}
              </button>

              <button className="btn-nav" id="btn-teams" onClick={() => Router.pushRoute("/admin/teams")}>
              {i18n.t("TEAMS",{lng})}
              </button>

            </div>

             <div className="btn-admin-nav-bottom">
              

               <button className="btn-nav" id="btn-matches" onClick={() => Router.pushRoute("/admin/matches")}>
               {i18n.t("MATCHES",{lng})}
              </button>

              <button className="btn-nav"  id="btn-stadium" onClick={() => Router.pushRoute("/admin/stadiums")}>
              {i18n.t("STADIUMS",{lng})}
              </button>


              <button className="btn-nav" id="btn-general" onClick={() => Router.pushRoute("/admin/general")}>
              {i18n.t("GENERAL",{lng})}


              </button>
            </div>
            <button
              type="button"
              className="btn-edit"
              onClick={this._onEditClick}
              >
              {i18n.t("EDIT_ACC",{lng})}
              </button>
              <div className="div-edituser">
              {this.state.showEdit ? <EditUser /> : null}
              </div>

             </div>
              
             <IndexReturn/>
           
     
      </div>
    );
  }
}

export default Admin;
