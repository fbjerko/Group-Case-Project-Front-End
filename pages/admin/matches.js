import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";
import AdminReturn from "../../components/AdminReturn";
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

    console.log(this.state.createMatches + " ");
  }

  componentDidMount() {}

  render() {
    if (this.state.createMatches === true) {
      return (
        <div>
          <LayoutGlobal />
          
          <div className="container">
            <h1>Matches</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={() => Router.pushRoute("/admin/creatematches")}>
                Create
              </button>

              <button className="btn-create" onClick={this._matches}>
                Update
              </button>

              <button className="btn-create" onClick={this._teams}>
                Delete
              </button>
            </div>

            <div className="btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createMatches}>
                Back
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <LayoutGlobal />
       

          <div className="container">
            <h1>Matches</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={() => Router.pushRoute("/admin/createseason")}>
                Create Season
              </button>
              <button className="btn-create" onClick={this._createMatches}>
                Configure matches
              </button>
            </div>

            <div className="btn-admin-create-bottom">
              <AdminReturn/>
            </div>
            ;
            {this.state.createMatches ? <CreateUser /> : null}

            <IndexReturn />
          </div>
        </div>
      );
    }
  }
}

export default Matches;
