import React, { Component } from "react";
import UserInfo from "./UserInfo";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    });
  }

  render() {
   
    const users = this.props.users.map(user => {
      return (
        <button
          key={user.userId}
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
          <h2>Loading...</h2>
        </div>
      );
    } else if (this.state.displayUser === true) {
      return (
        <div>
        <UserInfo
          id={this.state.activeUser}
          closeUser={this.closeUser}
        />
      </div>
    );
    
    } else {
      return <div>
      <h1>Users</h1>
      <div className="btn-group-admin-get-all">{users}</div>
      <button onClick={this.props.previousPage}>Previous Page</button>
      <button id="btn-next-page-admin" onClick={this.props.nextPage}>Next Page</button>
    </div>
    }
  }
}

export default UserList;
