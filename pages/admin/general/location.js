import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import { Router } from "../../../routes";


class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false
    };

    this._onEditClick = this._onEditClick.bind(this);
}

  

  _onEditClick() {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  }
  
  

  _getSeasons(){
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:5000/api/location", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        address: document.getElementById("address").value
      }));
  
  
    }
  

  render() {

    return (
      <div>
        <LayoutGlobal />
           <div className="info-container">

               <div className="seasons-container">
               <div className="top">
                 <h2>Create new location</h2>
               </div>
                <p>Season Name </p>
                <input type="text" placeholder="Enter a name" id="name"/>
                <br></br>
                <br></br>
                <p>Description </p>
                <input type="text" placeholder="Write a description" id="description" />
                <br></br>
                <br></br>
                <p>Address </p>
                <input type="text" placeholder="Write an address" id="address" />
                <br></br>
                <br></br>
                <input className="btn-index" type="button" value="Submit"></input>
               </div>

             </div>
        <div className="btn-index">
    <button type="button"
    onClick={() => Router.pushRoute("/admin/stadiums")}
    > Back
    </button>
      </div>
      </div>
    );
  }
}

export default Locations;