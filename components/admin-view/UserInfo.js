import React, { Component } from "react";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "0",
      userInfo: [],
      ready: false
    };
  }

  async componentWillMount() {

    try {
      const response = await fetch(
        'http://localhost:5000/api/user/findById/' + this.props.id
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
        this.setState({
            userInfo: json,
            ready: true
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.state.userInfo;
    if (this.state.ready === true) {
      return (
        <div>
          <div className="div-admin-get-all">
            <h1>
              {user.name} 
            </h1>
            <table className="table-admin-get-one">
              <tbody>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> user ID</th>
                  <td className="td-admin-get-one">{user.user}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Name</th>
                  <td className="td-admin-get-one">
                    {user.name}
                  </td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> user</th>
                  <td className="td-admin-get-one">{user.name}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Number</th>
                  <td className="td-admin-get-one">{user.name}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Position</th>
                  <td className="td-admin-get-one">{user.name}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Date Of Birth</th>
                  <td className="td-admin-get-one">
                    {user.name}
                  </td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Address</th>
                  <td className="td-admin-get-one">
                 Her setter vi addressa
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
          <button  onClick={this.props.closeuser}>
            Back
          </button>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default UserInfo;

/*

   {user.person.address.addressLine1}{" "}
                    {user.person.address.addressLine2}{" "}
                    {user.person.address.addressLine3},{" "}
                    {user.person.address.postalCode},{" "}
                    {user.person.address.city},{" "}
                    {user.person.address.country}

                    */
