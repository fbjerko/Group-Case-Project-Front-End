import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import IndexReturn from "../components/IndexReturn";
import NavBar from "../components/NavBar";
import { Router } from "../routes";



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
  <LayoutGlobal />
    
       
        <NavBar/>
        
        <div className="container">
        <h1>Dashboard</h1>
       

        <div className="btn-admin-nav">
              <button className="btn-nav" onClick={() => Router.pushRoute("/admin/players")}>
                Players
              </button>

              <button className="btn-nav" onClick={() => Router.pushRoute("/admin/managers")}>
                Managers
              </button>

              <button className="btn-nav" onClick={() => Router.pushRoute("/admin/teams")}>
                Teams
              </button>

               <button className="btn-nav" onClick={() => Router.pushRoute("/admin/matches")}>
                Matches
              </button>

              <button className="btn-nav" onClick={() => Router.pushRoute("/admin/stadiums")}>
                Stadiums
              </button>

              <button className="btn-nav" onClick={() => Router.pushRoute("/admin/users")}>
                Users
              </button>
            </div>

             </div>
        

        
       
        <IndexReturn
        />
      </div>
    );
  }
}

export default Dashboard;
