import React, { Component } from "react";

import PlayerInfo from "../admin-player/PlayerInfo";
import ManagerInfo from "../admin-info/ManagerInfo";
import UserInfo from "../admin-user/UserInfo";
import TeamInfo from "../admin-user/TeamInfo";


class GatewayInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: "",
      displayFirst: false,
      displaySecond: false,
      displayThird: false
    };

    this.showFirst = this.showFirst.bind(this);
    this.close = this.close.bind(this);
    this.showSecond = this.showSecond.bind(this);
    this.showThird = this.showThird.bind(this);
  }

  render() {

    if(this.props.type === 'Player') {
        return (
            <div>
                <PlayerInfo id={this.props.id} close ={this.props.close}/>
            </div>
        )
    }

    if(this.props.type === 'Manager') {
        return (
            <div>
                <ManagerInfo id={this.props.id} close ={this.props.close}/>
            </div>
        )
    }

    if(this.props.type === 'Team') {
        return (
            <div>
                <TeamInfo id={this.props.id} close ={this.props.close}/>
            </div>
        )
    }

    if(this.props.type === 'User') {
        return (
            <div>
                <UserInfo id={this.props.id} close ={this.props.close}/>
            </div>
        )
    }

    else {
        
        return (
           <div>Else</div>

        );
    }
   
  }
}

export default GatewayInfo;

/*


 onClick={this.showFirst}
   



     
      */
