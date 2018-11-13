import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import SeasonsForm from "../../../components/forms/seasonsForm";
import { Router } from "../../../routes";
import NavbarUser from "../../../components/NavbarUser";

class Seasons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create: false
    };

    this._create = this._create.bind(this);
  }

    componentWillReceiveProps(nextProps) {

        if (nextProps.url!=undefined &&nextProps.url.query.create == "true") {
            this.setState({create: true});
        } else {
            this.setState({create: false});
        }
    }

  _create() {
    this.setState({
      create: !this.state.create
    });
  }
    componentWillMount(){
        if(this.props.url.query.create=="true"){
            this.setState({create:true});
        }
    }

  render() {
    if (this.state.create === true) {
      return (
        <div className="container">
          <LayoutGlobal />
            <NavbarUser/>
          <SeasonsForm close={this._create}/>
         
        
        </div>
      );
    } else {
      //This return is going to display a list of addresses and a create address button
      return (
        <div>
          <LayoutGlobal />
          <NavbarUser/>

          <div className="container">
            <h1>Seasons</h1>


         
          </div>
        </div>
      );
    }
  }
}

export default Seasons;
