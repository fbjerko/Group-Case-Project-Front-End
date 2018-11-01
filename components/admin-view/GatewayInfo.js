import React, { Component } from "react";

import PlayerInfo from "./PlayerInfo";
import ManagerInfo from "./ManagerInfo";
import UserInfo from "./UserInfo";
import TeamInfo from "./TeamInfo";


class GatewayInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: "",
      displayFirst: false
    };
  }

  render() {
    console.log(this.props.canEdit + "");
    if (this.props.content === "Players") {
      return (
        <div>
          <PlayerInfo id={this.props.id} close={this.props.close} canEdit={this.props.canEdit} userId={this.props.userId}/>
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
    } if (this.props.content === "Stadiums") {
      return (
        <div>
          <StadiumInfo id={this.props.id} close={this.props.close} canEdit={this.props.canEdit}/>
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
