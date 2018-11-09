import React, {Component} from "react";

class WatchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            watchList: [],
            display: 99,
            ready: false,
            needUpdate:false
        };

        this.deleteWatchList = this.deleteWatchList.bind(this);
    }

    getCookie() {
        var name = "id" + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    deleteWatchList(id) {
        this.setState({needUpdate:true});
        var xhttp = new XMLHttpRequest();

        xhttp.open(
            "GET",
            process.env.API_URL + "/api/favouriteList/" + id + "/clear",
            true
        );
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.withCredentials=true;
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == XMLHttpRequest.DONE) {
                if (xhttp.status === 200 || xhttp.status === 201) {
                    console.log("Deleted");
                    this.fetchWatchList();

                } else if (xhttp.status !== 200) {
                    console.log("Failed to add to watchlist");
                    this.fetchWatchList();

                }
            }
        };
    }

    fetchWatchList = () => {

        if (this.props.watchList === undefined || this.state.needUpdate) {


            try {
                fetch(
                    process.env.API_URL + "/api/favouriteList/" + this.state.userId + "/byUserId",{
                        credentials: 'include'
                    }
                ).then((response)=>response.json()).then((json) => {

                        this.setState({
                            watchList: json,
                            ready: true
                        })
                    }
                );



            } catch (error) {
                console.log(error);
            }
        } else {
            this.setState({
                watchList: this.props.watchList,
                ready: true
            });
        }
    }

    async componentDidMount() {
        await this.setState({
            userId: this.getCookie()
        });

        this.fetchWatchList();
    }

    render() {

        if (this.state.ready === true) {

            let players = [];

            for (var i = 0; i < this.state.watchList[0][1].length; i++) {
                let playerId = this.state.watchList[0][1][i];


                players.push(
                    <tr key={i + i * 100}>
                        <td
                            key={this.state.watchList[0][1][i] + "p" + i}
                            className="td-dashboard-watchlist-user"
                            onClick={() => this.props.showWatchlist(playerId, 1)}
                        >
                            {this.state.watchList[0][2][i]}
                        </td>
                    </tr>
                );
            }

            let teams = [];

            for (var i = 0; i < this.state.watchList[0][3].length; i++) {
                let teamId = this.state.watchList[0][3][i];
                teams.push(
                    <tr key={i + i * 10}>
                        <td
                            key={this.state.watchList[0][3][i]}
                            className="td-dashboard-watchlist-user"
                            onClick={() => this.props.showWatchlist(teamId, 2)}
                        >
                            {this.state.watchList[0][4][i]}
                        </td>
                    </tr>
                );
            }

            return (
                <div className="dashboard-watchlist-container">
                    <table className="dashboard-watchlist-user">
                        <tbody>
                        <tr>
                            <th key={0} className="th-dashboard-watchlist-user">
                                Watchlist
                            </th>
                        </tr>
                        <tr>
                            <th key={1} className="th-dashboard-watchlist-user">
                                Players
                            </th>
                        </tr>
                        {players}

                        <tr>
                            <th key={2} className="th-dashboard-watchlist-user">
                                Teams
                            </th>
                        </tr>
                        {teams}

                        <tr>
                            <td
                                key={"Delete"}
                                className="td-admin-but"
                                onClick={() => this.deleteWatchList(this.state.userId)}
                            >
                                Clear Watchlist
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return <div/>;
        }
    }
}

export default WatchList;
