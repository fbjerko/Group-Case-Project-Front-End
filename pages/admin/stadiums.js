import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";
import NavBar from "../../components/NavBar";
import AdminReturn from "../../components/AdminReturn";

class Stadiums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createStadium: false
    };

    this._createStadium = this._createStadium.bind(this);
  }

  _createStadium() {
    this.setState({
      createStadium: !this.state.createStadium
    });

    console.log(this.state.createStadium + " ");
  }

  componentDidMount() {}

  render() {
    if (this.state.createStadium === true) {
      return (
        <div>
          <LayoutGlobal />
          <NavBar />
          <div className="container">
            <h1>Stadiums</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createStadium}>
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
              <button className="btn-create" onClick={this._createStadium}>
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
            <h1>Stadiums</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createStadium}>
                Configure
              </button>
            </div>

            <div className="btn-admin-create-bottom">
              <AdminReturn/>
            </div>

            {this.state.createStadium ? <CreateUser /> : null}

            <IndexReturn />
          </div>
        </div>
      );
    }
  }
}

export default Stadiums;
