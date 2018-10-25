import React, { Component } from "react";

class ManagerInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      managerId: "0",
      managerInfo: [],
      ready: false
    };
  }

  async componentWillMount() {
    // "await fetch(`http://localhost:5000/api/user/all`);"
    console.log("Hey");
    try {
      const response = await fetch(
        `http://localhost:5000/api/coach/` + this.props.id
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        managerInfo: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const manager = this.state.managerInfo;
    if (this.state.ready === true) {
      return (
        <div>
          <div className="div-admin-get-all">
            <h1>
              {manager.person.firstName} {manager.person.lastName}
            </h1>
            <table className="table-admin-get-one">
              <tbody>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Manager ID</th>
                  <td className="td-admin-get-one">{manager.coachId}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Name</th>
                  <td className="td-admin-get-one">
                    {manager.person.firstName} {manager.person.lastName}
                  </td>
                </tr>
                
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Date Of Birth</th>
                  <td className="td-admin-get-one">
                    {manager.person.dateOfBirth}
                  </td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Address</th>
                  <td className="td-admin-get-one">
                    {manager.person.address.addressLine1}{" "}
                    {manager.person.address.addressLine2}{" "}
                    {manager.person.address.addressLine3},{" "}
                    {manager.person.address.postalCode},{" "}
                    {manager.person.address.city},{" "}
                    {manager.person.address.country}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table-admin-but">
              <tbody>
                <tr>
                  <td className="td-admin-but" onClick={this.props.firstPage}>
                    EDIT
                  </td>
                  <td
                    className="td-admin-but"
                    onClick={this.props.previousPage}
                  >
                    DELETE
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button  onClick={this.props.close}>
            Back
          </button>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default ManagerInfo;
