import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";
import { Router } from "../../routes";
import AdminReturn from "../../components/AdminReturn";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <LayoutGlobal />

        <div className="container">
          <h1>General</h1>

          <AdminReturn />
        </div>
      </div>
    );
  }
}

export default General;
