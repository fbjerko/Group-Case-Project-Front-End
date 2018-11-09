import React from "react";
import Popupp from "../popupp";
import SearchField from "../admin-create/SearchField";

class ContactForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            person_id:-1,
            contact_type:-1,
            contact_detail:'',
            showPop:false,
            status:'Nothing'       
          }
    }

    updateSearchFieldPerson = (id)=>{
      console.log(id);
      this.setState({person_id:id});
  }
    updateSearchFieldContactType = (id)=>{
      console.log(id);
      this.setState({contact_type:id});
  }


  updateInput = (event)=>{
    if(event.target.id=='contact_detail'){
        this.setState({contact_detail:event.target.value});
      }

  }

    sendContact = ()=>{

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST",  process.env.API_URL+"/api/contact", true);
        xhttp.withCredentials=true;
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
              personId: this.state.person_id,
              contactType: this.state.contact_type,
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
        return(<div className="info-container">

            <div className="seasons-container">
                <div className="top">
                    <h2>Create new contact</h2>
                </div>
                <p>Person</p>
                <SearchField type={'person'} handleChange={this.updateSearchFieldPerson}/>
                <br></br>
                <br></br>
                <p>Contact type</p>
                <SearchField type={'contact'} handleChange={this.updateSearchFieldContactType}/>
                <br></br>
                <br></br>
                <p>Contact detail</p>
                <input onChange={this.updateInput} value={this.state.contact_detail} type="text" placeholder="Write contact detail" id="contact_detail" />
                <br></br>
                <br></br>
                <input className="btn-index" type="button" value="Submit" onClick={this.sendContact}></input>
            </div>

        </div>
        );

    }


}



export default ContactForm;