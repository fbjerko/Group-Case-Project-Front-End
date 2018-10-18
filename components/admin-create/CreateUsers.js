import React from 'react';
import {Router} from '../../routes'


function postPlayer () {

    console.log(document.getElementById("firstName").value);

    fetch('http://experisfotballmanager-env.qedd2mt7g3.eu-west-2.elasticbeanstalk.com/api/person', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    dateOfBirth: document.getElementById("dateOfBirth").value,
  })
});
}


const CreateUser = () => (

    
      <div className="form-div" id="myForm">
  <form className="form-container">
    <h2>Register</h2>

    <b>First Name</b>
    <input type="text" placeholder="First Name" id="firstName" className="firstName" required/>

    <b>Last Name</b>
    <input type="text" placeholder="Last Name" id="lastName" className="firstName" required/>

    <b>Date of Birth</b>
    <input type="text" placeholder="Date of Birth" id="dateOfBirth" className="dateOfBirth" required/>

    <button type="button" 
            className="btn"
            onClick={postPlayer}
            >Create</button>
  
    </form>

    </div>
    
);

export default CreateUser;