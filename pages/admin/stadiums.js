import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import AdminReturn from "../../components/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import LocationsForm from "../../components/forms/locationsForm";

class Stadiums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stadiums: [],
      ready: false,
      createStadium: false,
      currentPage: 0,
      content: ['Stadium', 'Teams'], // Attribute variable names
      contentFields: ['Name', 'Team'] // Names/Values of variables
    };

    this._createStadium = this._createStadium.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  firstPage() { 
    this.setState({currentPage: 0})
  }
  lastPage() { 
    this.setState({currentPage: Math.floor(this.state.players.length/10 )});
    console.log(this.state.currentPage);
  }

  previousPage() {
    if (this.state.currentPage !== 0)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    console.log(this.state.currentPage);
  }

  nextPage() {
    console.log(this.state.players.length);
    console.log(this.state.players.length / 10);
    if (this.state.currentPage + 1 < this.state.players.length / 10) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
    console.log(this.state.currentPage);
  }

  _createStadium() {
    this.setState({
      createStadium: !this.state.createStadium
    });
    
  }

  async componentDidMount() {
    console.log("Hey");
    try {
      const response = await fetch(process.env.API_URL+'/api/location/all');
      const json = await response.json();
  
      this.setState({
        stadiums: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const stadiums = this.state.stadiums.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    if (this.state.createStadium === true) {
      return (
        <div>
              <LayoutGlobal />
              <LocationsForm />
              <div className = "btn-admin-create-bottom">
              <button className="btn-create" onClick={this._createStadium}>
              Back
            </button>
              </div>
            </div>
      );
    } else {
      return (
        <div>
        <LayoutGlobal />

        <div className="container">
          <div className="btn-admin-config">
            <button className="btn-create" onClick={this._createStadium}>
              Create location
            </button>
            <AdminReturn />
          </div>
          
          <ListInfo
              data={stadiums}
              content= {this.state.content}
              contentFields = {this.state.contentFields}
              ready={this.state.ready}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              firstPage= {this.firstPage}
              lastPage={this.lastPage}
            />
    
          <h2>Page {this.state.currentPage + 1}</h2>
          {this.state.createPlayer ? <CreateUser /> : null}
        </div>
      </div>
      );
    }
  }
}

export default Stadiums;
