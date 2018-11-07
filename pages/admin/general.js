import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import { Router } from "../../routes";
import AdminReturn from "../../components/buttons/AdminReturn";
import i18n from "../../i18n"


class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng:i18n.language
    };
  }

  componentDidMount() {
    i18n.on('languageChanged', this.onLanguageChanged)
    
    }
    onLanguageChanged = (lng)=>{
    this.setState({lng:lng});
    }


  render() {
    let lng = this.state.lng;

    return (
      <div>
        <LayoutGlobal />

        <div className="container-general">
          <h1>{i18n.t("GENERAL",{lng})}</h1>
       

       <div className="btn-admin-nav-general">

             <button className="btn-nav-general" id="btn-address" onClick={() => Router.pushRoute("/admin/general/address")}>
             {i18n.t("ADDRESSES",{lng})}
             </button>

             <button className="btn-nav-general" id="btn-goaltype" onClick={() => Router.pushRoute("/admin/general/goaltypes")}>
             {i18n.t("GOAL_TYPES",{lng})}
             </button>

              <button className="btn-nav-general" id="btn-owner" onClick={() => Router.pushRoute("/admin/general/owners")}>
              {i18n.t("OWNERS",{lng})}
             </button>

           </div>


            <div className="btn-admin-nav-bottom-general">

              <button className="btn-nav-general" id="btn-season" onClick={() => Router.pushRoute("/admin/general/season")}>
              {i18n.t("SEASONS",{lng})}
             </button>

             <button className="btn-nav-general"  id="btn-association" onClick={() => Router.pushRoute("/admin/general/associations")}>
             {i18n.t("ASSOCIATIONS",{lng})}
             </button>

              <button className="btn-nav-general" id="btn-persons" onClick={() => Router.pushRoute("/admin/general/persons")}>
              {i18n.t("PERSONS",{lng})}
             </button>

             <button className="btn-nav-general" id="btn-users" onClick={() => Router.pushRoute("/admin/general/users")}>
             {i18n.t("USERS",{lng})}
             </button>
           </div>

          <AdminReturn />
        </div>
      </div>
    );
  }
}

export default General;
