import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import { Router } from "../../routes";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      showTeam: false,
      showMatchInfo: false,
      search: '',
      userInfo: ["Tonje", "Lasse", "Fredrik", "Karoline"]
    };

    this._onEditClick = this._onEditClick.bind(this);
    this._onTeamClick = this._onTeamClick.bind(this);
    this._onMatchClick = this._onMatchClick.bind(this);
    this._getTeams = this._getTeams.bind(this);

  }

  updateSearch(event){
      this.setState({search: event.target.value.substr(0,20)});
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


  _getTeams(){
  const Http = new XMLHttpRequest();
  const url='http://localhost:5000/api/teams/all';
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange=(e)=>{
  console.log(Http.responseText)
  


  var teamInfo = Http.responseText;

  this.state.userInfo = teamInfo;

  }

  }

  _getLocations(){
    const Http = new XMLHttpRequest();
    const url='http://localhost:5000/api/';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
    
  
  
    var teamInfo = Http.responseText;
  
    return JSON.stringify(teamInfo);
  
  
    }
  
  }

  _getSeasons(){
    const Http = new XMLHttpRequest();
    const url='http://localhost:5000/api/';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
    
  
  
    var teamInfo = Http.responseText;
  
    return JSON.stringify(teamInfo);
  
  
    }
  
  }
  componentDidMount() {}

  render() {
    const userinfoList = this.state.userInfo.map(userinf => <li key={userinf.toString()}> <button type="button" className="btnDisplay" data-toggle="collapse" data-target="#demo">{userinf}</button></li>);
    let filtered = this.state.userInfo.filter(
    (userinf) => {
        return userinf.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    }     
    );
    const teamsearch = filtered.map(userinf =><option value="value">{userinf}</option>);

    

    return (
      <div>
        <LayoutGlobal />
           <div className="info-container">
             <div className="dashboard-info1">
               <div className="top">
               <h2>Search for teams</h2>
               <input type="text" className="searchTeams" placeholder="Search for team" value={this.state.search} onChange={this.updateSearch.bind(this)}></input>
               </div>
               Teams <input type="checkbox" id="myCheck"  onClick={this._getTeams}/>
               Location <input type="checkbox" id="myCheck"  onClick={this._getLocations}/>
               Season <input type="checkbox" id="myCheck"  onClick={this._getSeasons}/>
               <br></br>
               <br></br>
               <form className="searchTeamsForm">
                    <select name="teams" size="10">
                    {teamsearch}
                    </select>
                    <br></br>
                    <input type="submit" value="Select"></input>
                    </form>
                </div>
             <div className="dashboard-info2">

               <div className="top">
                 <h2>Match</h2>
               </div>
               <ul>{userinfoList}</ul>
               <div id="demo" className="collapse">
                </div>
             </div>
             </div>

        <div className="btn-index">
    <button type="button"
    onClick={() => Router.pushRoute("/admin/matches")}
    > Back
    </button>
      </div>
      </div>
    );
  }
}

export default Dashboard;