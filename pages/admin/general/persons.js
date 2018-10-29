import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import PersonsForm from "../../../components/forms/personsForm";
import { Router } from "../../../routes";


class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create: false
    };

    this._create = this._create.bind(this);
}

_create() {
  this.setState({
    create: !this.state.create
  });

}
 

  render() {

    if(this.state.create === true){

        return (
            <div>
              <LayoutGlobal />
              <PersonsForm />
              <div className = "btn-admin-create-bottom">
              <button className="btn-create" onClick={this._create}>
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
            <h1>Persons</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._create}>
                Create Person
              </button>
            </div>
            <div className="div-ret-general">

<button
type="button"
className="div-ret-general"
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

export default Person;