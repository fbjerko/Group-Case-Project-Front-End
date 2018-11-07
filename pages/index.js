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
      players: false,
      playersArray: [],
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
      matches: !this.state.matches,
      players: false
    });
  }

  _players() {
    this.setState({
      players: !this.state.players,
      matches: false
    });
  }

  firstPage() {
    this.setState({ currentPage: 0 });
  }
  lastPage() {
    this.setState({ currentPage: Math.floor(this.state.playersArray.length / 10) });
    console.log(this.state.currentPage);
  }

  previousPage() {
    if (this.state.currentPage !== 0)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    console.log(this.state.currentPage);
  }

  nextPage() {
    
    console.log(this.playersArray/ 10);
    if (this.state.currentPage + 1 < this.playersArray/ 10) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
    console.log(this.state.currentPage);
  }

  
  async componentDidMount() {
    try {
      const response = await fetch(process.env.API_URL + "/api/player/all");
      const json = await response.json();
      console.log(json);
      this.setState({
        playersArray: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }

  }

  render() {

    console.log(this.state.playersArray);

    const players = this.state.playersArray.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );

    console.log(players);
    return (

        <LayoutGlobal >

        <div className="btn-group-index-login-reg">
          <button className="btn-index-login-reg " onClick={this._onLoginClick}>
            Log in
          </button>

          <button className="btn-index-login-reg " onClick={this._onRegisterClick}>
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

          {this.state.matches ? <IndexInfo matches={this.state.matches}/> : null}
          {this.state.players ? <ListInfo
              data={players}
              name = {"Players"}
              content={['Players','Teams']}
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
            /> : null}
        </div>

        
        {this.state.showLogin ? <Login close={this._onLoginClick} /> : null}
        {this.state.showRegister ? <Register  /> : null}
        </LayoutGlobal >
      
    );
  }
}

export default Index;
