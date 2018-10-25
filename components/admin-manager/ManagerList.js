import React, { Component } from "react";
import ManagerInfo from "./ManagerInfo";

class ManagerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeManager: "",
      displayManager: false
    };

    this.showManager = this.showManager.bind(this);
    this.closeManager = this.closeManager.bind(this);
  }

  showManager(id) {
    console.log("huhuhuhu" + id);
    this.setState({
      activeManager: id,
      displayManager: true
    });
  }

  closeManager() {
    this.setState({
      activeManager: "",
      displayManager: false
    });
  }

  render() {
    const managers = this.props.managers.map(manager => {
      return (
        <tr
          key={manager.coachId}
          className="tr-admin-get-all"
          onClick={() => this.showManager(manager.coachId)}
        >
          <td className="td-admin-get-all">
            {manager.person.firstName} {manager.person.lastName} {""}
          </td>

          <td className="td-admin-get-all">{manager.team.name} {""} </td>
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
          <ManagerInfo
            id={this.state.activeManager}
            closeManager={this.closeManager}
          />
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
              <td
                  className="td-admin-but"
                  onClick={this.props.firstPage}
                >
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
                <td
                  className="td-admin-but"
                  onClick={this.props.lastPage}
                >
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

