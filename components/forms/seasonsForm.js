import React from "react";

function sendSeason() {
  
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "http://localhost:5000/api/user", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      name: document.getElementById("name").value,
      start_date: document.getElementById("startdate").value,
      end_date: document.getElementById("enddate").value,
      description: document.getElementById("description").value
    })
  );

  
}

const seasonsForm = () => (
<div className="info-container">
    
<div className="seasons-container">
<div className="top">
  <h2>Create new season</h2>
</div>
 <p>Season Name </p>
 <input type="text" placeholder="Enter a name" id="name"/>
 <br></br>
 <br></br>
 <p>Start Date </p>
 <input type="date" id="startdate" />
 <br></br>
 <br></br>
 <p>End Date </p>
 <input type="date" id="enddate" />
 <br></br>
 <br></br>
 <p>Description </p>
 <input type="text" placeholder="Write a description" id="description" />
 <br></br>
 <br></br>
 <input className="btn-index" type="button" value="Submit" onClick={sendSeason}></input>
</div>

</div>
)

export default seasonsForm;