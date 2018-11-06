import React, { Component } from "react";

class MatchInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      managerId: "0",
      managerInfo: [],
      ready: false
    };
  }

  async componentWillMount() {
    // "await fetch(`http://localhost:5000/api/user/all`);"
    console.log("Hey");
    try {
      const response = await fetch(
          process.env.API_URL+"/api/coach/" + this.props.id
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        managerInfo: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
   
 
      return <div>Loading</div>;
    
  }
}

export default MatchInfo;
