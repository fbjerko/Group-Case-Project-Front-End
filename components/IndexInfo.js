import React, { Component } from "react";
import { Router } from "../routes";

class IndexInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showRegister: false,
      info: ["Tonje", "Lasse", "Fredrik", "Karoline"]
    };

   
  }

  getPlayersInfo(params) {
    const Http = new XMLHttpRequest();
    const url='http://localhost:5000/api/player/all';
    Http.withCredentials=true;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
    


    var playerInfo = Http.responseText;

    return JSON.stringify(playerInfo);


    }
    
  }
  render() {
    const infoList = this.state.info.map(inf => <li> {inf}</li>);
   
    if(this.props.matches){
        return (
            <div className="info-container">
            <div>
              <div className="frontpage-info2">
                <div className="top">
                  <h2>Matches</h2>
                </div>
                <ul>{infoList}</ul>
              </div>
            </div>
          </div>
        );
    }

    if(this.props.teams){
        return (
            <div className="info-container">
            <div>
              <div className="frontpage-info2">
                <div className="top">
                  <h2>Players</h2>
                </div>
                <ul>{infoList}</ul>
              </div>
            </div>
          </div>
        );
    }
  }
}

export default IndexInfo;
