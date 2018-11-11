import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import AdminReturn from "../../components/buttons/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import LocationsForm from "../../components/forms/locationsForm";
import Loading from "../../components/buttons/loading";
import NavbarUser from "../../components/NavbarUser";

class Stadiums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stadiums: [],
      ready: false,
      createStadium: false,
      currentPage: 0,
      content: ["Stadium", "Team", "Address"], // Attribute variable names
      contentFields: ["Name", "Team", "Address"], // Names/Values of variables
      canEdit: true // Names/Values of variables
    };


    this.changePage = this.changePage.bind(this);
  }

    componentWillReceiveProps(nextProps) {

        if (nextProps.url!=undefined && nextProps.url.query.create == "true") {
            this.setState({createStadium: true});
        } else {
            this.setState({createStadium: false});
        }
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
      if (this.state.currentPage + 1 < this.state.stadiums.length / 5) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
    if (command === 3) {
      this.setState({
        currentPage: Math.floor(this.state.stadiums.length / 5)
      });
    }
  }



  async componentDidMount() {
      if(this.props.url.query.create=="true"){
          this.setState({createStadium:true});
      }
    console.log("Hey");
    try {
      const response = await fetch(process.env.API_URL + "/api/location/all",{
          credentials: 'include',headers:{Authorization:"Bearer "+localStorage.getItem("token")}
      });
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
    if (this.state.ready === true) {
      const stadiums = this.state.stadiums.slice(
        this.state.currentPage * 5,
        (this.state.currentPage + 1) * 5
      );
      if (this.state.createStadium === true) {
        return (
          <div>
            <LayoutGlobal />
            <NavbarUser/>
            <LocationsForm />

          </div>
        );
      } else {
        return (
          <div>
            <LayoutGlobal />
              <NavbarUser/>
            <div className="container">


              <ListInfo
                data={stadiums}
                name={this.state.content[0]}
                content={this.state.content}
                contentFields={this.state.contentFields}
                ready={this.state.ready}
                changePage={this.changePage}
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
            <NavbarUser/>
          <Loading icon={true} text={"Loading..."} />
        </div>
      );
    }
  }
}

export default Stadiums;
