import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import EditUser from "../components/EditUser";
import TeamsInfo from "../components/TeamsInfo";
import MatchInfo from "../components/MatchInfo";
import { Router } from "../routes";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      showTeam: false,
      showMatchInfo: false,
      userInfo: ["Tonje", "Lasse", "Fredrik", "Karoline"]
    };

    this._onEditClick = this._onEditClick.bind(this);
    this._onTeamClick = this._onTeamClick.bind(this);
    this._onMatchClick = this._onMatchClick.bind(this);

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

  _onMatchClick() {
    this.setState({
      showMatchInfo: !this.state.showMatchInfo,
    });
  }


  componentDidMount() {}

  render() {
    const userinfoList = this.state.userInfo.map(userinf => <li key={userinf.toString()}> <button type="button" className="btnDisplay" data-toggle="collapse" data-target="#demo">{userinf}</button></li>);
    const teamsinfoList = this.state.userInfo.map(teaminf => <li key={teaminf.toString()}> <button type="button" className="btnDisplay" onClick={this._onTeamClick}>{teaminf}</button></li>);

    

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
               {this.state.showMatchInfo ? <MatchInfo /> : null}
                </div>
             </div>
           </div>
         </div>

        <div className="btn-index">
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
