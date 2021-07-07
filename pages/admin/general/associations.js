import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import AssociationForm from "../../../components/forms/associationsForm";
import { Router } from "../../../routes";
import NavbarUser from "../../../components/NavbarUser";

class Associations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAssoc: false
    };

    this._createAssoc = this._createAssoc.bind(this);
  }

    componentWillReceiveProps(nextProps) {

        if (nextProps.url!=undefined &&nextProps.url.query.create == "true") {
            this.setState({createAssoc: true});
        } else {
            this.setState({createAssoc: false});
        }
    }

  _createAssoc() {
    this.setState({
      createAssoc: !this.state.createAssoc
    });
  }
    componentWillMount(){
        if(this.props.url.query.create=="true"){
            this.setState({createAssoc:true});
        }
    }

  render() {
    if (this.state.createAssoc === true) {
      return (
        <div className="container">
          <LayoutGlobal />
          <NavbarUser/>
          <AssociationForm close={this._createAssoc}/>
         
           
          
        </div>
      );
    } else {
      //This return is going to display a list of addresses and a create address button
      return (
        <div>
          <LayoutGlobal />
          <NavbarUser/>
          <div className="container">
            <h1>Associations</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createAssoc}>
                Create Associations
              </button>
            </div>
           

          </div>
        </div>
      );
    }
  }
}

export default Associations;
