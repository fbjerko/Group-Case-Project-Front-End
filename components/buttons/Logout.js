import React from "react";
import i18n from "../../i18n"

const Logout = () => (

    <div >

    <option
    className="btn-lng"
    onClick={() => {
        localStorage.clear();
        window.location=process.env.FRONT_END_URL+'/logout';
    }
        }
  >
   {i18n.t("LOG_OUT")}
  </option>
  </div>

)

export default Logout;