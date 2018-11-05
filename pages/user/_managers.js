import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import UserReturn from "../../components/buttons/UserReturn";
import ListInfo from "../../components/admin-view/ListInfo";

class Managers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      managers: [],
      filteredData: [],
      search: "a",
      ready: false,
      createManager: false,
      currentPage: 0,
      content: ["Managers", "Teams"], // Attribute variable names
      contentFields: ["Name", "Team"], // Names/Values of variables
      canEdit: false
    };

    this._createManager = this._createManager.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  firstPage() {
    this.setState({ currentPage: 0 });
  }
  lastPage() {
    this.setState({ currentPage: Math.floor(this.state.managers.length / 10) });
    console.log(this.state.currentPage);
  }

  previousPage() {
    if (this.state.currentPage !== 0)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    console.log(this.state.currentPage);
  }

  nextPage() {
    if (this.state.currentPage + 1 < this.state.managers.length / 10) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
    console.log(this.state.currentPage);
  }

  _createManager() {
    this.setState({
      createManager: !this.state.createManager
    });

    console.log(this.state.createManager + " ");
  }

  async componentDidMount() {
    try {
      const response = await fetch(process.env.API_URL + "/api/coach/all");
      const json = await response.json();
      console.log(json);
      this.setState({
        managers: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const managers = this.state.managers.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    if (this.state.createManager === true) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <h1>Managers</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create">Create</button>

              <button className="btn-create">Update</button>

              <button className="btn-create">Delete</button>
            </div>

            <div className="btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createManager}>
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
              <UserReturn />
            </div>

            <ListInfo
              data={managers}
              name = {this.state.content[0]}
              content={this.state.content}
              contentFields={this.state.contentFields}
              ready={this.state.ready}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              firstPage={this.firstPage}
              lastPage={this.lastPage}
              canEdit={this.state.canEdit}
              currentPage={this.state.currentPage}
            />

            {this.state.createManager ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default Managers;

/*


    let filteredData = (search) => {
      return this.state.managers[3].filter((el) => {
        el.toLowerCase().indexOf(search.toLowerCase()) > -1;
      })
    }


  
    console.log("Filtered data "  + filteredData('a'));

    */
