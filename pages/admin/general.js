import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import { Router } from "../../routes";
import AdminReturn from "../../components/buttons/AdminReturn";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <LayoutGlobal />

        <div className="container">
          <h1>General</h1>
       

       <div className="btn-admin-nav">
             <button className="btn-nav-general" id="btn-address" onClick={() => Router.pushRoute("/admin/general/address")}>
               Address
             </button>

             <button className="btn-nav-general" id="btn-goaltype" onClick={() => Router.pushRoute("/admin/general/goaltypes")}>
               Goal Types
             </button>

              <button className="btn-nav-general" id="btn-owner" onClick={() => Router.pushRoute("/admin/general/owners")}>
               Owners
             </button>

           </div>

            <div className="btn-admin-nav-bottom">
              <button className="btn-nav-general" id="btn-season" onClick={() => Router.pushRoute("/admin/general/season")}>
               Season
             </button>

             <button className="btn-nav-general"  id="btn-association" onClick={() => Router.pushRoute("/admin/general/associations")}>
               Association
             </button>

              <button className="btn-nav-general" id="btn-persons" onClick={() => Router.pushRoute("/admin/general/persons")}>
               Persons
             </button>

             <button className="btn-nav-general" id="btn-users" onClick={() => Router.pushRoute("/admin/general/users")}>
               Users
             </button>
           </div>

          <AdminReturn />
        </div>
      </div>
    );
  }
}

export default General;
