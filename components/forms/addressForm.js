import React from "react";
import { Router } from "../routes";

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
       <input className="btn-index" type="button" value="Submit"></input>
      </div>

    </div>
)

export default AddressForm;