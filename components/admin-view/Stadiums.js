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
            <h1>
              {stadium.name} 
            </h1>
            <table className="table-admin-get-one">
              <tbody>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> stadium ID</th>
                  <td className="td-admin-get-one">{stadium.stadiumId}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Name</th>
                  <td className="td-admin-get-one">
                    {stadium.name}
                  </td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Manager</th>
                  <td className="td-admin-get-one">{stadium.coach.person.firstName} {stadium.coach.person.lastName}</td>
                </tr>


                 <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Country</th>
                  <td className="td-admin-get-one"> {stadium.location.address.country}</td>
                </tr>
              
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Owner</th>
                  <td className="td-admin-get-one">{stadium.owner.person.firstName} {stadium.owner.person.lastName}</td>
                </tr>
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Address</th>
                  <td className="td-admin-get-one">
                  {stadium.location.address.addressLine1} 
                  {stadium.location.address.addressLine2} 
                  {stadium.location.address.addressLine3},
                  {stadium.location.address.postalCode},
                  {stadium.location.address.city}
                  </td>
                </tr>
               
                <tr className="tr-admin-get-one">
                  <th className="th-admin-get-one"> Association</th>
                  <td className="td-admin-get-one">{stadium.association.name}</td>
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

export default StadiumInfo;

