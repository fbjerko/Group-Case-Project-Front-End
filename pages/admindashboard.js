import React, { Component } from "react";
import Head from "next/head";
import LayoutGlobal from "../components/LayoutGlobal";
import IndexReturn from "../components/IndexReturn";
import NavBar from "../components/NavBar";



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

        <Head>
            <link rel="stylesheet"
          type="text/css"
          href="../static/style/admin.css"
          /> 
        </Head>

        <LayoutGlobal />
        <h1>Dashboard</h1>
        <NavBar/>

        <IndexReturn/>
        
      </div>
    );
  }
}

export default Dashboard;
