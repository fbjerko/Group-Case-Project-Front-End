import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import AdminReturn from "../../../components/AdminReturn";
import UserList from "../../../components/admin-user/UserList";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      ready: false,
      createUser: false,
      currentPage: 0
    };

    this._createUser = this._createUser.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  previousPage() {
    if (this.state.currentPage !== 0)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    console.log(this.state.currentPage);
  }

  nextPage() {
    if (this.state.currentPage + 1 < this.state.users.length / 10) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    } 
    console.log(this.state.currentPage);
  }
  


  _createUser() {
    this.setState({
      createUser: !this.state.createUser
    });
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

  componentWillUpdate() {
    
  }

  render() {
    const users = this.state.users.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );

    

    if (this.state.createUser === true) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <h1>Users</h1>

            <div className="btn-admin-create-top">

              <button className="btn-create" onClick={this._matches}>
                Update
              </button>

              <button className="btn-create" onClick={this._teams}>
                Delete
              </button>
            </div>

            <div className="btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createUser}>
                Back
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <div className="btn-admin-config">
              <button className="btn-create" onClick={this._createUser}>
                Edit/Delete User
              </button>
              <AdminReturn />
            </div>

            <div className="list-info-admin">
              <UserList
                users={users}
                ready={this.state.ready}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
              />
            </div>

            <h2>Page {this.state.currentPage + 1}</h2>
            {this.state.createUser ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default Users;
