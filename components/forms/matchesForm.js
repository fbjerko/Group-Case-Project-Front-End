import React from "react";

function sendMatches() {
  
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "http://localhost:5000/api/user", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      match_date: document.getElementById("match_date").value,
      team_1: document.getElementById("team_1").value,
      team_2: document.getElementById("team_2").value,
      season_id: document.getElementById("season").value,
      location_id: document.getElementById("location").value
    })
  );

  
}

const matchesForm = () => (
<div className="info-container">
      
      <div className="seasons-container">
      <div className="top">
        <h2>Create new match</h2>
      </div>
       <p>Team 1 </p>
       <input type="text" placeholder="Pick team 1" id="team_1"/>
       <p>Team 2</p>
       <input type="text" placeholder="Pick team 2" id="team_2" />
       <br></br>
       <br></br>
       <p>Match date</p>
       <input type="date" placeholder="Write an optional address" id="match_date" />
       <br></br>
       <br></br>
       <p>Season</p>
       <input type="text" placeholder="Write a postal code" id="season" />
       <br></br>
       <br></br>
       <p>Location</p>
       <input type="text" placeholder="Write a city" id="location" />
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={sendMatches}></input>
      </div>

    </div>
)

export default matchesForm;