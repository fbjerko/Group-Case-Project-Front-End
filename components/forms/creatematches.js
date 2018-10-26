import React, { Component } from "react";
import LayoutGlobal from "../LayoutGlobal";
import { Router } from "../../routes";
import SearchField from "../admin-create/SearchField"


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
  
  handleChange (id){
      console.log(id);
  }
  componentDidMount() {}

  render() {

    return (


        <div>
            <LayoutGlobal />
                <div className="info-container">
                    <div className="dashboard-info1">
                        <SearchField type={'coach'} handleChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
        </div>

    );
  }
}

export default CreatMatches;