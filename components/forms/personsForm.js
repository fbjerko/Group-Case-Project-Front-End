import React from "react";

function sendPersons() {
  
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "http://localhost:5000/api/user", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      address_id: document.getElementById("address").value,
      first_name: document.getElementById("firstname").value,
      last_name: document.getElementById("lastname").value,
      date_of_birth: document.getElementById("dateofbirth").value
    })
  );

  
}

const personsForm = () => (
<div className="info-container">
      
      <div className="seasons-container">
      <div className="top">
        <h2>Create new person</h2>
      </div>
       <p>Address </p>
       <input type="text" placeholder="Write an address" id="address"/>
       <br></br>
       <br></br>
       <p>First name</p>
       <input type="text" placeholder="Write a first name" id="firstname" />
       <br></br>
       <br></br>
       <p>Last Name</p>
       <input type="text" placeholder="Write a last name" id="lastname" />
       <br></br>
       <br></br>
       <p>Date of birth</p>
       <input type="date" placeholder="" id="dateofbirth" />
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={sendPersons}></input>
      </div>

    </div>
)

export default personsForm;