import React, {Component} from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import ManagerForm from "../../components/forms/managerForm";
import AdminReturn from "../../components/buttons/AdminReturn";
import ListInfo from "../../components/admin-view/ListInfo";
import Loading from "../../components/buttons/loading";
import NavbarUser from "../../components/NavbarUser";

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
            contentFields: ["Name", "Team"],
            canEdit: true // Names/Values of variables
        };


        this.changePage = this.changePage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.url.query.create == "true") {
            this.setState({createManager: true});
        } else {
            this.setState({createManager: false});
        }
    }

    changePage(command) {
        console.log("CHANGEPAGE" + command);
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
            if (this.state.currentPage + 1 < this.state.managers.length / 10) {
                this.setState({currentPage: this.state.currentPage + 1});
            }
        }
        if (command === 3) {
            this.setState({
                currentPage: Math.floor(this.state.managers.length / 10)
            });
        }
    }


    async componentDidMount() {
        if(this.props.url.query.create=="true"){
            this.setState({createManager:true});
        }
        try {
            const response = await fetch(process.env.API_URL + "/api/coach/all", {
                credentials: 'include', headers: {Authorization: "Bearer " + localStorage.getItem("token")}
            });
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
                        <LayoutGlobal/>
                        <NavbarUser/>
                        <ManagerForm/>

                    </div>

                );
            } else {
                return (
                    <div>
                        <LayoutGlobal/>
                        <NavbarUser/>

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


                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <LayoutGlobal/>
                    <NavbarUser/>
                    <Loading icon={true} text={"Loading ..."}/>
                </div>
            );
        }
    }
}

export default Managers;
