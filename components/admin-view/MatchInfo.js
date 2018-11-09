import React, {Component} from "react";

class MatchInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            matchId: "0",
            matchInfo: [],
            ready: false
        };
    }

    async componentWillMount() {

        try {
            const response = await fetch(
                process.env.API_URL + "/api/footballMatch/" + this.props.id, {
                    credentials: 'include'
                }
            );
            const json = await response.json();
            console.log(json);
            this.setState({
                matchInfo: json,
                ready: false
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let buttons; // Decides if we can edit or not
        if (this.props.canEdit === true) {
            buttons = (
                <table className="table-admin-but">
                    <tbody>
                    <tr>
                        <td className="td-admin-but" onClick={this.props.firstPage}>
                            EDIT
                        </td>
                        <td className="td-admin-but" onClick={this.props.previousPage}>
                            DELETE
                        </td>
                    </tr>
                    </tbody>
                </table>
            );
        } else {
            buttons = (<br></br>

            );
        }

        /* <table className="table-admin-get-one">
                   <tbody>
                     <tr className="tr-admin-get-one">
                       <th className="th-admin-get-one"> match ID</th>
                       <td className="td-admin-get-one">{match.coachId}</td>
                     </tr>
                     <tr className="tr-admin-get-one">
                       <th className="th-admin-get-one"> Name</th>
                       <td className="td-admin-get-one">
                         {match.person.firstName} {match.person.lastName}
                       </td>
                     </tr>

                     <tr className="tr-admin-get-one">
                       <th className="th-admin-get-one"> Date Of Birth</th>
                       <td className="td-admin-get-one">
                         {match.person.dateOfBirth}
                       </td>
                     </tr>
                     <tr className="tr-admin-get-one">
                       <th className="th-admin-get-one"> Address</th>
                       <td className="td-admin-get-one">
                         {match.person.address.addressLine1}{" "}
                         {match.person.address.addressLine2}{" "}
                         {match.person.address.addressLine3},{" "}
                         {match.person.address.postalCode},{" "}
                         {match.person.address.city},{" "}
                         {match.person.address.country}
                       </td>
                     </tr>
                   </tbody>
                 </table>*/

        if (this.state.ready === true) {
            const match = this.state.matchInfo;
            return (
                <div>
                    <div className="div-admin-get-all">
                        <h1>
                            {match.homeTeam.name} vs {match.awayTeam.name}
                        </h1>

                        {buttons}
                        <button
                            className="btn-admin-player"
                            onClick={() => this.props.close("")}
                        >
                            Back
                        </button>
                    </div>
                </div>
            );
        } else {
            return <div>Loading

                <div>
                    <div className="div-admin-get-all">
                        <h1>
                            Team vs Team
                        </h1>

                        <table className="table-admin-get-one-match-header">
                            <tbody>
                            <tr className="tr-admin-get-one">

                                <th className="th-admin-get-one-match"> Date</th>
                                <th className="th-admin-get-one-match-small"> Result</th>
                                <th className="th-admin-get-one-match"> League</th>

                            </tr>
                            <tr className="tr-admin-get-one">
                                <td className="td-admin-get-one-match">asd</td>
                                <td className="td-admin-get-one-match-small">asd</td>
                                <td className="td-admin-get-one-match">asd</td>
                            </tr>

                            </tbody>
                        </table>
                        <table className="table-admin-get-one-match">
                            <tbody>
                            <tr className="tr-admin-get-one">
                                <th className="td-admin-get-one-match-small">Home Team</th>
                                <th className="th-admin-get-one-match-small"> Team</th>
                                <th className="td-admin-get-one-match-small">Away Team</th>
                            </tr>
                            <tr className="tr-admin-get-one">
                                <td className="td-admin-get-one-match-small">1</td>
                                <th className="th-admin-get-one-match-small"> Goals</th>
                                <td className="td-admin-get-one-match-small">3</td>
                            </tr>
                            <tr className="tr-admin-get-one">
                                <td className="td-admin-get-one-match-small">asd</td>
                                <th className="th-admin-get-one-match-small"> match ID</th>
                                <td className="td-admin-get-one-match-small">asd</td>
                            </tr>
                            <tr className="tr-admin-get-one">
                                <td className="td-admin-get-one-match-small">asd</td>
                                <th className="th-admin-get-one-match-small"> match ID</th>
                                <td className="td-admin-get-one-match-small">asd</td>
                            </tr>
                            </tbody>
                        </table>
                        {buttons}
                        <button
                            className="btn-dashboard-back"
                            onClick={() => this.props.close("")}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>;
        }
    }
}

export default MatchInfo;
