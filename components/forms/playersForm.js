import React, {Component} from 'react';
import SearchField from "../admin-create/SearchField";
import Popupp from "../popupp";

class PlayersForm extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"Nothing",
            showPop:false,
            number:'',
            position:"",
            edit:this.props.edit,
            method:this.switchMethods(this.props.edit),
            playerInfo: [],
            teamId:-1,
            personId:-1,
            ready:false
        }
        this.switchMethods(this.props.edit);

    }


    updateInput = (event)=>{
        if(event.target.id=="position"){
            this.setState({position:event.target.value});
        }else if(event.target.id=="number"){
            this.setState({number:event.target.value});
        }
    }
    updateSearchFieldPerson = (id)=>{
        this.setState({personId:id});
    }
    updateSearchFieldTeam = (id)=>{
        this.setState({teamId:id});
    }

    switchMethods = (edit)=>{
        let method = '';
        switch(edit) {
            case 'edit':
                method = "PUT";

                break;
            case 'create':
                method = "POST";
                break;
        }
        return method;
    }

    async componentWillMount() {
        if(this.state.edit == 'edit'){
            try {
                const response = await fetch(
                    process.env.API_URL+"/api/player/" + this.props.id
                );
                const json = await response.json();

                this.setState({
                  playerInfo: json,
                });
              } catch (error) {
                console.log(error);
              }
              const player = this.state.playerInfo;

              this.setState({
                number: player.number,
                position: player.normalPosition,
                teamId: player.team.teamId,
                personId: player.person.personId,
                  ready:true
              });
        }else{
            this.setState({ready:true})
        }
     
       

      }



    sendPlayer = ()=>{

        let xhttp = new XMLHttpRequest();

        xhttp.open(url,  process.env.API_URL+"/api/player", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
                teamId: this.state.teamId,
                personId:this.state.personId,
                normalPosition:this.state.position,
                number:this.state.number
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
        if(this.state.ready){
            if(this.state.showPop){
                return(<Popupp text={this.state.status}/>);
            }

            return(
                <div className="info-container">

                    <div className="seasons-container">
                        <div className="top">
                            <h2>Create new player</h2>
                        </div>
                        <p>Person </p>
                        <SearchField type={'person'} id={this.state.personId} handleChange={this.updateSearchFieldPerson}/>
                        <br></br>
                        <br></br>
                        <p>Number</p>
                        <input onChange={this.updateInput} value={this.state.number} type="text" placeholder="Write a number:" id="number" />
                        <br></br>
                        <br></br>
                        <p>Position</p>
                        <input onChange={this.updateInput} value={this.state.position} type="text" placeholder="Write a position" id="position" />
                        <br></br>
                        <br></br>
                        <p>Team</p>
                        <SearchField type={'team'} id={this.state.teamId} handleChange={this.updateSearchFieldTeam} value={this.state.teamId}/>
                        <br></br>
                        <br></br>
                        <input className="btn-index" type="button" value="Submit" onClick={this.sendPlayer}></input>
                    </div>

                </div>
            );
        }else{
            return(
                <div>
                    <h1>Loading Data...</h1>
                </div>
            );
        }



    }
}

export default PlayersForm;