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

        <div className="container-general">
          <h1>General</h1>
       

<<<<<<< HEAD
=======

>>>>>>> c894072413b5bee388abf25b9fff0bc77c563c06
       <div className="btn-admin-nav-general">

             <button className="btn-nav-general" id="btn-address" onClick={() => Router.pushRoute("/admin/general/address")}>
               Address
             </button>


             <button className="btn-nav-general" id="btn-locations" onClick={() => Router.pushRoute("/admin/general/location")}>
               Location
             </button>

<<<<<<< HEAD
=======

>>>>>>> c894072413b5bee388abf25b9fff0bc77c563c06
             <button className="btn-nav-general" id="btn-goaltype" onClick={() => Router.pushRoute("/admin/general/goaltypes")}>
               Goal Types
             </button>

              <button className="btn-nav-general" id="btn-owner" onClick={() => Router.pushRoute("/admin/general/owners")}>
               Owners
             </button>

           </div>


            <div className="btn-admin-nav-bottom-general">

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
