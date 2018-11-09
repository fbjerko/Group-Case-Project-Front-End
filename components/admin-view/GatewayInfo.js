import React, { Component } from "react";

import PlayerInfo from "./PlayerInfo";
import ManagerInfo from "./ManagerInfo";
import UserInfo from "./UserInfo";
import TeamInfo from "./TeamInfo";
import StadiumInfo from "./StadiumInfo";
import MatchInfo from "./MatchInfo";
import PersonInfo from "./PersonInfo";


class GatewayInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: "",
      displayFirst: false,
    };
  }

  render() {

    if (this.props.content === "Players") {
      return (
        <div>
          <PlayerInfo editPlayer={this.props.edit} id={this.props.id} close={this.props.close} canEdit={this.props.canEdit} userId={this.props.userId}/>
        </div>
      );
    }

    if (this.props.content === "Managers") {
      return (
        <div>
          <ManagerInfo id={this.props.id} close={this.props.close} canEdit={this.props.canEdit} />
        </div>
      );
    }

    if (this.props.content === "Teams") {
          
      return (
        <div>
          <TeamInfo id={this.props.id} close={this.props.close} canEdit={this.props.canEdit} userId={this.props.userId}/>
        </div>
      );
    }

    if (this.props.content === "Users") {
      return (
        <div>
          <UserInfo id={this.props.id} close={this.props.close} canEdit={this.props.canEdit} />
        </div>
      );
    } if (this.props.content === "Stadium") {
      return (
        <div>
          <StadiumInfo id={this.props.id} close={this.props.close} canEdit={this.props.canEdit}/>
        </div>
      );
    }
    if (this.props.content === "Matches") {
      return (
        <div>
          <MatchInfo id={this.props.id} close={this.props.close} canEdit={this.props.canEdit}/>
        </div>
      );
    }  if (this.props.content === "Persons") {
      return (
        <div>
          <PersonInfo id={this.props.id} close={this.props.close} canEdit={this.props.canEdit}/>
        </div>
      );
    }  else {
      this.props.close();
      return <div />;
    }
  }
}

export default GatewayInfo;

/*


 onClick={this.showFirst}
   



     
      */
