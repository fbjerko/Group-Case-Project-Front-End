import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import TeamsForm from "../../components/forms/teamsForm";
import AdminReturn from "../../components/buttons/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import Loading from "../../components/buttons/loading";

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
      if (this.state.currentPage + 1 < this.state.teams.length / 8) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
    if (command === 3) {
      this.setState({
        currentPage: Math.floor(this.state.teams.length / 8)
      });
    }
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
      const response = await fetch(process.env.API_URL + "/api/team/all",{
          credentials: 'include',Authorization:"Bearer "+localStorage.getItem("token")
      });
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
      this.state.currentPage * 8,
      (this.state.currentPage + 1) * 8
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
            
            </div>

            <ListInfo
              data={teams}
              name = {this.state.content[0]}
              content={this.state.content}
              contentFields={this.state.contentFields}
              ready={this.state.ready}
              changePage={this.changePage}
              canEdit={this.state.canEdit}
              currentPage={this.state.currentPage}
              close={this.props.close}
            />
            

            {this.state.createTeam ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default Teams;
