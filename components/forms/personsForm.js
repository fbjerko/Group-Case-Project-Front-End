import React from "react";
import SearchField from "../admin-create/SearchField";
import Popupp from "../popupp";

class PersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      address_id: -1,
      showPop: false,
      status: "Nothing"
    };
  }

  updateSearchField = id => {
    console.log(id);
    this.setState({ addressId: id });
  };

  updateInput = event => {
    if (event.target.id == "first_name") {
      this.setState({ first_name: event.target.value });
    } else if (event.target.id == "last_name") {
      this.setState({ last_name: event.target.value });
    } else if (event.target.id == "date_of_birth") {
      this.setState({ date_of_birth: event.target.value });
    }
  };

  sendPerson = () => {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", process.env.API_URL + "/api/person", true);
    xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("token","Bearer "+localStorage.getItem("token"));
    xhttp.withCredentials = true;
    xhttp.send(
      JSON.stringify({
        addressId: this.state.addressId,
        firstName: this.state.first_name,
        lastName: this.state.last_name,
        date: this.state.date_of_birth
      })
    );
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status == 201) {
          console.log("Created");
          this.setState({ status: "Created" });
        } else if (xhttp.status == 403) {
          console.log("Failed to create");
          this.setState({ status: "Failed to create" });
        }
        this.setState({ showPop: true });
      }
    };
  };

  render() {
    if (this.state.showPop) {

        setTimeout(
            function() {
              this.setState({
                showPop: false
              });
            }.bind(this),
            3000
          );
      return (
      <div className="container">
          <h1>{this.state.status}</h1>
      </div>
      );
    }

    return (
      <div className="container">
        <div>
          <h2>Create new person</h2>

          <p>First Name</p>
          <input
            onChange={this.updateInput}
            value={this.state.first_name}
            type="text"
            placeholder="Write a first name"
            id="first_name"
          />

          <p>Last name</p>
          <input
            onChange={this.updateInput}
            value={this.state.last_name}
            type="text"
            placeholder="Write a last name"
            id="last_name"
          />

          <p>Date of birth</p>
          <input
            onChange={this.updateInput}
            value={this.state.date_of_birth}
            type="date"
            placeholder="Write a date of birth"
            id="date_of_birth"
          />

          <p>Address </p>
          <SearchField type={"address"} handleChange={this.updateSearchField} />
          <br />
          <button className="btn-dashboard-back" onClick={this.sendPerson}>
            Submit
          </button>
        </div>
        <br />
        <button className="btn-dashboard-back" onClick={this.props.close}>
          Back
        </button>
      </div>
    );
  }
}

export default PersonForm;
