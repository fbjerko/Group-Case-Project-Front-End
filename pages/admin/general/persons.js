import React, { Component } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal";
import ContactForm from "../../../components/forms/contactForm";
import { Router } from "../../../routes";
import ListInfo from "../../../components/admin-view/ListInfo";
import Loading from "../../../components/buttons/loading";
import AdminReturn from "../../../components/buttons/AdminReturn";

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      filteredData: [],
      search: "a",
      ready: false,
      currentPage: 0,
      content: ["Persons"], // Attribute variable names
      contentFields: ["Name"], // Names/Values of variables
      create: false,
      canEdit: true
    };

    this._create = this._create.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  _create() {
    this.setState({
      create: !this.state.create
    });
    console.log(this.state.create);
  }

  changePage(command) {
    if (command === 0) {
      this.setState({ currentPage: 0 });
    }
    if (command === 1) {
      if (this.state.currentPage !== 0)
        this.setState(prevState => ({
          currentPage: prevState.currentPage - 1
        }));
    }
    if (command === 2) {
      if (this.state.currentPage + 1 < this.state.persons.length / 10) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
    if (command === 3) {
      this.setState({
        currentPage: Math.floor(this.state.persons.length / 10)
      });
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(process.env.API_URL + "/api/person/all");
      const json = await response.json();
      this.setState({
        persons: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.ready === true) {
      const persons = this.state.persons.slice(
        this.state.currentPage * 10,
        (this.state.currentPage + 1) * 10
      );
      if (this.state.create === true) {
        return (
          <div>
            <LayoutGlobal />
            <ContactForm />
            <div className="btn-admin-create-bottom">
              <button className="btn-create" onClick={this._create}>
                Back
              </button>
            </div>
          </div>
        );
      } else {
        //This return is going to display a list of addresses and a create address button
        return (
          <div>
            <LayoutGlobal path = {"General"} />

            <div className="container">
            <div className="btn-admin-config">
              <AdminReturn/>
            </div>
      
              <ListInfo
                data={persons}
                name={this.state.content[0]}
                content={this.state.content}
                contentFields={this.state.contentFields}
                ready={this.state.ready}
                changePage={this.changePage}
                canEdit={this.state.canEdit}
                currentPage={this.state.currentPage}
                close={this.props.close}
              />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <LayoutGlobal />
          <Loading icon={true} text={"Loading persons..."} />
        </div>
      );
    }
  }
}

export default Person;
