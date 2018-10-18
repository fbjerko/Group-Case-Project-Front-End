import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";
import NavBar from "../../components/NavBar";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createMatches: false,

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
          <NavBar />
          <div className="container">
            <h1>Matches</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createMatches}>
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
          <NavBar />

          <div className="container">
            <h1>Matches</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createMatches}>
                Configure
              </button>

             
            </div>

            {this.state.createMatches ? <CreateUser /> : null}

            <IndexReturn />
          </div>
        </div>
      );
    }
  }
}

export default Matches;
