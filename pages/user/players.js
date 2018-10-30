import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import UserReturn from "../../components/buttons/UserReturn";
import ListInfo from "../../components/admin-view/ListInfo";


class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      ready: false,
      createPlayer: false,
      currentPage: 0,
      content: ['Players', 'Teams'], // Attribute variable names
      contentFields: ['Name', 'Team'], // Names/Values of variables
      canEdit: false,
      userId: ""
     
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

  getCookie() {
    var name = "id" + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          console.log(c.substring(name.length, c.length) + " is cookie");
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  async componentDidMount() {

    await this.setState({
      userId: this.getCookie()
    });

    console.log(this.state.userId);
    
    try {
      const response = await fetch(process.env.API_URL+"/api/player/all");
      const json = await response.json();
      console.log(json);
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
    if (this.state.createPlayer === true) {
      return (
        <div>
          <LayoutGlobal />

          <div className="container">
            <h1>Players</h1>

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
              <button className="btn-create" onClick={this._createPlayer}>
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
              <button className="btn-create" onClick={this._createPlayer}>
                Configure
              </button>
              <UserReturn />
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
                canEdit={this.state.canEdit}
                userId={this.state.userId}
               
                
              />
      
            <h2>Page {this.state.currentPage + 1}</h2>
            {this.state.createPlayer ? <CreateUser /> : null}
          </div>
        </div>
      );
    }
  }
}

export default Players;
