import React from "react";

function sendAssociation() {
  
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "http://localhost:5000/api/user", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
    })
  );

  
}

const assocationForm = () => (
<div className="info-container">
      
      <div className="seasons-container">
      <div className="top">
        <h2>Create new assocation</h2>
      </div>
       <p>Name </p>
       <input type="text" placeholder="Write an address" id="name"/>
       <br></br>
       <br></br>
       <p>Description</p>
       <input type="text" placeholder="Write an optional address" id="description" />
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={sendAssociation}></input>
      </div>

    </div>
)

export default assocationForm;