import {TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Logo from '../Logo';

function SignUp() {
    const [selected, setSelected] = useState('');

    const selectionChangeHandler = (event) => {
      setSelected(event.target.value);
    };
   
    function employee() {
      return (
        <div>
          <RadioGroup className="d-flex justify-content-center mt-3" row aria-label="employeekind" defaultValue="customer" name="row-radio-buttons-group"> 
            <FormControlLabel value="Shipper" control={<Radio />} label="Shipper" />
            <FormControlLabel value="PackageManager" control={<Radio />} label="PackageManager" />
            <FormControlLabel value="Courier" control={<Radio />} label="Courier" />
          </RadioGroup>
        </div>
      );
    }
    function customer() {
      return ( 
        <div>
          <TextField className="signuptextfield mt-3" id="address" label="Address" variant="outlined"/>
          <RadioGroup className="mt-3 d-flex justify-content-center" row aria-label="employeekind" defaultValue="customer" name="row-radio-buttons-group"> 
            <FormControlLabel value="Corporate" control={<Radio />} label="Corporate" />
            <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
          </RadioGroup>
        </div>
      );
    }
    

  return (
    <div>
      <Logo></Logo>
      <div className="sign-up">
        <center>
          <h2 className="display-5 login-header">Register to Hermes</h2>

          <RadioGroup className="mt-3 d-flex justify-content-center" row aria-label="userkind" defaultValue="true" name="row-radio-buttons-group" value={selected} onChange={selectionChangeHandler}>           
            <FormControlLabel value="" control={<Radio />} label="Customer" />
            <FormControlLabel value="false" control={<Radio />}  label="Employee" />
          </RadioGroup>
          
          <TextField className="signuptextfield" id="userid" label="User ID" variant="outlined"/>
          <TextField className="signuptextfield mt-3" id="email" label="Email" variant="outlined"/>
          <TextField className="signuptextfield mt-3" id="name" label="Name" variant="outlined"/>
          <TextField className="signuptextfield mt-3" id="surname" label="Surname" variant="outlined"/>
          <TextField className="signuptextfield mt-3" id="phone" label="Phone Number" variant="outlined"/>
          <TextField className="signuptextfield mt-3" type="password" id="password" label="Password" variant="outlined"/>
          {selected ?  employee() :customer() }
          <button type="button" className="btn btn-secondary btn-lg login-button">Sign Up</button><br/><br/>
        </center>
      </div>
    </div>
  );
}

export default SignUp;
