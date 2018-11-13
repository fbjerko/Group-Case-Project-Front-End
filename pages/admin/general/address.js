import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import AddressForm from "../../../components/forms/addressForm";
import { Router } from "../../../routes";
import NavbarUser from "../../../components/NavbarUser";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAddress: false
    };

    this._createAddress = this._createAddress.bind(this);
  }

    componentWillReceiveProps(nextProps) {

        if (nextProps.url!=undefined &&nextProps.url.query.create == "true") {
            this.setState({createAddress: true});
        } else {
            this.setState({createAddress: false});
        }
    }

  _createAddress() {
    this.setState({
      createAddress: !this.state.createAddress
    });
  }

  componentWillMount(){
      if(this.props.url.query.create=="true"){
          this.setState({createAddress:true});
      }
  }

  render() {
    if (this.state.createAddress === true) {
      return (
        <div>
          <LayoutGlobal />
          <NavbarUser/>
          <AddressForm />

        </div>
      );
    } else {
      //This return is going to display a list of addresses and a create address button
      return (
        <div>
          <LayoutGlobal />
            <NavbarUser/>
          <div className="container">
            <h1>Address</h1>


            <button
              className="btn-dashboard-back"
              onClick={() => this.props.close("")}
            >
              Back
            </button>
            
          </div>
        </div>
      );
    }
  }
}

export default Address;
