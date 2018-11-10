import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import SeasonsForm from "../../../components/forms/seasonsForm";
import { Router } from "../../../routes";

class Seasons extends Component {
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
    if (this.state.create === true) {
      return (
        <div className="container">
          <LayoutGlobal />
          <SeasonsForm close={this._create}/>
         
        
        </div>
      );
    } else {
      //This return is going to display a list of addresses and a create address button
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <h1>Seasons</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._create}>
                Create Season
              </button>
            </div>
         
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

export default Seasons;
