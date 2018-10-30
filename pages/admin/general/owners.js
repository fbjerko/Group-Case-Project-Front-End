import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import { Router } from "../../../routes";


class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

}
 

  render() {
        //This return is going to display a list of addresses and a create address button
    return (
        <div>
          <LayoutGlobal />
       
          <div className="container">
            <h1>Owners</h1>

<button
type="button"
className="div-ret-general"
onClick={() => Router.pushRoute("/admin/general")}
>
Return to General
</button>
</div>
          </div>
      );
    }  
  }

export default Owner;