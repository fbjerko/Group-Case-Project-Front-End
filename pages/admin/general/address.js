import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import AddressForm from "../../../components/forms/addressForm";
import { Router } from "../../../routes";


class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAddress: false
    };

    this._createAddress = this._createAddress.bind(this);
}

_createAddress() {
  this.setState({
    createAddress: !this.state.createAddress
  });

}
 

  render() {

    if(this.state.createAddress === true){

        return (
            <div>
              <LayoutGlobal />
              <AddressForm />
              <div className = "btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createAddress}>
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
            <h1>Address</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createAddress}>
                Create Address
              </button>
            </div>
            <div className="div-ret-general">

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

export default Address;