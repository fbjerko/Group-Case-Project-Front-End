import React from "react";

function sendLocation() {
  
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "http://localhost:5000/api/user", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      address_id: document.getElementById("address_line_1").value,
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
    })
  );

  
}

const locationsForm = () => (
<div className="info-container">
      
      <div className="seasons-container">
      <div className="top">
        <h2>Create new location</h2>
      </div>
       <p>Address </p>
       <input type="text" placeholder="Write an address" id="address"/>
       <br></br>
       <br></br>
       <p>Name</p>
       <input type="text" placeholder="Write a name" id="name" />
       <br></br>
       <br></br>
       <p>Description</p>
       <input type="text" placeholder="Write a description" id="description" />
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={sendLocation}></input>
      </div>

    </div>
)

export default locationsForm;