import React, {Component} from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import UserReturn from "../../components/buttons/UserReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import PlayerInfo from "../../components/admin-view/PlayerInfo";
import TeamInfo from "../../components/admin-view/TeamInfo";
import WatchList from "./WatchList"

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
            userId: this.props.userId,
            activeId: 0,
            display: 99,
        };


        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);

    }

    firstPage() {
        this.setState({currentPage: 0});
    }

    lastPage() {
        this.setState({currentPage: Math.floor(this.state.players.length / 10)});

    }

    previousPage() {
        if (this.state.currentPage !== 0)
            this.setState(prevState => ({currentPage: prevState.currentPage - 1}));

    }

    nextPage() {


        if (this.state.currentPage + 1 < this.state.players.length / 10) {
            this.setState({currentPage: this.state.currentPage + 1});
        }

    }


    async componentDidMount() {


        try {
            const response = await fetch(process.env.API_URL + "/api/player/all");
            const json = await response.json();

            this.setState({
                players: json,
                ready: true
            });
        } catch (error) {

        }
    }


    render() {
        console.log(this.state.content);
        const players = this.state.players.slice(
            this.state.currentPage * 10,
            (this.state.currentPage + 1) * 10
        );

        return (
            <div>
                <LayoutGlobal/>

                <div className="container">
                    <WatchList showWatchlist={this.showWatchlist} close={this.close}/>


                    <ListInfo
                        data={players}
                        name={this.state.content[0]}
                        content={this.state.content}
                        contentFields={this.state.contentFields}
                        ready={this.state.ready}
                        nextPage={this.nextPage}
                        previousPage={this.previousPage}
                        firstPage={this.firstPage}
                        lastPage={this.lastPage}
                        canEdit={this.state.canEdit}
                        userId={this.state.userId}
                        currentPage={this.state.currentPage}
                    />

                    {this.state.createPlayer ? <CreateUser/> : null}
                </div>
            </div>
        );

    }
}

export default Players;
