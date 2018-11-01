import React, { Component } from "react";

class StadiumInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stadiumId: "0",
      stadiumInfo: [],
      ready: false
    };
  }

  async componentWillMount() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/location/` + this.props.id
      );
      const json = await response.json();
      console.log("hduashduas " + json);
      this.setState({
        stadiumInfo: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const stadium = this.state.stadiumInfo;
    if (this.state.ready === true) {
      return (
        <div>
          <div className="div-admin-get-all">
            <h1>{stadium.name}</h1>
            <table className="table-admin-get-one">
              <tbody>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Location ID</th>
                  <td className="td-admin-get-one">{stadium.locationId}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Name</th>
                  <td className="td-admin-get-one">{stadium.name}</td>
                </tr>

                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Address</th>
                  <td className="td-admin-get-one">
                    {stadium.address.addressLine1} 
                    {stadium.address.addressLine2} 
                    {stadium.address.addressLine3}, {stadium.address.postalCode},
                    {stadium.address.city}
                  </td>
                </tr>

                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Country</th>
                  <td className="td-admin-get-one">
                    {" "}
                    {stadium.address.country}
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
          <button onClick={this.props.close}>Back</button>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default StadiumInfo;
