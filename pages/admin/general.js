import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import { Router } from "../../routes";
import AdminReturn from "../../components/AdminReturn";

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
             <button className="btn-nav" id="btn-address" onClick={() => Router.pushRoute("/admin/general/address")}>
               Address
             </button>

             <button className="btn-nav" id="btn-locations" onClick={() => Router.pushRoute("/admin/general/location")}>
               Location
             </button>

             <button className="btn-nav" id="btn-goaltype" onClick={() => Router.pushRoute("/admin/general/goaltypes")}>
               Goal Types
             </button>

           </div>

            <div className="btn-admin-nav-bottom">
              <button className="btn-nav" id="btn-season" onClick={() => Router.pushRoute("/admin/general/season")}>
               Season
             </button>

             <button className="btn-nav"  id="btn-association" onClick={() => Router.pushRoute("/admin/general/associations")}>
               Association
             </button>

             <button className="btn-nav" id="btn-users" onClick={() => Router.pushRoute("/admin/general/users")}>
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
