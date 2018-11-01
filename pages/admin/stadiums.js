import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import AdminReturn from "../../components/buttons/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";

class Stadiums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stadiums: [],
      ready: false,
      createStadium: false,
      currentPage: 0,
      content: ["Stadium", "Team", "Address"], // Attribute variable names
      contentFields: ["Name", "Team", "Address"] // Names/Values of variables
    };

    this._createStadium = this._createStadium.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  firstPage() {
    this.setState({ currentPage: 0 });
  }
  lastPage() {
    this.setState({ currentPage: Math.floor(this.state.players.length / 10) });
    console.log(this.state.currentPage);
  }

  previousPage() {
    if (this.state.currentPage !== 0)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    console.log(this.state.currentPage);
  }

  nextPage() {
    console.log(this.state.players.length);
    console.log(this.state.players.length / 10);
    if (this.state.currentPage + 1 < this.state.players.length / 10) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
    console.log(this.state.currentPage);
  }

  _createStadium() {
    this.setState({
      createStadium: !this.state.createStadium
    });
  }

  async componentDidMount() {
    console.log("Hey");
    try {
      const response = await fetch(`http://localhost:5000/api/location/all`);
      const json = await response.json();

      this.setState({
        stadiums: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const stadiums = this.state.stadiums.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    if (this.state.createStadium === true) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <h1>Stadiums</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createStadium}>
                Create
              </button>

              <button className="btn-create" onClick={this._matches}>
                Update
              </button>

              <button className="btn-create" onClick={this._teams}>
                Delete
              </button>
            </div>

            <div className="btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createStadium}>
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
              <button
                className="btn-create"
                onClick={() => Router.pushRoute("/admin/location")}
              >
                Create location
              </button>
              <AdminReturn />
            </div>

            <ListInfo
              data={stadiums}
              content={this.state.content}
              contentFields={this.state.contentFields}
              ready={this.state.ready}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              firstPage={this.firstPage}
              lastPage={this.lastPage}
              currentPage={this.state.currentPage}
            />

            {this.state.createPlayer ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default Stadiums;
