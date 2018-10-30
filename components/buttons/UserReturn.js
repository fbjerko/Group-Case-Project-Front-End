import React from "react";
import { Router } from "../../routes";

const UserReturn = () => (

    <div >

    <button
    type="button"
    className="btn-ret-admin"
    onClick={() => Router.pushRoute("/dashboard")}
  >
   Return to Dashboard
  </button>
  </div>

)

export default UserReturn;