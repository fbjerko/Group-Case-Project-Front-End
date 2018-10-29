import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import AssociationForm from "../../../components/forms/associationsForm";
import { Router } from "../../../routes";



class Associations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAssoc: false
    };

    this._createAssoc = this._createAssoc.bind(this);
}

_createAssoc() {
  this.setState({
    createAssoc: !this.state.createAssoc
  });

} 

  render() {

    if(this.state.createAssoc === true){

        return (
            <div>
              <LayoutGlobal />
              <AssociationForm />
              <div className = "btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createAssoc}>
              Back
            </button>
              </div>
            </div>
          );

    } else {
        //This return is going to display a list of addresses and a create address button
    return (
        <div>
          <LayoutGlobal />
       
          <div className="container">
            <h1>Associations</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createAssoc}>
                Create Associations
              </button>
            </div>
            <div className="div-ret-general" >

<button
type="button"
className="btn-ret-admin"
onClick={() => Router.pushRoute("/admin/general")}
>
Return to General
</button>
</div>
          </div>
  
        </div>
      );
    }  
  }
}

export default Associations;