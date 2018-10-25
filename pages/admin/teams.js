import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import AdminReturn from "../../components/AdminReturn";
import TeamList from "../../components/admin-team/TeamList";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      ready: false,
      createTeam: false,
      currentPage: 0
    };

    this._createTeam = this._createTeam.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  firstPage() { 
    this.setState({currentPage: 0})
  }
  lastPage() { 
    this.setState({currentPage: Math.floor(this.state.teams.length/10 )});
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
      const response = await fetch(`http://localhost:5000/api/team/all`);
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
    console.log(this.state.teams.length
      );
    const teams = this.state.teams.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    if (this.state.createTeam === true) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <h1>teams</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" >
                Create
              </button>

              <button className="btn-create" >
                Update
              </button>

              <button className="btn-create" >
                Delete
              </button>
            </div>

            <div className="btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createTeam}>
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
              <button className="btn-create" onClick={this._createTeam}>
                Configure
              </button>
              <AdminReturn />
            </div>

           
              <TeamList
                teams={teams}
                ready={this.state.ready}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
                firstPage= {this.firstPage}
                lastPage={this.lastPage}
              />
          
            <h2>Page {this.state.currentPage + 1}</h2>
            {this.state.createTeam ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default Teams;
