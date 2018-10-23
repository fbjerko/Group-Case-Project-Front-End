import React, { Component } from "react";
import UserInfo from "./UserInfo";

class ListUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      ready: false,
      activeUser: "",
      displayUser: false
    };
    this.showUser = this.showUser.bind(this);
    this.closeUser = this.closeUser.bind(this);
   
  }

  showUser(id) {
    this.setState({
      activeUser: id,
      displayUser: true
    });
  }

  closeUser() {
      this.setState({
          activeUser: "",
          displayUser: false
      })
  }

  async componentWillMount() {
    try {
      const response = await fetch(`http://localhost:5000/api/user/all`);
        const json = await response.json();
      this.setState({
        users: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const users = this.state.users.map(user => {
      return (
        
          <button key={user.userId}
            className="btn-admin-player"
            onClick={() => this.showUser(user.userId)}
          >
            {user.userName + " "}
          </button>
        
      );
    });

    if (this.state.ready === false) {
      return (
        <div>
          Heihei
          <br />
          Vi venter på info
        </div>
      );
    } else if (this.state.displayUser === true) {
      return (
        <div>
          <div>
            <UserInfo id={this.state.activeUser} />
          </div>
          <button
            className="btn-admin-get-users"
            onClick={this.closeUser}
          >
           Back
          </button>
        </div>
      );
    } else {
      return (
        <div className="btn-group-admin-get-all">
            
          {users}
         
        </div>
      );
    }
  }
}

export default ListUsers;

/*


 onClick={this.showPlayer}
   



     
      */
