import React, {Component} from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import ContactForm from "../../components/forms/contactForm";


class PersonInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "0",
            personInfo: [],
            ready: false,
            create: false,
            contactInfo: []
        };
        this._create = this._create.bind(this);

    }

    async componentWillMount() {
        try {

            fetch(process.env.API_URL + "/api/person/" + this.props.id, {credentials: 'include'})
                .then(resp => resp.json()).then((resp => {
                this.setState({
                    personInfo: resp,
                    ready: true
                })
            }));
            this.fetchcontact();

        } catch (error) {
            console.log(error);
        }

    }

    fetchcontact() {
        const response = fetch(
            process.env.API_URL + "/api/contact/byPersonId/" + this.props.id, {
                credentials: 'include'
            }
        );

        const json = response.json();

        this.setState({
            contactInfo: json,
            ready: true
        });

    }

    _create() {
        this.setState({
            create: !this.state.create
        });

    }

    render() {

        if (this.state.ready === true) {
            console.log("peronsifno");
            console.log(this.state.personInfo.personId);
            const person = this.state.personInfo;
            const contact = this.state.contactInfo;


            let name = person.firstName + " " + person.lastName;
            if (this.state.create === true) {
                return (
                    <div>
                        <LayoutGlobal/>
                        <ContactForm name={name} personId={person.personId}/>
                        <div className="btn-admin-create-bottom">
                            <button className="btn-create" onClick={this._create}>
                                Back
                            </button>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="btn-admin-config-create">
                            <button className="btn-create" onClick={this._create}>
                                Create contact
                            </button>
                        </div>
                        <div className="div-admin-get-all">
                            <h1>{name}</h1>
                            <table className="table-admin-get-one">
                                <tbody>
                                <tr className="tr-admin-get-one">
                                    <th className="th-admin-get-one"> Person ID</th>
                                    <td className="td-admin-get-one">{person.personId}</td>
                                </tr>
                                <tr className="tr-admin-get-one">
                                    <th className="th-admin-get-one"> lastName</th>
                                    <td className="td-admin-get-one">{name}</td>
                                </tr>
                                <tr className="tr-admin-get-one">
                                    <th className="th-admin-get-one"> Date of Birth</th>
                                    <td className="td-admin-get-one">{person.dateOfBirth}</td>
                                </tr>
                                <tr className="tr-admin-get-one">
                                    <th className="th-admin-get-one"> Address</th>
                                    <td className="td-admin-get-one">
                                        {person.address.addressLine1}{" "}
                                        {person.address.addressLine2} {person.address.addressLine3},{" "}
                                        {person.address.postalCode}, {person.address.city},{" "}
                                        {person.address.country}
                                    </td>
                                </tr>
                                <tr className="tr-admin-get-one">
                                    <th className="th-admin-get-one"> Contact information</th>
                                    <td className="td-admin-get-one">{}</td>
                                </tr>

                                </tbody>
                            </table>
                            <table className="table-admin-but">
                                <tbody>
                                <tr>
                                    <td className="td-admin-but" onClick={this.props.firstPage}>
                                        EDIT
                                    </td>
                                    <td
                                        className="td-admin-but"
                                        onClick={this.props.previousPage}
                                    >
                                        DELETE
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button onClick={this.props.close}>Back</button>
                    </div>
                );
            }
        } else {
            return <div>Loading</div>;
        }
    }
}

export default PersonInfo;
