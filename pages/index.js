import React, {Component} from "react";
import LayoutGlobal from "../components/LayoutGlobal";
import Login from "../components/Login";
import Register from "../components/Register";
import IndexInfo from "../components/IndexInfo";
import Loading from "../components/buttons/loading";
import ListInfo from "../components/admin-view/ListInfo";
import i18n from "../i18n"
import NavbarIndex from "../components/NavbarIndex";


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
    this.changePage = this.changePage.bind(this);
  }

  onLanguageChanged = (lng) => {
    this.setState({lng: lng});

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

  changePage(command) {

    if(command === 0) {
      this.setState({ currentPage: 0 });
    }
    if(command === 1) {
      if (this.state.currentPage !== 0)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    }
    if (command === 2) {
     
    if (this.state.currentPage + 1 < this.state.playersArray.length / 10) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
    } if(command === 3) {
      this.setState({
        currentPage: Math.floor(this.state.playersArray.length / 10)
      });
    }
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



    async componentDidMount() {
        i18n.on('languageChanged', this.onLanguageChanged);

        try {
            const response = await fetch(process.env.API_URL + "/api/player/all",{
                credentials: 'include',headers:{Authorization:"Bearer "+localStorage.getItem("token")}
            });
            const json = await response.json();
            this.setState({
                playersArray: json
            });
        } catch (error) {
            console.log(error);
        }

        try {
            const response = await fetch(
                process.env.API_URL + "/api/teamResult/homeTeam",{
                    credentials: 'include',headers:{Authorization:"Bearer "+localStorage.getItem("token")}
                }
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
                process.env.API_URL + "/api/teamResult/awayTeam",{
                    credentials: 'include',headers:{Authorization:"Bearer "+localStorage.getItem("token")}
                }
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
                <NavbarIndex
                    onLoginClick={this._onLoginClick}
                    onRegisterClick={this._onRegisterClick}
                />


                <div className="btn-group-index-toggle-info">
                    <button className="btn-index-toggle" onClick={this._matches}>
                        {i18n.t("MATCHES", this.state.lng)}
                    </button>

                    <button className="btn-index-toggle" onClick={this._players}>
                        {i18n.t("PLAYERS", this.state.lng)}
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
                            changePage={this.changePage}
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
                            changePage={this.changePage}
                            canEdit={this.state.canEdit}
                            userId={0}
                            currentPage={this.state.currentPage}
                            canLoad={false}
                        />
                    ) : null}
                </div>

                {this.state.showLogin ? <Login close={this._onLoginClick}/> : null}
                {this.state.showRegister ? <Register/> : null}
            </LayoutGlobal>
        );
    }

}

export default Index;
