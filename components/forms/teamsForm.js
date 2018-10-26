import React from "react";
import Popupp from "../popupp";
import SearchField from "../admin-create/SearchField";


class TeamForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            associationId:-1,
            locationId: -1,
            ownerId: -1,
            coachId: -1,
            showPop:false,
            status:'Nothing'       
          }
    }

    updateSearchFieldAssociation = (id)=>{
      console.log(id);
      this.setState({association_id:id});
  }
    updateSearchFieldLocation = (id)=>{
      console.log(id);
      this.setState({location_id:id});
  }
    updateSearchFieldCoach = (id)=>{
      console.log(id);
      this.setState({coach_id:id});
  }
    updateSearchFieldOwner = (id)=>{
      console.log(id);
      this.setState({owner_id:id});
  }


    updateInput = (event)=>{
      if(event.target.id=='name'){
          this.setState({name:event.target.value});
        }

    }

    sendTeam = ()=>{

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "http://localhost:5000/api/team", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
              name: this.state.name,
              association_id: this.state.association_id,
              location_id: this.state.location_id,
              owner_id: this.state.owner_id,
              coach_id:this.state.coach_id  
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
        <h2>Create new team</h2>
      </div>
       <p>Team name</p>
       <input onChange={this.updateInput} value={this.state.match_date} type="date" placeholder="Write a match_date" id="match_date" />
       <br></br>
       <br></br>
       <p>Association</p>
       <SearchField type={'season'} handleChange={this.updateSearchFieldAssociation}/>
       <br></br>
       <br></br>
       <p>Location</p>
       <SearchField type={'location'} handleChange={this.updateSearchFieldLocation}/>
       <br></br>
       <br></br>
       <p>Owner</p>
       <SearchField type={'owner'} handleChange={this.updateSearchFieldOwner}/>
       <br></br>
       <br></br>
       <p>Coach</p>
       <SearchField type={'coach'} handleChange={this.updateSearchFieldCoach}/>
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={this.sendTeam}></input>
      </div>

    </div>
        );

    }


}



export default TeamForm;