import React from "react";
import SearchField from "../admin-create/SearchField";
import Popupp from "../popupp";


class ManagerForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            personId:-1,
            showPop:false,
            status:'Nothing'
        }
    }

    updateSearchField = (id)=>{
        console.log(id);
        this.setState({personId:id});
    }



    sendManager = ()=>{

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST",  process.env.API_URL+"/api/coach", true);
        xhttp.withCredentials=true;
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
                personId:this.state.personId
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
                    <h2>Create new manager</h2>
                </div>
                <p>Person </p>
                <SearchField type={'person'} handleChange={this.updateSearchField}/>
                <br></br>
                <br></br>
                <input className="btn-index" type="button" value="Submit" onClick={this.sendManager}></input>
            </div>

        </div>
        );

    }


}

export default ManagerForm;