import React, { Component } from "react";

import PlayerInfo from "../admin-player/PlayerInfo";
import ManagerInfo from "../admin-info/ManagerInfo";
import UserInfo from "../admin-user/UserInfo";
import GatewayInfo from "--/admin-view/GatewayInfo";

class ListInfo extends Component {
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

  showFirst(id) {
    console.log("huhuhuhu" + id);
    this.setState({
      activeId: id,
      displayFirst: true,
      displaySecond: false,
      displayThird: false
    });
  }

  showSecond(id) {
    this.setState({
      activeId: id,
      displaySecond: true,
      displayFirst: false,
      displayThird: false
    });
  }

  showThird(id) {
    this.setState({
      activeId: id,
      displayThird: true,
      displaySecond: false,
      displayFirst: false
    });
  }

  close() {
    this.setState({
      activeId: "",
      displayFirst: false,
      displaySecond: false
    });
  }

  render() {
    const data = this.props.data.map(data => {
      return (
        <tr key={data[0]} className="tr-admin-get-all">
          <td
            className="td-admin-get-all"
            onClick={() => this.showFirst(data[0])}
          >
            {data[1]}{" "}
          </td>

          <td
            className="td-admin-get-all"
            key={data[2]}
            onClick={() => this.showSecond(data[2])}
          >
            {data[3]}{" "}
          </td>
        </tr>
      );
    });

    if (this.props.ready === false) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    } else if (this.state.displayFirst === true) {
      return (
        <div>
          <GatewayInfo
          type1={this.props.type}
            id={this.state.activeId}
            close={this.close}
          />
        </div>
      );
    } else if (this.state.displaySecond === true) {
       
      return (
        <div>
          <GatewayInfo
          type2={this.props.type}
            name={this.props.name2}
            id={this.state.activeId}
            close={this.close}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h1>{this.props.name1}</h1>
          <div className="div-admin-get-all">
            <table className="table-admin-get-all">
              <tbody>
                <tr className="tr-admin-get-all">
                  <th className="th-admin-get-all"> Name</th>
                  <th className="th-admin-get-all"> Team</th>
                </tr>

                {data}
              </tbody>
            </table>

            <table className="table-admin-but">
              <tbody>
                <tr>
                  <td className="td-admin-but" onClick={this.props.firstPage}>
                    First Page
                  </td>
                  <td
                    className="td-admin-but"
                    onClick={this.props.previousPage}
                  >
                    Previous Page
                  </td>
                  <td className="td-admin-but" onClick={this.props.nextPage}>
                    Next Page
                  </td>
                  <td className="td-admin-but" onClick={this.props.lastPage}>
                    Last Page
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default ListInfo;

/*


 onClick={this.showFirst}
   



     
      */
