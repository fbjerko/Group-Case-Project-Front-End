import React from "react";

function sendAddress() {
  
    var xhttp = new XMLHttpRequest();
  
    xhttp.open("POST", "http://localhost:5000/api/user", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        address_line_1: document.getElementById("address_line_1").value,
        address_line_2: document.getElementById("address_line_2").value,
        address_line_3: document.getElementById("address_line_3").value,
        postal_code: document.getElementById("postal_code").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value
      })
    );
  
    
  }
  

const AddressForm = () => (
<div className="info-container">
      
      <div className="seasons-container">
      <div className="top">
        <h2>Create new address</h2>
      </div>
       <p>Address </p>
       <input type="text" placeholder="Write an address" id="address_line_1"/>
       <br></br>
       <br></br>
       <p>Address 2 (Optional)</p>
       <input type="text" placeholder="Write an optional address" id="address_line_2" />
       <br></br>
       <br></br>
       <p>Address 3 (Optional)</p>
       <input type="text" placeholder="Write an optional address" id="address_line_3" />
       <br></br>
       <br></br>
       <p>Postal Code</p>
       <input type="number" placeholder="Write a postal code" id="postal_code" />
       <br></br>
       <br></br>
       <p>City</p>
       <input type="text" placeholder="Write a city" id="city" />
       <br></br>
       <br></br>
       <p>Country</p>
       <input type="text" placeholder="Write a country" id="country" />
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={sendAddress}></input>
      </div>

    </div>
)

export default AddressForm;