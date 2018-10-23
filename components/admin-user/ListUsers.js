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

   
  }

  showUser(id) {
    console.log("huhuhuhu" + id);
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

  async componentDidMount() {
    // "await fetch(`http://localhost:5000/api/user/all`);"
    console.log("Hey");
    try {
      const response = await fetch(`http://localhost:5000/api/user/all`);
        const json = await response.json();
      console.log(json);
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
        <li key={user.userId}>
          <button
            className="btn-admin-player"
            onClick={() => this.showUser(user.userId)}
          >
            {user.userId + " "}
          </button>
        </li>
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
            className="btn-admin-player"
            onClick={this.closeUser}
          >
           Back
          </button>
        </div>
      );
    } else {
      return (
        <div>
            <br/>
          <ul>{users}</ul>
          <br />
        </div>
      );
    }
  }
}

export default ListUsers;

/*


 onClick={this.showPlayer}
   



     
      */
