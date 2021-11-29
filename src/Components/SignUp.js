import {TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Logo from '../Logo';

function SignUp() {
    const [selected, setSelected] = useState('');
    const [selected2, setSelected2] = useState('');

    const selectionChangeHandler = (event) => {
      setSelected(event.target.value);
    };
   
    function employee() {
      return (
        <div>
          {/* <TextField className="signuptextfield mt-3" id="branch-id" label="Branch ID" variant="outlined"/> */}
          <RadioGroup className="d-flex justify-content-center mt-3" row aria-label="employeekind" defaultValue="customer" name="row-radio-buttons-group" value={selected2} onChange={event => setSelected2(event.target.value)}> 
            <FormControlLabel value="Shipper" control={<Radio />} label="Shipper" />
            <FormControlLabel value="PackageManager" control={<Radio />} label="PackageManager" />
            <FormControlLabel value="Courier" control={<Radio />} label="Courier" />
          </RadioGroup>
          {selected2 == "PackageManager" ? <TextField className="signuptextfield" id="branch-id" label="Branch ID" variant="outlined"/> : 
          <TextField className="signuptextfield" id="branch-id" label="Vehicle ID" variant="outlined"/>}
          <br></br><br></br>
        </div>
      );
    }
    function customer() {
      return ( 
        <div>
          <div style={{width:"90%"}} className="input-group">
            <TextField className="form-control mt-3" id="street" label="Street" variant="outlined"/>
            <TextField className="form-control mt-3" id="apt-number" label="Apt Number" variant="outlined"/>
          </div>
          <div style={{width:"90%"}} className="input-group mt-3">
            <TextField className="form-control mt-3" id="city" label="City" variant="outlined"/>
            <TextField className="form-control mt-3" id="state" label="State" variant="outlined"/>
            <TextField className="form-control mt-3" id="zip" label="Zip" variant="outlined"/>
          </div>
          <RadioGroup className="mt-4 d-flex justify-content-center" row aria-label="employeekind" defaultValue="customer" name="row-radio-buttons-group"> 
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
