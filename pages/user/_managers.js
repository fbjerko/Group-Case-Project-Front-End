import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import UserReturn from "../../components/buttons/UserReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import Loading from "../../components/buttons/loading";

class Managers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      managers: [],
      filteredData: [],
      search: "a",
      ready: false,
      createManager: false,
      currentPage: 0,
      content: ["Managers", "Teams"], // Attribute variable names
      contentFields: ["Name", "Team"], // Names/Values of variables
      canEdit: false
    };

    this.changePage = this.changePage.bind(this);
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
      if (this.state.currentPage + 1 < this.state.managers.length / 10) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
    if (command === 3) {
      this.setState({
        currentPage: Math.floor(this.state.managers.length / 10)
      });
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(process.env.API_URL + "/api/coach/all");
      const json = await response.json();
      console.log(json);
      this.setState({
        managers: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.ready === true) {
      const managers = this.state.managers.slice(
        this.state.currentPage * 10,
        (this.state.currentPage + 1) * 10
      );
      if (this.state.createManager === true) {
        return (
          <div>
            <LayoutGlobal />

            <div className="container">
              <h1>Managers</h1>

              <div className="btn-admin-create-top">
                <button className="btn-create">Create</button>

                <button className="btn-create">Update</button>

                <button className="btn-create">Delete</button>
              </div>

              <div className="btn-admin-create-bottom">
                <button className="btn-create" onClick={this._createManager}>
                  Back
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <LayoutGlobal />

            <div className="container">
              <ListInfo
                data={managers}
                name={this.state.content[0]}
                content={this.state.content}
                contentFields={this.state.contentFields}
                ready={this.state.ready}
                changePage={this.changePage}
                canEdit={this.state.canEdit}
                currentPage={this.state.currentPage}
                close={this.props.close}
              />

              {this.state.createManager ? <CreateUser /> : null}
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <LayoutGlobal />
          <Loading icon={true} text={"Loading players..."} />
        </div>
      );
    }
  }
}

export default Managers;

/*


    let filteredData = (search) => {
      return this.state.managers[3].filter((el) => {
        el.toLowerCase().indexOf(search.toLowerCase()) > -1;
      })
    }


  
    console.log("Filtered data "  + filteredData('a'));

    */
