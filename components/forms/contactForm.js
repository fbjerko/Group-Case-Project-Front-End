import React from "react";

function sendContact() {
  
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "http://localhost:5000/api/user", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      person_id: document.getElementById("person").value,
      contact_type: document.getElementById("contact_type").value,
      contact_detail: document.getElementById("contact_detail").value,
    })
  );

  
}

const contactForm = () => (
<div className="info-container">
      
      <div className="seasons-container">
      <div className="top">
        <h2>Create contact information</h2>
      </div>
       <p>Choose person </p>
       <input type="text" placeholder="Write an address" id="person"/>
       <br></br>
       <br></br>
       <p>Contact type</p>
       <input type="text" placeholder="Write an optional address" id="contact_type" />
       <br></br>
       <br></br>
       <p>Contact detail</p>
       <input type="number" placeholder="Write a postal code" id="contact_detail" />
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={sendContact}></input>
      </div>

    </div>
)

export default contactForm;