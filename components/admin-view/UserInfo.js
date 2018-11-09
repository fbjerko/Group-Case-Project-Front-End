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
          process.env.API_URL+"/api/user/findById/" + this.props.id,{
              credentials: 'include'
          }
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
                  <th className="th-admin-get-one"> User ID</th>
                  <td className="td-admin-get-one">{user.userId}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Username</th>
                  <td className="td-admin-get-one">
                    {user.userName}
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

export default UserInfo;


