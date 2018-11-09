import React, {Component} from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import AdminReturn from "../../components/buttons/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import PlayersForm from "../../components/forms/playersForm";
import CreateUser from "../../components/admin-create/CreateUsers";
import Loading from "../../components/buttons/loading";
import i18n from "../../i18n"

class Players extends Component {
    constructor(props) {
        const lng = i18n.language;
        super(props);
        this.state = {
            players: [],
            ready: false,
            createPlayer: false,
            editPlayer: false,
            currentPage: 0,
            content: [i18n.t("PLAYERS", lng), i18n.t("TEAMS", lng)], // Attribute variable names
            contentFields: [i18n.t("NAME", lng), i18n.t("TEAM", lng)],
            canEdit: true, // Names/Values of variables,
            playerId: -1,
            lng: lng
        };


        this._createPlayer = this._createPlayer.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
    }


    onLanguageChanged = (lng) => {
        this.setState({lng: lng});
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

  _createPlayer() {
    this.setState({
      createPlayer: !this.state.createPlayer
    });

    console.log(this.state.createPlayer + " ");
  }

  edit = playerId => {
    console.log(playerId);
    this.setState({
      updatePlayer: !this.state.updatePlayer,
      playerId: playerId
    });
  };

  async componentDidMount() {
    i18n.on('languageChanged', this.onLanguageChanged)
    try {
        fetch(process.env.API_URL + "/api/player/all").then(
            (response) => response.json()
        ).then((json) => {
            this.setState({
                players: json,
                ready: true
            })
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

      if (this.state.createPlayer === true) {
        return (
          <div>
            <LayoutGlobal />
            <PlayersForm edit={"create"} />
          </div>
        );
      } else if (this.state.updatePlayer === true) {
        return (
          <div>
            <LayoutGlobal />
            <PlayersForm edit={"edit"} id={this.state.playerId} />
          </div>
        );
      } else if (this.state.createPlayer === false) {
        return (
          <div>
            <LayoutGlobal />

            <div className="container">
            
            <div className="btn-admin-config">
                <button className="btn-create" onClick={this._createPlayer}>
                  Create Player
                </button>
                
              </div>
               

              <ListInfo
                data={players}
                name={this.state.content[0]}
                content={this.state.content}
                contentFields={this.state.contentFields}
                ready={this.state.ready}
                changePage={this.changePage}
                canEdit={this.state.canEdit}
                currentPage={this.state.currentPage}
                edit={this.edit}
                close={this.props.close}
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
