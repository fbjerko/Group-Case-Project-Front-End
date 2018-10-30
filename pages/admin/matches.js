import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import MatchesForm from "../../components/forms/matchesForm";
import AdminReturn from "../../components/AdminReturn";

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
        </div>
      );
    } else {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <h1>Matches</h1>

            <div className="btn-admin-create-top">
              <button
                className="btn-create"
                onClick={this._createMatches}
              >
                Create match
              </button>
              <div className="btn-admin-config">
                <AdminReturn />
              </div>
              <div className="btn-admin-create-bottom" />;
              {this.state.createMatches ? <CreateUser /> : null}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Matches;
