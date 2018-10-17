import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import IndexReturn from "../components/IndexReturn";



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
  }

 

  componentDidMount() {}

  render() {
    return (
      <div>
        <LayoutGlobal />
        <div className="container">
        <h1>Dashboard</h1>
        

        <IndexReturn
        />
        </div>
        
      </div>
    );
  }
}

export default Dashboard;
