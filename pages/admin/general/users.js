import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import AdminReturn from "../../../components/buttons/AdminReturn";
import ListInfo from "../../../components/admin-view/ListInfo";
import NavbarUser from "../../../components/NavbarUser";

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
   this.changePage= this.changePage.bind(this);
  }

  changePage(command) {
    if (command === 0) {
      this.setState({ currentPage: 0 });
    }
    if (command === 1) {
      if (this.state.currentPage !== 0)
        this.setState(prevState => ({
          currentPage: prevState.currentPage - 1
        }));
    }
    if (command === 2) {
      if (this.state.currentPage + 1 < this.state.users.length / 10) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
    if (command === 3) {
      this.setState({
        currentPage: Math.floor(this.state.user.length / 10)
      });
    }
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
          credentials: 'include',headers:{Authorization:"Bearer "+localStorage.getItem("token")}
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
          <NavbarUser/>

          <div className="container">
            <h1>users</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create">Create</button>

              <button className="btn-create">Update</button>

              <button className="btn-create">Delete</button>
            </div>


          </div>
        </div>
      );
    } else {
      return (
        <div>
          <LayoutGlobal />
          <NavbarUser/>

          <div className="container">


            <ListInfo
              data={users}
              content={this.state.content}
              contentFields={this.state.contentFields}
              ready={this.state.ready}
              changePage={this.changePage}
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
