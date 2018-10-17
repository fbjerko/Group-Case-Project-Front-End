import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";
import NavBar from "../../components/NavBar";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
        <div>
        <LayoutGlobal />

        <NavBar />

        <div className="container">
          <h1>Teams</h1>

          <IndexReturn />
        </div>
      </div>
    );
  }
}

export default Teams;
