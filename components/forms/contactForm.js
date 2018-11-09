import React from "react";
import Popupp from "../popupp";
import SearchField from "../admin-create/SearchField";

class ContactForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            personId:-1,
            contact_detail:'',
            showPop:false,
            status:'Nothing' ,
            name: '',
            detailName: ''
          }
    }

  updateInput = (event)=>{
    if(event.target.id=='contact_detail'){
        this.setState({contact_detail:event.target.value});
      }

  }


  updateText = (event)=>{
        this.setState({detailName:event.target.value});
        console.log(this.props.personId);
      

  }

    sendContact = ()=>{

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST",  process.env.API_URL+"/api/contact", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
              personId: this.props.personId,
              contactType: this.state.detailName,
              contactDetail: this.state.contact_detail
            })
        );
        xhttp.onreadystatechange = ()=>{
          if (xhttp.readyState == XMLHttpRequest.DONE) {
            if(xhttp.status==201){
                console.log("Created");
                this.setState({status:"Created"});

            }else if (xhttp.status==403){
                console.log("Failed to create")
                this.setState({status:"Failed to create"});
            }
            this.setState({showPop:true});

        }
        }
    }



    render(){
      if(this.state.showPop){
        return(<Popupp text={this.state.status}/>);
    }

    if(this.state.detailName != ''){
        return(<div className="info-container">

            <div className="seasons-container">
                <div className="top">
                    <h2>Create new contact for {this.props.name}</h2>
                </div>
                <br></br>
                <p>Contact type</p>
                <select>
                    <option value="Email" onClick={this.updateText}>Email</option>
                    <option value="Phone" onClick={this.updateText}>Phone</option>
                </select>
                <br></br>
                <br></br>
                <p>{this.state.detailName} </p>
                <input onChange={this.updateInput} value={this.state.contact_detail} type="text" placeholder="Write contact detail" id="contact_detail" />
                <br></br>
                <br></br>
                <input className="btn-index" type="button" value="Submit" onClick={this.sendContact}></input>
            </div>

        </div>
        );

    } else{
        return(<div className="info-container">

        <div className="seasons-container">
            <div className="top">
                <h2>Create new contact for {this.props.name}</h2>
            </div>
            <br></br>
            <p>Contact type</p>
            <select>
                <option value="Email" onClick={this.updateText}>Email</option>
                <option value="Phone" onClick={this.updateText}>Phone</option>
            </select>
        </div>

    </div>
    );


    }

    }


}



export default ContactForm;