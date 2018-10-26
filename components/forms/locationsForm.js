import React from "react";
import SearchField from "../admin-create/SearchField";
import Popupp from "../popupp";


class LocationsForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            description:'',
            addressId:-1,
            showPop:false,
            status:'Nothing'
        }
    }

    updateSearchField = (id)=>{
        console.log(id);
        this.setState({addressId:id});
    }


    updateInput = (event)=>{
        if(event.target.id=='name'){
            this.setState({name:event.target.value});
        }else if(event.target.id=='description'){
            this.setState({description:event.target.value});
        }

    }

    sendLocation = ()=>{

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "http://localhost:5000/api/location", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
                name:this.state.name,
                description:this.state.description,
                addressId:this.state.addressId
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
                    <h2>Create new location</h2>
                </div>
                <p>Address </p>
                <SearchField type={'address'} handleChange={this.updateSearchField}/>
                <br></br>
                <br></br>
                <p>Name</p>
                <input onChange={this.updateInput} value={this.state.name} type="text" placeholder="Write a name" id="name" />
                <br></br>
                <br></br>
                <p>Description</p>
                <input onChange={this.updateInput} value={this.state.description} type="text" placeholder="Write a description" id="description" />
                <br></br>
                <br></br>
                <input className="btn-index" type="button" value="Submit" onClick={this.sendLocation}></input>
            </div>

        </div>
        );

    }


}



export default LocationsForm;