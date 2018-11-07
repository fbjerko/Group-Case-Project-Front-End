import React from "react";
import { Router } from "../../routes";

const Logout = () => (

    <div >

    <option
    className="btn-lng"
    onClick={() => {
        window.location=process.env.FRONT_END_URL+'/logout';
    }
        }
  >
   Log Out
  </option>
  </div>

)

export default Logout;