import React from "react";
import { Router } from "../../routes";
import i18n from "../../i18n"


const UserReturn = () => (

    <div >

    <button
    type="button"
    className="btn-ret-admin"
    onClick={() => Router.pushRoute("/dashboard")}
  >
      {i18n.t("RET_DASH")}
  </button>
  </div>

)

export default UserReturn;