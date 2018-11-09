import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import UserReturn from "../../components/buttons/UserReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import PlayerInfo from "../../components/admin-view/PlayerInfo";
import TeamInfo from "../../components/admin-view/TeamInfo";


class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      ready: false,
      createTeam: false,
      currentPage: 0,
      content: ["Teams", "Managers"], // Attribute variable names
      contentFields: ["Name", "Manager", "Country"], // Names/Values of variables
      canEdit: false,
      userId: this.props.userId,
      activeId: 0,
      display: 99,
    };


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



  async componentDidMount() {
 

    console.log(this.state.userId);

    try {
        const response = await fetch(process.env.API_URL + "/api/team/all",{
            credentials: 'include'
        });
        const json = await response.json();

      this.setState({
        teams: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

 
  

  render() {
    const teams = this.state.teams.slice(
      this.state.currentPage * 8,
      (this.state.currentPage + 1) * 8
    );
    if (this.state.display === 1) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
       
            <PlayerInfo
              id={this.state.activeId}
              close={this.close}
              canEdit={false}
              userId={this.state.userId}
              updateWatchList={this.props.updateWatchlist}

            />
          </div>
        </div>
      );
    } else if (this.state.display === 2) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
        
            <TeamInfo
              id={this.state.activeId}
              close={this.close}
              canEdit={false}
              userId={this.state.userId}
            />
          </div>
        </div>
      );
    }
     return (
        <div>
          <LayoutGlobal />

          <div className="container">



              <ListInfo
                  data={teams}
                  name = {this.state.content[0]}
                  content={this.state.content}
                  contentFields={this.state.contentFields}
                  ready={this.state.ready}
                  changePage={this.changePage}
                  canEdit={this.state.canEdit}
                  userId={this.state.userId}
                  currentPage={this.state.currentPage}
                  close={this.props.close}
              />

            {this.state.createTeam ? <CreateUser /> : null}
          </div>
        </div>
      );

  }
}

export default Teams;
