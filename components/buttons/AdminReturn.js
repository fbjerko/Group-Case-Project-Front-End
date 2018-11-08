import React from "react";
import { Router } from "../../routes";
import i18n from "../../i18n"


const AdminReturn = () => (

    <div >

    <button
    type="button"
    className="btn-ret-admin"
    onClick={() => Router.pushRoute("/admin")}
  >
      {i18n.t("RET_DASH")}
  </button>
  </div>

)

export default AdminReturn;