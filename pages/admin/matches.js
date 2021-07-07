import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import ManagerForm from "../../components/forms/managerForm";
import AdminReturn from "../../components/buttons/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import Loading from "../../components/buttons/loading";
import MatchesForm from "../../components/forms/matchesForm";
import NavbarUser from "../../components/NavbarUser";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      homeTeams: [],
      awayTeams: [],
      filteredData: [],
      teams: [],
      search: "a",
      ready: false,
      createMatch: false,
      currentPage: 0,
      content: ["Date", "Teams", "Matches", "Teams", "Arena"], // Attribute variable names
      contentFields: ["Date", "Home Team", "Result", "Away Team", "Arena"],
      canEdit: true // Names/Values of variables
    };

    this.changePage = this.changePage.bind(this);
    this.createMatch = this.createMatch.bind(this);
  }
    componentWillReceiveProps(nextProps) {


        if (nextProps.url!=undefined &&nextProps.url.query.create == "true") {
            this.setState({createMatch: true});
        } else {
            this.setState({createMatch: false});
        }
    }
    

    changePage(command) {
        if (command === 0) {
            this.setState({currentPage: 0});
        }
        if (command === 1) {
            if (this.state.currentPage !== 0)
                this.setState(prevState => ({
                    currentPage: prevState.currentPage - 1
                }));
        }
        if (command === 2) {
            if (this.state.currentPage + 1 < this.state.matches.length / 10) {
                this.setState({currentPage: this.state.currentPage + 1});
            }
        }
        if (command === 3) {
            this.setState({
                currentPage: Math.floor(this.state.matches.length / 10)
            });
        }
    }

  changePage(command){
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
      if (this.state.currentPage + 1 < this.state.matches.length / 10) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
    if (command === 3) {
      this.setState({
        currentPage: Math.floor((this.state.matches.length-1) / 10)
      });
    }
  }


  createMatch = () => {
    this.setState({
      createMatch: !this.state.createMatch
    });
  };

  async componentDidMount() {
            if(this.props.url.query.create=="true"){
            this.setState({createMatch:true});
        }

    try {
      const response = await fetch(
        process.env.API_URL + "/api/footballMatch/all",
        {
          credentials: "include",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }

        }
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        matches: json
      });
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        process.env.API_URL + "/api/teamResult/homeTeam",
        {
          credentials: "include",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        homeTeams: json
      });
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(
        process.env.API_URL + "/api/teamResult/awayTeam",
        {
          credentials: "include",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        awayTeams: json
      });
    } catch (error) {
      console.log(error);
    }

    await this.checkIfPlayed();

    this.setState({
      ready: true
    });

    try {
      const response = await fetch(process.env.API_URL + "/api/team/all", {
        credentials: "include",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
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


  checkIfPlayed() {
    const playedMatches = [];
    const playedMatchesHomeResult = [];
    const playedMatchesAwayResult = [];

    console.log(this.state.matches);
    console.log(this.state.homeTeams);
    console.log(this.state.awayTeams);

    this.state.homeTeams.map(match => {
      playedMatches.push(match[0]);
      playedMatchesHomeResult.push(match[6]);
    });
    this.state.awayTeams.map(match => {
      playedMatchesAwayResult.push(match[6]);
    });

    this.state.matches.map(function(match, i) {
      let matchId = match[0];
      let found = playedMatches.find(function(id) {
        if (id === matchId) {
          return matchId;

        }
      });

      function getId(found) {
        return found;
      }

      if (found) {
        let index = playedMatches.indexOf(found);

        // Sets the match result in result field
        match[5] =
          playedMatchesHomeResult[index] +
          " - " +
          playedMatchesAwayResult[index];
      } else {
        match[5] = " View match ";
      }
    });
  }

  render() {


    if (this.state.ready === true) {
      const matches = this.state.matches;


      if (this.state.createMatch) {
        return (
          <div>
            <LayoutGlobal />
              <NavbarUser/>
            <MatchesForm  teams={this.state.teams} close={this.createMatch} edit={"create"} />
          </div>
        );
      } else {
        return (
          <div>
            <LayoutGlobal />
              <NavbarUser/>
            <div className="container">
              <div className="btn-admin-config">
                <button className="btn-create" onClick={this.createMatch}>
                  Create Match
                </button>
              </div>

              <ListInfo
                data={matches}
                name={this.state.content[2]}
                content={this.state.content}
                contentFields={this.state.contentFields}
                ready={this.state.ready}
                changePage={this.changePage}
                canEdit={this.state.canEdit}
                currentPage={this.state.currentPage}
                close={this.props.close}
                
              />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <LayoutGlobal />
            <NavbarUser/>
          <Loading icon={true} text={"Loading..."} />
        </div>
      );
    }
  }
}

export default Matches;
