import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";

import MatchesForm from "../../components/forms/matchesForm";


import AdminReturn from "../../components/buttons/AdminReturn";
import { Router } from "../../routes";


class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createMatches: false
    };

    this._createMatches = this._createMatches.bind(this);
  }

  _createMatches() {
    this.setState({
      createMatches: !this.state.createMatches
    });

  }

  componentDidMount() {}

  render() {
    if (this.state.createMatches === true) {
      return (
        <div>
          <LayoutGlobal />
          <MatchesForm />
          <div className = "btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createMatches}>
              Back
            </button>
              </div>
        </div>
      );
    } else {
      return (
        <div>
          <LayoutGlobal />
           <div className="container">
            <div className="btn-admin-config">
              <button className="btn-create" onClick={this._createMatches}>
                Create match
              </button>
              <AdminReturn />
            </div>
          </div>
      </div>
      );
    }
  }
}

export default Matches;
