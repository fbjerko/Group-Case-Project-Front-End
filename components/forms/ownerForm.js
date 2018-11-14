import React from "react";
import SearchField from "../admin-create/SearchField";
import Popupp from "../popupp";

class OwnerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: -1,
      showPop: false,
      status: "Nothing"
    };
  }

  updateSearchField = id => {
    console.log(id);
    this.setState({ personId: id });
  };

  sendManager = () => {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", process.env.API_URL + "/api/owner", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"));
    xhttp.send(
      JSON.stringify({
        personId: this.state.personId
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
          <h2>Create new owner</h2>

          <p>Person </p>
          <SearchField type={"person"} handleChange={this.updateSearchField} />
          <br />
          <button className="btn-dashboard-back" onClick={this.sendManager}>
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

export default OwnerForm;
