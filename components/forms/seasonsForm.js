import React from "react";
import Popupp from "../popupp";

class SeasonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      start_date: "",
      end_date: "",
      description: "",
      showPop: false,
      status: "Nothing"
    };
  }

  updateInput = event => {
    if (event.target.id == "name") {
      this.setState({ name: event.target.value });
    } else if (event.target.id == "start_date") {
      console.log(event.target.value);
      this.setState({ start_date: event.target.value });
    } else if (event.target.id == "end_date") {
      this.setState({ end_date: event.target.value });
    } else if (event.target.id == "description") {
      this.setState({ description: event.target.value });
    }
  };

  sendSeason = () => {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", process.env.API_URL + "/api/season", true);
    xhttp.withCredentials = true;
      xhttp.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"));
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        name: this.state.name,
        startDate: this.state.start_date,
        endDate: this.state.end_date,
        description: this.state.description
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
        <h2>Create new season</h2>

        <p>Season Name</p>
        <input
          onChange={this.updateInput}
          value={this.state.name}
          type="text"
          placeholder="Write a name"
          id="name"
        />

        <p>Start Date</p>
        <input
          onChange={this.updateInput}
          type="date"
          placeholder="Choose a date"
          id="start_date"
        />

        <p>End Date</p>
        <input
          onChange={this.updateInput}
          type="date"
          placeholder="Choose a date"
          id="end_date"
        />

        <p>Description</p>
        <input
          onChange={this.updateInput}
          value={this.state.description}
          type="text"
          placeholder="Write a description"
          id="description"
        />
        <br />

        <br />
        <button className="btn-dashboard-back" onClick={this.sendSeason}>
          Submit
        </button>
        <br />
        <button className="btn-dashboard-back" onClick={this.props.close}>
          Back
        </button>
      </div>
    );
  }
}

export default SeasonForm;
