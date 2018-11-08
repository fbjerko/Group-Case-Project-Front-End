import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import IndexReturn from "../components/buttons/IndexReturn";
import { Router } from "../routes";
import EditUser from "../components/EditUser";




class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
       showEdit: false,
       players: false
    };

    this._onEditClick = this._onEditClick.bind(this);
  }

  _onEditClick() {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div>
  <LayoutGlobal />
        
        <div className="container">
       

        <div className="btn-admin-nav">
              <button className="btn-nav" id="btn-players" onClick={() => Router.push("/admin/players")}>
                Players
              </button>

              <button className="btn-nav" id="btn-managers" onClick={() => Router.push("/admin/managers")}>
                Managers
              </button>

              <button className="btn-nav" id="btn-teams" onClick={() => Router.pushRoute("/admin/teams")}>
                Teams
              </button>

            </div>

             <div className="btn-admin-nav-bottom">
              

               <button className="btn-nav" id="btn-matches" onClick={() => Router.pushRoute("/admin/matches")}>
                Matches
              </button>

              <button className="btn-nav"  id="btn-stadium" onClick={() => Router.pushRoute("/admin/stadiums")}>
                Stadiums
              </button>


              <button className="btn-nav" id="btn-general" onClick={() => Router.pushRoute("/admin/general")}>
                General


              </button>
            </div>
            <button
              type="button"
              className="btn-edit"
              onClick={this._onEditClick}
              >
              Edit account
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
