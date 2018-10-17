import React from 'react';
import {Router} from '../routes'


const Register = () => (

    
      <div className="form-div" id="myForm">
  <form className="form-container">
    <h1>Register</h1>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" className="email" required/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" className="psw" required/>

    <label for="psw-rep"><b>Repeat Password</b></label>
    <input type="password" placeholder="Repeat Password" className="psw-rep" required/>

    <button type="button" 
            className="btn"
            onClick={() => Router.pushRoute('/')}
            >Register</button>
  
    </form>

    </div>
    
);

export default Register;