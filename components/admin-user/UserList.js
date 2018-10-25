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
    });
  }

  render() {
    const users = this.props.users.map(user => {
      return (
        <tr
          key={user.UserId}
          className="tr-admin-get-all"
          onClick={() => this.showUser(user.userId)}
        >
          <td className="td-admin-get-all">
            {user.userName} {""}
          </td>

          <td className="td-admin-get-all">{user.email} {""} </td>
        </tr>
      );
    });

    if (this.props.ready === false) {
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
      return (
        <div>
          <h1>Users</h1>
          <div className="div-admin-get-all">
            <table className="table-admin-get-all">
              <tbody>
                <tr className="tr-admin-get-all">
                  <th className="th-admin-get-all"> Name</th>
                  <th className="th-admin-get-all"> User</th>
                </tr>

                {users}
              </tbody>
            </table>

            <table className="table-admin-but">
              <tbody>
                <tr>
              <td
                  className="td-admin-but"
                  onClick={this.props.firstPage}
                >
                  First Page
                </td>
                <td
                  className="td-admin-but"
                  onClick={this.props.previousPage}
                >
                  Previous Page
                </td>
                <td className="td-admin-but" onClick={this.props.nextPage}>
                  Next Page
                </td>
                <td
                  className="td-admin-but"
                  onClick={this.props.lastPage}
                >
                  Last Page
                </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default UserList;

