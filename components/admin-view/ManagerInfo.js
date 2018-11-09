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

    try {
      const response = await fetch(
        process.env.API_URL + "/api/coach/" + this.props.id,{
              credentials: 'include'
          }
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
    let buttons; // Decides if we can edit or not
    if (this.props.canEdit === true) {
      buttons = (
        <table className="table-admin-but">
          <tbody>
            <tr>
              <td className="td-admin-but" onClick={this.props.firstPage}>
                EDIT
              </td>
              <td className="td-admin-but" onClick={this.props.previousPage}>
                DELETE
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      buttons = ( <br></br>
       
      );
    }
  
    if (this.state.ready === true) {
      const manager = this.state.managerInfo;
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
            {buttons}
          </div>
          <button onClick={this.props.close}>Back</button>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default ManagerInfo;
