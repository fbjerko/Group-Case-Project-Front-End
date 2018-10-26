import React from "react";


class GoalForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            showPop:false,
            status:'Nothing'
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