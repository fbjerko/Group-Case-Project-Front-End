import React from "react";


class MatchesForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            team_1:'',
            team_2:'',
            match_date: '',
            season_id:'',
            location_id:'',
            showPop:false,
            status:'Nothing'       
          }
    }

    updateSearchFieldSeason = (id)=>{
      console.log(id);
      this.setState({season_id:id});
  }
    updateSearchFieldLocation = (id)=>{
      console.log(id);
      this.setState({location_id:id});
  }
    updateSearchFieldTeam1 = (id)=>{
      console.log(id);
      this.setState({team_1:id});
  }
    updateSearchFieldTeam2 = (id)=>{
      console.log(id);
      this.setState({team_2:id});
  }


    updateInput = (event)=>{
      if(event.target.id=='match_date'){
          this.setState({match_date:event.target.value});
        }

    }

    sendMatch = ()=>{

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "http://localhost:5000/api/match", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
              match_date: this.state.match_date,
              team_1: this.state.team_1,
              team_2: this.state.team_2,
              season_id: this.state.season_id,
              location_id: this.state.location_id 
            })
        );
        xhttp.onreadystatechange = ()=>{
          if (xhttp.readyState == XMLHttpRequest.DONE) {
            if(xhttp.status==201){
                console.log("Created");
                this.setState({status:"Created"});

            }else if (xhttp.status==403){
                console.log("Failed to create")
                this.setState({status:"Failed to create"});
            }
            this.setState({showPop:true});

        }
        }
    }



    render(){
      if(this.state.showPop){
        return(<Popupp text={this.state.status}/>);
    }
        return(
          <div className="info-container">
      
      <div className="seasons-container">
      <div className="top">
        <h2>Create new match</h2>
      </div>
       <p>Team 1 </p>
       <SearchField type={'team'} handleChange={this.updateSearchFieldTeam1}/>
       <p>Team 2</p>
       <SearchField type={'team'} handleChange={this.updateSearchFieldTeam2}/>
       <br></br>
       <br></br>
       <p>Match date</p>
       <input onChange={this.updateInput} value={this.state.match_date} type="date" placeholder="Write a match_date" id="match_date" />
       <br></br>
       <br></br>
       <p>Season</p>
       <SearchField type={'season'} handleChange={this.updateSearchFieldSeason}/>
       <br></br>
       <br></br>
       <p>Location</p>
       <SearchField type={'location'} handleChange={this.updateSearchFieldLocation}/>
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={sendMatches}></input>
      </div>

    </div>
        );

    }


}



export default MatchesForm;