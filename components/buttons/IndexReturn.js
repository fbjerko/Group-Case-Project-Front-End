import React from "react";
import { Router } from "../../routes";
import i18n from "../i18n"

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
   {i18n.t("LOG_OUT")}
  </button>
  </div>

)

export default IndexReturn;