import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import { Router } from "../../routes";


class CreatMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      showTeam: false,
      showMatchInfo: false,
      search: '',
      searchResult: [],
        selected : '',
        team1:'',
        team2:''
    };

    this._onEditClick = this._onEditClick.bind(this);
    this._onTeamClick = this._onTeamClick.bind(this);
    this._onMatchClick = this._onMatchClick.bind(this);
    this._getTeams = this._getTeams.bind(this);
    this.transferSelected = this.transferSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  updateSearch(event){
      this.setState({search: event.target.value.substr(0,20)});
  }

  handleChange(e){
      this.setState({selected:e.target.value});
  }

  transferSelected(){
      const selected = this.state.selected;
      this.setState({search:selected});
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

    const url='http://localhost:5000/api/team/all';
    fetch(url).then(
      (res)=>res.json().then(
      (res)=>{
        if(res.length>0){
          let searchResult =[];

          for(let team of res){
            searchResult.push({
                name:team.name,
                id:team.teamId
            });
          }


          this.setState({searchResult});
      }
      }

      ));

  }


  

  _getLocations(){
    const url='http://localhost:5000/api/location/all';
    fetch(url).then(
      (res)=>res.json().then(
      (res)=>{
          if(res.length>0){
              let searchResult =[];

              for(let team of res){
                  searchResult.push({
                      name:team.name,
                      id:team.locationId
                  });
              }
            this.setState({searchResult});
          }
      }

      ));
  
  
    }
  
  

  _getSeasons(){
    const url='http://localhost:5000/api/season/all';
    fetch(url).then(
      (res)=>res.json().then(
      (res)=>{
        if(res.length>0){
            let searchResult =[];

            for(let team of res){
                searchResult.push({
                    name:team.name,
                    id:team.seasonId
                });
            }

          this.setState({searchResult});
        }
        
      }

      ));
  
  
    }
  
  
  componentDidMount() {}

  render() {
    //const userinfoList = this.state.searchResult.map(userinf => <li key={userinf.toString()}> <button type="button" className="btnDisplay" data-toggle="collapse" data-target="#demo">{userinf}</button></li>);
      const  userinfoList = "";
      let filtered = this.state.searchResult.filter(
    (team) => {
        return team.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    }     
    );
    const teamsearch = filtered.map(team =><option key={team.id} value={team.name}>{team.name}</option>);

    

    return (
      <div>
        <LayoutGlobal />
           <div className="info-container">
             <div className="dashboard-info1">
               <div className="top">
               <h2>Search for teams</h2>
               <input type="text" className="searchTeams" placeholder="Search for team" value={this.state.search} onChange={this.updateSearch.bind(this)}></input>
               </div>
               Teams <input type="radio" name="check" id="myCheck"  onClick={this._getTeams}/>
               Location <input type="radio" name="check" id="myCheck"  onClick={this._getLocations}/>
               Season <input type="radio" name="check" id="myCheck"  onClick={this._getSeasons}/>
               <br></br>
               <br></br>

                    <select name="teams" size="10" onChange={this.handleChange}>
                    {teamsearch}
                    </select>
                    <br></br>
                    <button type="Submit" onClick={this.transferSelected}>Select</button>

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

export default CreatMatches;