import React, { Component } from "react";
import i18n from "../../i18n";

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      search: "",
      data: [],
      filteredData: [],
      url: this.chooseUrl(this.props.type),
      active: false,
      id: this.props.id,
      lng: i18n.language
    };

    this.chooseUrl(this.props.type);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    i18n.on("languageChanged", this.onLanguageChanged);
  }
  onLanguageChanged = lng => {
    this.setState({ lng: lng });
  };

  getData() {
    fetch(this.state.url, {
      credentials: "include",headers:{Authorization:"Bearer "+localStorage.getItem("token")}
    }).then(res =>
      res.json().then(res => {
        if (res.length > 0) {
          let data = [];

          for (let dataElement of res) {
            data.push({
              id: dataElement[0],
              name: dataElement[1]
            });
          }
          console.log("Data loaded");
          this.setState({ data: data, filteredData: data });
          data.forEach(element => {
            if (this.state.id == element.id) {
              this.setState({ search: element.name, id: element.id });
            }
          });
        }
      })
    );
  }
  chooseUrl = type => {
    let url = "";
    switch (type) {
      case "address":
        url = process.env.API_URL + "/api/address/all";
        break;
      case "season":
        url = process.env.API_URL + "/api/season/all";
        break;
      case "location":
        url = process.env.API_URL + "/api/location/all";
        break;
      case "team":
        url = process.env.API_URL + "/api/team/all";
        break;
      case "player":
        url = process.env.API_URL + "/api/player/all";
        break;
      case "person":
        url = process.env.API_URL + "/api/person/all";
        break;
      case "association":
        url = process.env.API_URL + "/api/association/all";
        break;
      case "coach":
        url = process.env.API_URL + "/api/coach/all";
        break;
      case "owner":
        url = process.env.API_URL + "/api/owner/all";
        break;
      case "goalType":
        url = process.env.API_URL + "/api/matchGoal/goalType";
        break;
    }
    return url;
  };
  updateSearch = event => {
    this.setState({ search: event.target.value.substr(0, 20) });
    this.setState({ id: -1 });
  };
  componentWillMount() {
    this.getData();
  }

  handleClick = event => {
    this.setState({
      search: event.target.value,
      id: event.target.id,
      active: false
    });
    this.props.handleChange(event.target.id);
  };

  getId = () => {
    return this.state.id;
  };

  activate = () => {
    this.setState({ active: !this.state.active });
  };
  disable = () => {
    this.setState({ active: !this.state.active });
    this.props.handleChange(this.state.id);
  };

  styles = {
  
  };

  render() {
    let lng = this.state.lng;

    let filteredData = this.state.data.filter(element => {
      return (
        element.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    let searchResult = filteredData.map(element => {
      return (
        <option
          onDoubleClick={this.handleClick}
          key={element.id}
          id={element.id}
          value={element.name}
        >
          {element.name}
        </option>
      );
    });

    if (this.state.active) {
      return (
        <div>
          <input
            type="text"
            value={this.state.search}
            placeholder={"Search for " + this.state.type}
            onChange={this.updateSearch}
          />
          <br />
          <select
            
            onBlur={this.disable}
            size={filteredData.length > 10 ? 10 : filteredData.length + 1}
            
          >
            {searchResult}
          </select>
        </div>
      );
    } else {
      return (
        <div>
          <input
            onFocus={this.activate}
            value={this.state.search}
            placeholder={"Search for " + this.state.type}
            onChange={this.updateSearch}
          />
        </div>
      );
    }
  }
}

export default SearchField;
