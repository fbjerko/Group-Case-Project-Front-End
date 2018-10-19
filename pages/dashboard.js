import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import EditUser from "../components/EditUser";
import TeamsInfo from "../components/TeamsInfo";
import { Router } from "../routes";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      showTeam: false,
      userInfo: ["Tonje", "Lasse", "Fredrik", "Karoline"]
    };

    this._onEditClick = this._onEditClick.bind(this);
    this._onTeamClick = this._onTeamClick.bind(this);

  }

  

  _onEditClick() {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  }

  _onTeamClick() {
    this.setState({
      showTeam: !this.state.showTeam,
    });
  }

  componentDidMount() {}

  render() {
    const userinfoList = this.state.userInfo.map(userinf => <li key={userinf.toString()}> <button type="button" className="btn matches" data-toggle="collapse" data-target="#demo">{userinf}</button></li>);
    const teamsinfoList = this.state.userInfo.map(teaminf => <li key={teaminf.toString()}> <button type="button" className="btn teams" onClick={this._onTeamClick}>{teaminf}</button></li>);

    

    return (
      <div>
        <LayoutGlobal />

        <div className="editUser">
    <button type="button"
    onClick={this._onEditClick}
    > Edit account
    </button>
    {this.state.showEdit ? <EditUser /> : null}
      </div>
           <div className="info-container">
           <div>
           {this.state.showTeam ? <TeamsInfo /> : null}

             <div className="dashboard-info2">
               <div className="top">
                 <h2>Teams</h2>
               </div>
               <ul>{teamsinfoList}
               </ul>
             </div>
             <div className="dashboard-info1">

               <div className="top">
                 <h2>Matches</h2>
               </div>
               <ul>{userinfoList}</ul>
               <div id="demo" className="collapse">
                Maddafacka
                </div>
             </div>
           </div>
         </div>

        <div className="logoutUser">
    <button type="button"
    onClick={() => Router.pushRoute("/")}
    > Log out
    </button>
      </div>
      </div>
    );
  }
}

export default Dashboard;
