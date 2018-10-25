import React from "react";

function sendGoal() {
  
    var xhttp = new XMLHttpRequest();
  
    xhttp.open("POST", "http://localhost:5000/api/user", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        type: document.getElementById("goal_type").value
      })
    );
  
    
  }

const goalsForm = () => (
<div className="info-container">
      
      <div className="seasons-container">
      <div className="top">
        <h2>Create goal type</h2>
      </div>
       <p>Goal type </p>
       <input type="text" placeholder="Write a goal type" id="goal_type"/>
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit"></input>
      </div>

    </div>
)

export default goalsForm;