import React from "react";
import { Router } from "../routes";

const AdminReturn = () => (

    <div >

    <button
    type="button"
    className="btn-admin-create-top"
    onClick={() => Router.pushRoute("/admin")}
  >
   Return to Dashboard
  </button>
  </div>

)

export default AdminReturn;