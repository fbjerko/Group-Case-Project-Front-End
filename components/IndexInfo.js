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

  render() {
    const infoList = this.state.info.map(inf => <li> {inf}</li>);
   
    if(this.props.tables){
        return (
            <div className="info-container">
            <div>
              <div className="frontpage-info1">
                <div className="top">
                  <h2>Tables</h2>
                </div>
                <ul>{infoList}</ul>
              </div>
            </div>
          </div>
        );
    }

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
                  <h2>Teams</h2>
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