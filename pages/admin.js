import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import IndexReturn from "../components/IndexReturn";
import { Router } from "../routes";




class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
       players: false
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
  <LayoutGlobal />
        
        <div className="container">
       

        <div className="btn-admin-nav">
              <button className="btn-nav" id="btn-players" onClick={() => Router.pushRoute("/admin/players")}>
                Players
              </button>

              <button className="btn-nav" id="btn-managers" onClick={() => Router.pushRoute("/admin/managers")}>
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

             </div>

            
             <IndexReturn/>
           
     
      </div>
    );
  }
}

export default Dashboard;
