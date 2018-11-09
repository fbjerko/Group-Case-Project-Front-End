import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import AdminReturn from "../../../components/buttons/AdminReturn";
import ListInfo from "../../../components/admin-view/ListInfo";

class users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredData: [],
      search: "a",
      ready: false,
      createUser: false,
      currentPage: 0,
      content: ["Users"], // Attribute variable names
      contentFields: ["Name", "E-Mail"] // Names/Values of variables
    };

    this._createUser = this._createUser.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  firstPage() {
    this.setState({ currentPage: 0 });
  }
  lastPage() {
    this.setState({ currentPage: Math.floor(this.state.users.length / 10) });
    console.log(this.state.currentPage);
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

    console.log(this.state.createUser + " ");
  }

  async componentDidMount() {
    try {

      const response = await fetch(process.env.API_URL+"/api/users/all",{
          credentials: 'include'
      });

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
    const users = this.state.users.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    if (this.state.createUser === true) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <h1>users</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create">Create</button>

              <button className="btn-create">Update</button>

              <button className="btn-create">Delete</button>
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
                Configure
              </button>
       
            </div>

            <ListInfo
              data={users}
              content={this.state.content}
              contentFields={this.state.contentFields}
              ready={this.state.ready}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              firstPage={this.firstPage}
              lastPage={this.lastPage}
              currentPage={this.state.currentPage}
              close={this.props.close}
            />

            {this.state.createUser ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default users;

/*


    let filteredData = (search) => {
      return this.state.users[3].filter((el) => {
        el.toLowerCase().indexOf(search.toLowerCase()) > -1;
      })
    }


  
    console.log("Filtered data "  + filteredData('a'));

    */
