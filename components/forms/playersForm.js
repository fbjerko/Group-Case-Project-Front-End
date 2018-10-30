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
            teamId:-1,
            personId:-1
        }
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

    sendPlayer = ()=>{

        let xhttp = new XMLHttpRequest();

        xhttp.open("POST",  process.env.API_URL+"/api/player", true);
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
                    <SearchField type={'person'} handleChange={this.updateSearchFieldPerson}/>
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
                    <SearchField type={'team'} handleChange={this.updateSearchFieldTeam}/>
                    <br></br>
                    <br></br>
                    <input className="btn-index" type="button" value="Submit" onClick={this.sendPlayer}></input>
                </div>

            </div>
        );

    }
}

export default PlayersForm;