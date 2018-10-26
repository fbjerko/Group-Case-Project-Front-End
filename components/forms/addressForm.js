import React from "react";

class AddressForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
          address_line_1: '',
          address_line_2: '',
          address_line_3: '',
          postal_code: '',
          city: '',
          country: '',
          showPop:false,
          status:'Nothing'
        }
    }


    updateInput = (event)=>{
        if(event.target.id=='address_line_1'){
            this.setState({address_line_1:event.target.value});
        }else if(event.target.id=='address_line_2'){
            this.setState({address_line_2:event.target.value});
        }else if(event.target.id=='address_line_3'){
          this.setState({address_line_3:event.target.value});
        }else if(event.target.id=='postal_code'){
          this.setState({postal_code:event.target.value});
        }else if(event.target.id=='city'){
          this.setState({city:event.target.value});
        }else if(event.target.id=='country'){
          this.setState({country:event.target.value});
      }

      }

    sendAddress = ()=>{

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "http://localhost:5000/api/address", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
              address_line_1: this.state.address_line_1,
              address_line_2: this.state.address_line_2,
              address_line_3: this.state.address_line_3,
              postal_code: this.state.postal_code,
              city: this.state.city,
              country: this.state.country
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
      return(
        <div className="info-container">
      <div className="seasons-container">
      <div className="top">
        <h2>Create new address</h2>
      </div>
       <p>Address </p>
       <input onChange={this.updateInput} value={this.state.address_line_1} type="text" placeholder="Write an address" id="address_line_1" />
       <br></br>
       <br></br>
       <p>Address 2 (Optional)</p>
       <input onChange={this.updateInput} value={this.state.address_line_2} type="text" placeholder="Write an optional address" id="address_line_2" />
       <br></br>
       <br></br>
       <p>Address 3 (Optional)</p>
       <input onChange={this.updateInput} value={this.state.address_line_3} type="text" placeholder="Write an optional address" id="address_line_3" />
       <br></br>
       <br></br>
       <p>Postal Code</p>
       <input onChange={this.updateInput} value={this.state.postal_code} type="number" placeholder="Write a postal code" id="postal_code" />
       <br></br>
       <br></br>
       <p>City</p>
       <input onChange={this.updateInput} value={this.state.city} type="text" placeholder="Write a city" id="city" />
       <br></br>
       <br></br>
       <p>Country</p>
       <input onChange={this.updateInput} value={this.state.country} type="text" placeholder="Write a country" id="country" />
       <br></br>
       <br></br>
       <input className="btn-index" type="button" value="Submit" onClick={this.sendAddress} ></input>
      </div>
    </div>
      );

  }


}



export default AddressForm;