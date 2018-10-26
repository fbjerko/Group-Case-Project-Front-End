import React, { Component } from "react";
import ManagerInfo from "./ManagerInfo";
import TeamInfo from "../admin-team/TeamInfo";

class ManagerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: "",
      displayManager: false,
      displayTeam: false
    };

    this.showManager = this.showManager.bind(this);
    this.showTeam = this.showTeam.bind(this);
    this.close = this.close.bind(this);
  }

  showManager(id) {
    this.setState({
      activeId: id,
      displayManager: true,
      displayTeam: false
    });
  }

  showTeam(id) {
    this.setState({
      activeId: id,
      displayTeam: true,
      displayManager: false
    });
  }

  close() {
    this.setState({
      activeId: "",
      displayManager: false,
      displayTeam: false
    });
  }

  render() {
    const managers = this.props.managers.map(manager => {
      return (
        <tr
          key={manager[0]}
          className="tr-admin-get-all"
         
        >
          <td className="td-admin-get-all"
           onClick={() => this.showManager(manager[0])}>{manager[1]}
          </td>

          <td
            className="td-admin-get-all"
            key={manager[2]}
            onClick={() => this.showTeam(manager[2])}
          >
            {manager[3]}
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
    } else if (this.state.displayManager === true) {
      return (
        <div>
          <ManagerInfo id={this.state.activeId} close={this.close} />
        </div>
      );
    } else if (this.state.displayTeam === true) {
      return (
        <div>
          <TeamInfo id={this.state.activeId} close={this.close} />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Managers</h1>
          <div className="div-admin-get-all">
            <table className="table-admin-get-all">
              <tbody>
                <tr className="tr-admin-get-all">
                  <th className="th-admin-get-all"> Name</th>
                  <th className="th-admin-get-all"> Team</th>
                </tr>

                {managers}
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

export default ManagerList;
