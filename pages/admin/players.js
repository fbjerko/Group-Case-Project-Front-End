import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";
import NavBar from "../../components/NavBar";

class Players extends Component {
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
          <h1>Players</h1>

          <IndexReturn />
        </div>
      </div>
    );
  }
}

export default Players;
