import React from "react";
import Popupp from "../popupp";
import SearchField from "../admin-create/SearchField";



class MatchGoal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            team_1:'',
            team_2:'',
            goalType: '',
            desc:'',
            showPop:false,
            status:'Nothing',
            team_1_players: [],
            team_2_players: [],
            selectedPlayers:[]          }
    }

    updateSearchFieldGoal = (id)=>{
      console.log(id);
      this.setState({goalType:id});
  }
    updateSearchFieldTeam1 = (id)=>{
      console.log(id);


      const url = process.env.API_URL+"/api/team/getPlayersByTeamId/"+id;
      fetch(url).then((response)=>response.json().then((body)=>{
          this.setState({team_1_players:body,team_1:id});
      }));

  }
    updateSearchFieldTeam2 = (id)=>{
      console.log(id);

        const url = process.env.API_URL+"/api/team/getPlayersByTeamId/"+id;
        fetch(url).then((response)=>response.json().then((body)=>{
            this.setState({team_2_players:body,team_2:id});
        }));
  }
    updateInput = (event)=>{
      if(event.target.id=='description'){
          this.setState({desc:event.target.value});
        }

    }

    componentWillMount(){
        this.updateSearchFieldTeam2(this.props.team_2);
        this.updateSearchFieldTeam1(this.props.team_1);
    }
    sendMatchGoal = ()=>{

        var xhttp = new XMLHttpRequest();


        xhttp.open("POST",  process.env.API_URL+"/api/matchGoal", true);
        xhttp.withCredentials = true;
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
              playerId: this.state.selectedPlayers,
              description: this.state.desc,
              goalTypeId: this.state.matchGoal,
              fotballMatchId: this.props.fotballMatchId,


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

        <h2>Create new match goal</h2>

       <p>Team 1 </p>
       <p>{this.props.team_1}</p>
       <p>Team 2</p>
       <p>{this.props.team_2}</p>
       <p>Goal type</p>
       <SearchField type={'goalType'} handleChange={this.updateSearchFieldGoal}/>
       <br></br>
       <br></br>
       <p>Description</p>
       <input onChange={this.updateInput} value={this.state.desc} type="text" placeholder="Write a description" id="description" />
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={this.sendMatchGoal}></input>

        </div>
                <div style={{width:'300px',marginLeft:'50px'}}>
                    <h2>Team 1:</h2>
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
                    <h2>Team 2:</h2>

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


export default MatchGoal;