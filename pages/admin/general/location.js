import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import LocationsForm from "../../../components/forms/locationsForm";
import { Router } from "../../../routes";




class Location extends Component {
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
              <LocationsForm/>
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
            <h1>Goal Types</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._create}>
                Create Goal Type
              </button>
            </div>
            <div >

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

export default Location;