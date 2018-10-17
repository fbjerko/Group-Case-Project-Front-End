import React from "react";
import { Router } from "../routes";

const IndexReturn = () => (

    <div >

    <button
    type="button"
    className="btn-ret"
    onClick={() => Router.pushRoute("/")}
  >
   Return to Index
  </button>
  </div>

)

export default IndexReturn;