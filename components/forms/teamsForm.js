import React from "react";

function sendTeams() {
  
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "http://localhost:5000/api/user", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      name: document.getElementById("teamname").value,
      association_id: document.getElementById("association").value,
      coach_id: document.getElementById("coach").value,
      owner_id: document.getElementById("owner").value,
      location_id: document.getElementById("location").value
    })
  );

  
}

const teamsForm = () => (
<div className="info-container">
      
      <div className="seasons-container">
      <div className="top">
        <h2>Create new team</h2>
      </div>
       <p>Team name </p>
       <input type="text" placeholder="Write a team name" id="teamname"/>
       <br></br>
       <br></br>
       <p>Association</p>
       <input type="text" placeholder="" id="association" />
       <br></br>
       <br></br>
       <p>Coach</p>
       <input type="text" placeholder="" id="coach" />
       <br></br>
       <br></br>
       <p>Owner</p>
       <input type="text" placeholder="" id="owner" />
       <br></br>
       <br></br>
       <p>Location</p>
       <input type="text" placeholder="" id="location" />
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={sendTeams}></input>
      </div>

    </div>
)

export default teamsForm;