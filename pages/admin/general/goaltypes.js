import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import GoalsForm from "../../../components/forms/goalsForm";
import { Router } from "../../../routes";




class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createGoal: false
    };

    this._createGoal = this._createGoal.bind(this);
}

_createGoal() {
  this.setState({
    createGoal: !this.state.createGoal
  });

} 

  render() {

    if(this.state.createGoal === true){

        return (
            <div>
              <LayoutGlobal />
              <GoalsForm />
              <div className = "btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createGoal}>
              Back
            </button>
              </div>
            </div>
          );

    } else {
        //This return is going to display a list of addresses and a create address button
    return (
        <div>
          <LayoutGlobal />
       
          <div className="container">
            <h1>Goal Types</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createGoal}>
                Create Goal Type
              </button>
            </div>
            <div >

        <button
        type="button"
        className="btn-ret-admin"
        onClick={() => Router.pushRoute("/admin/general")}
        >
        Return to General
        </button>
        </div>
          </div>
          
        </div>
      );
    }  
  }
}

export default Goals;