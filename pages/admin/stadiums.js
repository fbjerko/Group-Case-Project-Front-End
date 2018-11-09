import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import AdminReturn from "../../components/buttons/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import LocationsForm from "../../components/forms/locationsForm";
import Loading from "../../components/buttons/loading";

class Stadiums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stadiums: [],
      ready: false,
      createStadium: false,
      currentPage: 0,
      content: ["Stadium", "Team", "Address"], // Attribute variable names
      contentFields: ["Name", "Team", "Address"], // Names/Values of variables
      canEdit: true // Names/Values of variables
    };

    this._createStadium = this._createStadium.bind(this);
    this.changePage = this.changePage.bind(this);
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
      if (this.state.currentPage + 1 < this.state.stadiums.length / 5) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
    if (command === 3) {
      this.setState({
        currentPage: Math.floor(this.state.stadiums.length / 5)
      });
    }
  }

  _createStadium() {
    this.setState({
      createStadium: !this.state.createStadium
    });
  }

  async componentDidMount() {
    console.log("Hey");
    try {
      const response = await fetch(process.env.API_URL + "/api/location/all");
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
    if (this.state.ready === true) {
      const stadiums = this.state.stadiums.slice(
        this.state.currentPage * 5,
        (this.state.currentPage + 1) * 5
      );
      if (this.state.createStadium === true) {
        return (
          <div>
            <LayoutGlobal />
            <LocationsForm />
            <div className="btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createStadium}>
                Back
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <LayoutGlobal />

            <div className="container">
              <div className="btn-admin-config">
                <button className="btn-create" onClick={this._createStadium}>
                  Create location
                </button>
                <AdminReturn />
              </div>

              <ListInfo
                data={stadiums}
                name={this.state.content[0]}
                content={this.state.content}
                contentFields={this.state.contentFields}
                ready={this.state.ready}
                changePage={this.changePage}
                currentPage={this.state.currentPage}
                close={this.props.close}
              />

              {this.state.createPlayer ? <CreateUser /> : null}
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <LayoutGlobal />
          <Loading icon={true} text={"Loading players..."} />
        </div>
      );
    }
  }
}

export default Stadiums;
