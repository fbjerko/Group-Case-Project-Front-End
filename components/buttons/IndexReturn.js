import React from "react";
import { Router } from "../../routes";

const IndexReturn = () => (

    <div >

    <button
    type="button"
    className="btn-ret"
    onClick={() => {
        window.location=process.env.FRONT_END_URL+'/logout';
    }
        }
  >
   Log Out
  </button>
  </div>

)

export default IndexReturn;