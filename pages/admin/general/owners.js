import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import { Router } from "../../../routes";

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //This return is going to display a list of addresses and a create address button
    return (
      <div>
        <LayoutGlobal />

        <div className="container">
          <h1>Owners</h1>

         
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

export default Owner;
