import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import AssociationForm from "../../../../associationsForm";


class Address extends Component {
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

    if(this.state.createAddress === true){

        return (
            <div>
              <LayoutGlobal />
              <AssociationForm />
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
            <IndexReturn />
          </div>
        </div>
      );
    }  
  }
}

export default Address;