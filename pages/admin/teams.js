import React, {Component} from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import TeamsForm from "../../components/forms/teamsForm";
import AdminReturn from "../../components/buttons/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import Loading from "../../components/buttons/loading";
import NavbarUser from "../../components/NavbarUser";

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            ready: false,
            createTeam: false,
            currentPage: 0,
            content: ["Teams", "Managers"], // Attribute variable names
            contentFields: ["Name", "Manager", "Stadium", "Country"],
            canEdit: true // Names/Values of variables
        };

        this._createTeam = this._createTeam.bind(this);
        this.changePage = this.changePage.bind(this);
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.url.query.create == "true") {
            this.setState({createTeam: true});
        } else {
            this.setState({createTeam: false});
        }
    }

    changePage(command) {
        if (command === 0) {
            this.setState({currentPage: 0});
        }
        if (command === 1) {
            if (this.state.currentPage !== 0)
                this.setState(prevState => ({
                    currentPage: prevState.currentPage - 1
                }));
        }
        if (command === 2) {
            if (this.state.currentPage + 1 < this.state.teams.length / 10) {
                this.setState({currentPage: this.state.currentPage + 1});
            }
        }
        if (command === 3) {
            this.setState({
                currentPage: Math.floor((this.state.teams.length-1) / 10)
            });
        }
    }

    _createTeam() {
        this.setState({
            createTeam: !this.state.createTeam
        });

        console.log(this.state.createTeam + " ");
    }

    async componentDidMount() {
        if(this.props.url.query.create=="true"){
            this.setState({createTeam:true});
        }
        try {
            const response = await fetch(process.env.API_URL + "/api/team/all", {
                credentials: 'include', headers: {Authorization: "Bearer " + localStorage.getItem("token")}
            });
            const json = await response.json();
            console.log(json);
            this.setState({
                teams: json,
                ready: true
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        const teams = this.state.teams;
        if (this.state.createTeam === true) {
            return (
                <div>
                    <LayoutGlobal/>
                    <NavbarUser/>
                    <TeamsForm/>

                </div>
            );
        } else {
            return (
                <div>
                    <LayoutGlobal/>
                    <NavbarUser/>

                    <div className="container">


                        <ListInfo
                            data={teams}
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
    }
}

export default Teams;
