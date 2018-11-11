import React from "react";
import Popupp from "../popupp";

class AssociationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      showPop: false,
      status: "Nothing"
    };
  }

  updateInput = event => {
    if (event.target.id == "name") {
      this.setState({ name: event.target.value });
    } else if (event.target.id == "description") {
      this.setState({ description: event.target.value });
    }
  };

  sendAssociation = () => {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", process.env.API_URL + "/api/association", true);
    xhttp.withCredentials = true;
      xhttp.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"));
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        name: this.state.name,
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
      return <Popupp text={this.state.status} />;
    }
    return (
      <div className="container">
      <div>
        <h2>Create new association</h2>

        <p>Name</p>
        <input
          onChange={this.updateInput}
          value={this.state.name}
          type="text"
          placeholder="Write a name"
          id="name"
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
        <button className="btn-dashboard-back" onClick={this.sendAssociation}>
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

export default AssociationForm;
