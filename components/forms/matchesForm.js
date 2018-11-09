import React from "react";
import Popupp from "../popupp";
import SearchField from "../admin-create/SearchField";



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
            status:'Nothing',
            team_1_players: [],
            team_2_players: [],
            selectedPlayers:[]
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


      const url = process.env.API_URL+"/api/team/getPlayersByTeamId/"+id;
      fetch(url,{credentials:'include'}).then((response)=>response.json().then((body)=>{
          this.setState({team_1_players:body,team_1:id});
      }));

  }
    updateSearchFieldTeam2 = (id)=>{
      console.log(id);

        const url = process.env.API_URL+"/api/team/getPlayersByTeamId/"+id;
        fetch(url,{credentials:'include'}).then((response)=>response.json().then((body)=>{
            this.setState({team_2_players:body,team_2:id});
        }));
  }
    updateInput = (event)=>{
      if(event.target.id=='match_date'){
          this.setState({match_date:event.target.value});
        }

    }
    sendMatch = ()=>{

        var xhttp = new XMLHttpRequest();


        xhttp.open("POST",  process.env.API_URL+"/api/footballMatch", true);
        xhttp.withCredentials=true;
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
              playersId: this.state.selectedPlayers,
              date: this.state.match_date,
              homeTeamId: this.state.team_1,
              awayTeamId: this.state.team_2,
              seasonId: this.state.season_id,
              locationId: this.state.location_id 
            })
        );
        console.log(JSON.stringify({
            playersId: this.state.selectedPlayers,
            date: this.state.match_date,
            homeTeamId: this.state.team_1,
            awayTeamId: this.state.team_2,
            seasonId: this.state.season_id,
            locationId: this.state.location_id
        }));
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
    selectPlayer = (event)=>{
        let selectedPlayers = this.state.selectedPlayers.slice(0);

        if(selectedPlayers.indexOf(event.target.id)===-1){
            selectedPlayers.push(event.target.id);
        }else{
            selectedPlayers.splice(selectedPlayers.indexOf(event.target.id),1);
        }

        this.setState({selectedPlayers});
    }



    render(){

      if(this.state.showPop){
        return(<Popupp text={this.state.status}/>);
    }
        return(
            <div className="create-match-container">

      
        <div style={{marginRight:'50px'}}>

        <h2>Create new match</h2>

       <p>Home team</p>
       <SearchField type={'team'} handleChange={this.updateSearchFieldTeam1}/>
       <p>Away team</p>
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
       <input className="btn-index" type="button" value="Submit" onClick={this.sendMatch}></input>

        </div>
                <div style={{width:'300px',marginLeft:'50px'}}>
                    <h2>Home team:</h2>
                    <table>
                        <tbody>
                        {this.state.team_1_players.map((player)=>{
                            if(this.state.selectedPlayers.indexOf(player[0].toString())!=-1){

                                return (<tr id={player[0]} style={{color:'yellow'}} key={player[0]} onClick={this.selectPlayer}>
                                        <td id={player[0]}>{player[1]}</td>
                                        <td id={player[0]}>{player[2]}</td>
                                    </tr>


                                );
                            }else{
                                return (<tr  style={{color:'white'}} key={player[0]} onClick={this.selectPlayer}>
                                        <td id={player[0]}>{player[1]}</td>
                                        <td id={player[0]}>{player[2]}</td>
                                    </tr>
                                );
                            }
                        })}
                        </tbody>
                    </table>
                </div>
                <div style={{width:'300px',marginLeft:'50px'}}>
                    <h2>Away team</h2>

                    <table>
                        <tbody>
                        {this.state.team_2_players.map((player)=>{
                            if(this.state.selectedPlayers.indexOf(player[0].toString())!=-1){

                                return (<tr id={player[0]} style={{color:'yellow'}} key={player[0]} onClick={this.selectPlayer}>
                                                <td id={player[0]}>{player[1]}</td>
                                                <td id={player[0]}>{player[2]}</td>
                                        </tr>


                                );
                            }else{
                                return (<tr id={player[0]} style={{color:'white'}} key={player[0]} onClick={this.selectPlayer}>
                                            <td id={player[0]}>{player[1]}</td>
                                            <td id={player[0]}>{player[2]}</td>
                                        </tr>
                                );
                            }
                        })}
                        </tbody>
                    </table>
                </div>



    </div>
        );

    }


}



export default MatchesForm;