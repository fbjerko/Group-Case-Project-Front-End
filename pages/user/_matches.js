import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import ManagerForm from "../../components/forms/managerForm";
import AdminReturn from "../../components/buttons/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import Loading from "../../components/buttons/loading";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      homeTeams: [],
      awayTeams: [],
      filteredData: [],
      search: "a",
      ready: false,
      createManager: false,
      currentPage: 0,
      content: ["Date", "Teams", "Matches", "Teams", "League"], // Attribute variable names
      contentFields: ["Date", "Home Team", "Result", "Away Team", "Arena"],
      canEdit: true // Names/Values of variables
    };

    this._createManager = this._createManager.bind(this);
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
      if (this.state.currentPage + 1 < this.state.matches.length / 10) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
    if (command === 3) {
      this.setState({
        currentPage: Math.floor(this.state.matches.length / 10)
      });
    }
  }

  _createManager() {
    this.setState({
      createManager: !this.state.createManager
    });

    console.log(this.state.createManager + " ");
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        process.env.API_URL + "/api/footballMatch/all",{
              credentials: 'include'
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
        process.env.API_URL + "/api/teamResult/homeTeam",{
              credentials: 'include'
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
        process.env.API_URL + "/api/teamResult/awayTeam",{
              credentials: 'include'
          }
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        awayTeams: json,
        
      });
    } catch (error) {
      console.log(error);
    }

    await this.checkIfPlayed();

    this.setState({
      ready:true
    })
  }

  checkIfPlayed() {
    const playedMatches = [];
    const playedMatchesHomeResult = [];
    const playedMatchesAwayResult = [];

    this.state.homeTeams.map(match => {
      playedMatches.push(match[0]);
      playedMatchesHomeResult.push(match[6])
    });
    this.state.awayTeams.map(match => {
      playedMatchesAwayResult.push(match[6])
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
        match[5] = playedMatchesHomeResult[index] + " - " + playedMatchesAwayResult[index];

      } else {
        match[5] = ' View match '
      }
    });
    
 
  }

  render() {
    if (this.state.ready === true) {
      const matches = this.state.matches.slice(
        this.state.currentPage * 10,
        (this.state.currentPage + 1) * 10
      );

      return (
        <div>
          <LayoutGlobal />

          <div className="container">
           

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

            {this.state.createManager ? <CreateUser /> : null}
          </div>
        </div>
      );
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

export default Matches;

/*


    let filteredData = (search) => {
      return this.state.matches[3].filter((el) => {
        el.toLowerCase().indexOf(search.toLowerCase()) > -1;
      })
    }


  
    console.log("Filtered data "  + filteredData('a'));

    */
