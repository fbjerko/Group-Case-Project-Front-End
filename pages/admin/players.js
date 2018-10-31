import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import AdminReturn from "../../components/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import PlayersForm from "../../components/forms/playersForm";
import CreateUser from "../../components/admin-create/CreateUsers";


class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      ready: false,
      createPlayer: false,
      currentPage: 0,
      content: ['Players', 'Teams'], // Attribute variable names
      contentFields: ['Name', 'Team'] // Names/Values of variables
    };

    this._createPlayer = this._createPlayer.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  firstPage() { 
    this.setState({currentPage: 0})
  }
  lastPage() { 
    this.setState({currentPage: Math.floor(this.state.players.length/10 )});
    console.log(this.state.currentPage);
  }

  previousPage() {
    if (this.state.currentPage !== 0)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    console.log(this.state.currentPage);
  }

  nextPage() {
    console.log(this.state.players.length);
    console.log(this.state.players.length / 10);
    if (this.state.currentPage + 1 < this.state.players.length / 10) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
    console.log(this.state.currentPage);
  }

  _createPlayer() {
    this.setState({
      createPlayer: !this.state.createPlayer
    });

    console.log(this.state.createPlayer + " ");
  }

  async componentDidMount() {

    try {
      const response = await fetch(process.env.API_URL+"/api/player/all");
      const json = await response.json();
  
      this.setState({
        players: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const players = this.state.players.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    if (this.state.createPlayer === true && this.state.ready===true) {
      return (
        <div>
          <LayoutGlobal />
          <PlayersForm edit={"create"}/>
        </div>
      );
    } else if(this.state.createPlayer === false && this.state.ready===true){
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <div className="btn-admin-config">
              <button className="btn-create" onClick={this._createPlayer}>
                Create
              </button>
              <AdminReturn />
            </div>

            <ListInfo
                data={players}
                content= {this.state.content}
                contentFields = {this.state.contentFields}
                ready={this.state.ready}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
                firstPage= {this.firstPage}
                lastPage={this.lastPage}
                edit={this.edit}
              />

              <h2>Page {this.state.currentPage + 1}</h2>

          </div>
        </div>
      );
    }
    else{
      return(<div>
          <h1>Loading...</h1>
      </div>);

    }
  }
}

export default Players;
