import React, { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import Login from "../components/Login";
import Register from "../components/Register";
import IndexInfo from "../components/IndexInfo";
import Loading from "../components/buttons/loading";
import ListInfo from "../components/admin-view/ListInfo";

const context = React.createContext();

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showRegister: false,
      players: false,
      matches: false,
      playersArray: [],
      homeTeams: [],
      awayTeam: [],
      matchesArray: [],
      canEdit: false,
      ready: false,
      currentPage: 0
    };

    this._onLoginClick = this._onLoginClick.bind(this);
    this._onRegisterClick = this._onRegisterClick.bind(this);
    this._matches = this._matches.bind(this);
    this._players = this._players.bind(this);

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  _onLoginClick() {
    this.setState({
      showLogin: !this.state.showLogin,
      showRegister: false
    });
  }

  _onRegisterClick() {
    this.setState({
      showRegister: !this.state.showRegister,
      showLogin: false
    });
  }

  _matches() {
    this.setState({
      currentPage: 0,
      matches: !this.state.matches,
      players: false,
  
    });
  }

  _players() {
    this.setState({
      currentPage: 0,
      players: !this.state.players,
      matches: false,
      
    });
  }

  firstPage() {
    this.setState({ currentPage: 0 });
  }
  lastPage() {
    this.setState({
      currentPage: Math.floor(this.state.playersArray.length / 10)
    });
    console.log(this.state.currentPage);
  }

  previousPage() {
    if (this.state.currentPage !== 0)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    console.log(this.state.currentPage);
  }

  nextPage() {
    console.log(this.state.playersArray.length + "    HDUHASDUSAHUDHSA");
    
    if (this.state.currentPage + 1 < this.state.playersArray.length / 10) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
    console.log(this.state.currentPage);
  }

  async componentDidMount() {
    try {
      const response = await fetch(process.env.API_URL + "/api/player/all");
      const json = await response.json();
      this.setState({
        playersArray: json
      });
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        process.env.API_URL + "/api/teamResult/homeTeam"
      );
      const json = await response.json();
      this.setState({
        homeTeams: json
      });
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(
        process.env.API_URL + "/api/teamResult/awayTeam"
      );
      const json = await response.json();
      this.setState({
        awayTeams: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }

    await this.createMatchesArray();
  }

  createMatchesArray() {
    const homeTeams = this.state.homeTeams;
    const awayTeams = this.state.awayTeams;

    console.log(homeTeams.length + " is Length");
    const matches = [];
    for (let i = 0; i < homeTeams.length; i++) {
      console.log("IN LOOP");
      matches.push([
        i,
        homeTeams[i][1],
        i,
        homeTeams[i][3],
        i,
        homeTeams[i][7] + " - " + awayTeams[i][7],
        i,
        awayTeams[i][3],
        i,
        awayTeams[i][5]
      ]);
      //  -- Date --     -- HomeTeam --   -- Win/Loss --   -- Win/Loss --   -- AwayTeam --    -- Arena --
    }

    this.setState({
      matchesArray: matches
    });

    console.log(this.state.matchesArray);
  }

  render() {
    const players = this.state.playersArray.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );

    const matches = this.state.matchesArray.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );

    return (
      <LayoutGlobal>
        <div className="btn-group-index-login-reg">
          <button className="btn-index-login-reg " onClick={this._onLoginClick}>
            Log in
          </button>

          <button
            className="btn-index-login-reg "
            onClick={this._onRegisterClick}
          >
            Register
          </button>
        </div>

        <div className="btn-group-index-toggle-info">
          <button className="btn-index-toggle" onClick={this._matches}>
            Matches
          </button>

          <button className="btn-index-toggle" onClick={this._players}>
            Players
          </button>

          {this.state.matches ? (
            <ListInfo
              data={matches}
              name={"Matches"}
              content={["Stadium", "Teams", "Matches", "Teams", "League"]}
              contentFields={[
                "Date",
                "Home Team",
                "Result",
                "Away Team",
                "Arena"
              ]}
              ready={this.state.ready}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              firstPage={this.firstPage}
              lastPage={this.lastPage}
              canEdit={this.state.canEdit}
              userId={0}
              currentPage={this.state.currentPage}
              canLoad={false}
            />
          ) : null}
          {this.state.players ? (
            <ListInfo
              data={players}
              name={"Players"}
              content={["Players", "Teams"]}
              contentFields={["Name", "Team"]}
              ready={this.state.ready}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              firstPage={this.firstPage}
              lastPage={this.lastPage}
              canEdit={this.state.canEdit}
              userId={0}
              currentPage={this.state.currentPage}
              canLoad={false}
            />
          ) : null}
        </div>

        {this.state.showLogin ? <Login close={this._onLoginClick} /> : null}
        {this.state.showRegister ? <Register /> : null}
      </LayoutGlobal>
    );
  }
}

export default Index;
