import React, {Component} from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import ContactForm from "../../components/forms/contactForm";
import Loading from "../buttons/loading";
import { type } from "os";


class PersonInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "0",
      personInfo: [],
      ready: false,
      create: false,
      contactInfo: [],
      type:[],
      detail:[],
      failed: false,
      success: false
    };
    this._create = this._create.bind(this);

  }

  async componentWillMount() {
    try {
      const urls = [process.env.API_URL + "/api/person/" + this.props.id, process.env.API_URL + "/api/contact/byPersonId/" + this.props.id];
      console.log(urls);
      Promise.all(urls.map(url => fetch(url, {credentials: 'include',headers:{Authorization:"Bearer "+localStorage.getItem("token")}
    })))
      .then(resp => Promise.all( resp.map(r => r.json()) ))
      .then(result => {
        this.setState({
          personInfo: result[0],
          contactInfo: result[1],
          ready: true
        })
          console.log(result);
});
      /*const response = await fetch(
        process.env.API_URL + "/api/person/" + this.props.id, {
          credentials: 'include'
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      this.setState({
        personInfo: json,
        ready: true
      });*/
    } catch (error) {
      console.log(error);
   

    }
  }

  deletePlayer = () => {
    console.log(process.env.API_URL + "/api/person/" + this.props.id);
    let xhttp = new XMLHttpRequest();
    xhttp.open(
      "DELETE",
      process.env.API_URL + "/api/person/" + this.props.id +"/delete",
      true
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"));
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        console.log("DONE");
        console.log(xhttp.status)
        if (xhttp.status === 200) {
          this.setState({ success: true, failed: false });
          console.log("Yay");
        } else if (xhttp.status == 403) {
          this.setState({ failed: true, success: false });
          console.log("Damn");
        }
      }
    };
    xhttp.send(null);
  };

    _create() {
        this.setState({
            create: !this.state.create
        });

    }

    render() {

        

        if (this.state.ready === true) {

            console.log(this.props.watchListIds);

            const person = this.state.personInfo;
            let contact = this.state.contactInfo;
            let contactRows = [];
            if(contact.length>0){
                contact.forEach(element => {
                    contactRows.push(
                        <tr className="tr-admin-get-one">
                            <th className="th-admin-get-one"> {element[1]} </th>


                            <td className="td-admin-get-one">{element[2]}</td>
                        </tr>
                    );
                });

            }

            if (this.state.success) {
              loading = (
                  <Loading
                      text="Deleted"
                      icon={false}
                  />
              );
          } else if (this.state.failed) {
              loading = (
                  <Loading
                      text="Delete failed"
                      icon={false}
                  />
              );
          }
          
           console.log(this.state.type[1]);

          

            let name = person.firstName + " " + person.lastName;
            if (this.state.create === true) {
                return (
                    <div>
                        <LayoutGlobal/>
                        <ContactForm name={name} personId={person.personId}/>
                        <div className="btn-admin-create-bottom">
                            <button className="btn-dashboard-back" onClick={this._create}>
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
                                    <th colspan="2" className="th-admin-get-one"> Contact Information</th>
                                    
                                    
                                </tr>
                                {contactRows}

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
                                        onClick={this.deletePlayer}
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
