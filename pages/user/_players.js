import React, {Component} from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import ListInfo from "../../components/admin-view/ListInfo";
import PlayerInfo from "../../components/admin-view/PlayerInfo";
import TeamInfo from "../../components/admin-view/TeamInfo";
import WatchList from "./WatchList";
import Loading from "../../components/buttons/loading";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      ready: false,
      createPlayer: false,
      currentPage: 0,
      content: ["Players", "Teams"], // Attribute variable names
      contentFields: ["Name", "Team"], // Names/Values of variables
      canEdit: false,
      userId: "",
      activeId: 0,
      display: 99
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
      if (this.state.currentPage + 1 < this.state.players.length / 10) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
    if (command === 3) {
      this.setState({
        currentPage: Math.floor(this.state.players.length / 10)
      });
    }
  }



  async componentDidMount() {
    try {
      const response = await fetch(process.env.API_URL + "/api/player/all",{
          credentials: 'include'
      });
      const json = await response.json();
      console.log(json);
      this.setState({
        players: json,
        ready: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.ready === true) {
      const players = this.state.players.slice(
        this.state.currentPage * 10,
        (this.state.currentPage + 1) * 10
      );
      if (this.state.display === 1) {
        return (
          <div>
            <LayoutGlobal />

            <div className="container">
              <PlayerInfo
                id={this.state.activeId}
                close={this.close}
                canEdit={false}
                userId={this.props.userId}
                updateWatchList={this.updateWatchlist}
              />
            </div>
          </div>
        );
      } else if (this.state.display === 2) {
        return (
          <div>
            <LayoutGlobal />

            <div className="container">
              <TeamInfo
                id={this.state.activeId}
                close={this.close}
                canEdit={false}
                userId={this.props.userId}
              />
            </div>
          </div>
        );
      }
      if (this.state.createPlayer === true) {
        return (
          <div>
            <LayoutGlobal />

            <div className="container">
              <h1>Players</h1>

              <div className="btn-admin-create-top">
                <button className="btn-create">Create</button>

                <button className="btn-create">Update</button>

                <button className="btn-create">Delete</button>
              </div>

              <div className="btn-admin-create-bottom">
                <button className="btn-create" onClick={this._createPlayer}>
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
              <WatchList
                showWatchlist={this.showWatchlist}
                close={this.close}
              />

              <ListInfo
                data={players}
                name={this.state.content[0]}
                content={this.state.content}
                contentFields={this.state.contentFields}
                ready={this.state.ready}
                changePage={this.changePage}
                canEdit={this.state.canEdit}
                userId={this.props.userId}
                currentPage={this.state.currentPage}
              />

              {this.state.createPlayer ? <CreateUser /> : null}
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

export default Players;
