import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";

import AdminReturn from "../../components/AdminReturn";
import TeamsForm from "../../components/forms/teamsForm";

import ListInfo from "../../components/admin-view/ListInfo";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      ready: false,
      createTeam: false,
      currentPage: 0,
      content: ["Teams", "Managers"], // Attribute variable names
      contentFields: ["Name", "Manager", "Stadium", "Country"],
      canEdit: true // Names/Values of variables
    };

    this._createTeam = this._createTeam.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  firstPage() {
    this.setState({ currentPage: 0 });
  }
  lastPage() {
    this.setState({ currentPage: Math.floor(this.state.teams.length / 10) });
    console.log(this.state.currentPage);
  }

  previousPage() {
    if (this.state.currentPage !== 0)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    console.log(this.state.currentPage);
  }

  nextPage() {
    if (this.state.currentPage + 1 < this.state.teams.length / 10) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
    console.log(this.state.currentPage);
  }

  _createTeam() {
    this.setState({
      createTeam: !this.state.createTeam
    });

    console.log(this.state.createTeam + " ");
  }

  async componentDidMount() {
    console.log("Hey");
    try {
      const response = await fetch(process.env.API_URL + "/api/team/all");
      const json = await response.json();
      console.log(json);
      this.setState({
        teams: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.state.teams.length);
    const teams = this.state.teams.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    if (this.state.createTeam === true) {
      return (
        <div>
          <LayoutGlobal />


            <h1>Teams</h1>
            <TeamsForm />
          <div className = "btn-admin-create-bottom">

              <button className="btn-create" onClick={this._createTeam}>
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
              <button className="btn-create" onClick={this._createTeam}>
                Create team
              </button>
              <AdminReturn />
            </div>

            <ListInfo
              data={teams}
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

            {this.state.createTeam ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default Teams;
