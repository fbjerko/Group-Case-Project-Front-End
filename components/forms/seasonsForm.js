import React from "react";
import Popupp from "../popupp";


class SeasonForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            startDate:'',
            endDate: '',
            description:'',
            showPop:false,
            status:'Nothing'
        }
    }


    updateInput = (event)=>{
        if(event.target.id=='name'){
            this.setState({name:event.target.value});
        }else if(event.target.id=='start_date'){
            this.setState({start_date:event.target.value});
        }else if(event.target.id=='end_date'){
          this.setState({end_date:event.target.value});
        }else if(event.target.id=='description'){
          this.setState({description:event.target.value});
      }

    }

    sendSeason = ()=>{

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "http://localhost:5000/api/location", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
                name:this.state.name,
                start_date:this.state.start_date,
                end_date:this.state.end_date,
                description:this.state.description            
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
        return(<div className="info-container">

            <div className="seasons-container">
                <div className="top">
                    <h2>Create new season</h2>
                </div>
                <p>Season Name</p>
                <input onChange={this.updateInput} value={this.state.name} type="text" placeholder="Write a name" id="name" />
                <br></br>
                <br></br>
                <p>Start Date</p>
                <input onChange={this.updateInput} value={this.state.name} type="date" placeholder="Choose a date" id="start_date" />
                <br></br>
                <br></br>
                <p>End Date</p>
                <input onChange={this.updateInput} value={this.state.name} type="date" placeholder="Choose a date" id="end_date" />
                <br></br>
                <br></br>
                <p>Description</p>
                <input onChange={this.updateInput} value={this.state.description} type="text" placeholder="Write a description" id="description" />
                <br></br>
                <br></br>
                <input className="btn-index" type="button" value="Submit" onClick={this.sendSeason}></input>
            </div>

        </div>
        );

    }


}



export default SeasonForm;