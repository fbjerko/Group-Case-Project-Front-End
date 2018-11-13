import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import GoalsForm from "../../../components/forms/goalsForm";
import { Router } from "../../../routes";
import NavbarUser from "../../../components/NavbarUser";

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createGoal: false
    };

    this._createGoal = this._createGoal.bind(this);
  }

    componentWillReceiveProps(nextProps) {

        if (nextProps.url!=undefined &&nextProps.url.query.create == "true") {
            this.setState({createGoal: true});
        } else {
            this.setState({createGoal: false});
        }
    }

  _createGoal() {
    this.setState({
      createGoal: !this.state.createGoal
    });
  }
    componentWillMount(){
        if(this.props.url.query.create=="true"){
            this.setState({createGoal:true});
        }
    }

  render() {
    if (this.state.createGoal === true) {
      return (
        <div>
          <LayoutGlobal />
            <NavbarUser/>
          <GoalsForm />

        </div>
      );
    } else {
      //This return is going to display a list of addresses and a create address button
      return (
        <div>
          <LayoutGlobal />
            <NavbarUser/>

          <div className="container">
            <h1>Goal Types</h1>

            <div className="btn-admin-create-top">
              <button className="btn-create" onClick={this._createGoal}>
                Create Goal Type
              </button>
            </div>

          </div>
        </div>
      );
    }
  }
}

export default Goals;
