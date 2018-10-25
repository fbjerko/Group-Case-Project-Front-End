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

  _addAddress(){
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:5000/api/location", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        address: document.getElementById("address").value
      }));
  
  
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

export default Address;