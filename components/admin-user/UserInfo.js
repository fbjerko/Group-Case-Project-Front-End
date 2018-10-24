import React, { Component } from "react";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "0",
      userInfo: [],
      ready: false
    };
  }

  async componentWillMount() {
    
    console.log("Hey");
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/` + this.props.id
      );
      const json = await response.json();
      
      this.setState({
        userInfo: json ,
        ready: true
      });
      console.log(json);
    } catch (error) {
      console.log(error);
    }

    
  }

  render() {

    const user = this.state.userInfo;
  
    if (this.state.ready === true) {
      return (
        <div>
           <p>ID: {user.userId}</p>
          <p>Username: {user.userName}</p>
          <p>E-Mail: {user.email}</p>
          <p>Is Admin: {user.admin + ""}</p>

           <button className="btn-admin-player" onClick={this.props.closeUser}>
            Back
          </button>
          

        </div>
      );
    }
    else {
      return(
        <div>Loading</div>
      )
    }
  } 
}

export default UserInfo;
