import React from "react";


class GoalForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:''
          }
    }


    updateInput = (event)=>{
        if(event.target.id=='name'){
            this.setState({name:event.target.value});
        }

    }

    sendGoal = ()=>{

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "http://localhost:5000/api/goal", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
                name:this.state.name
            })
        );
        xhttp.onreadystatechange = ()=>{
            if (xhttp.readyState == XMLHttpRequest.DONE) {
                if(xhttp.status==201){
                    console.log("Created");
                }else if (xhttp.status==403){
                    console.log("Failed to create")
                }
            }
        }
    }



    render(){
        return(<div className="info-container">

            <div className="seasons-container">
                <div className="top">
                    <h2>Create a goal</h2>
                </div>
                <p>Goal type</p>
                <input onChange={this.updateInput} value={this.state.name} type="text" placeholder="Write a goal type" id="name" />
                <br></br>
                <br></br>
                <input className="btn-index" type="button" value="Submit" onClick={this.sendGoal}></input>
            </div>

        </div>
        );

    }


}



export default GoalForm;