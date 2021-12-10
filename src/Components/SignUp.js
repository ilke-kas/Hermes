import {TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Logo from '../Logo';

function SignUp() {
    const [userid, setUserId] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    //customer things
    const [street, setStreet] = React.useState("");
    const [aptnumber, setAptNumber] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [zip, setZip] = React.useState("");
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selected, setSelected] = useState('');
    const [trigger, setTrigger] = React.useState(false);
    const [text, setText] = React.useState("")

    //employee things
    const [branchid, setBranchId] = React.useState("");
    const [vehicleid, setVehicleId] = React.useState("");


    async function register(e){
      console.log("selected :" + selected);
      console.log("customer :" + selectedCustomer);
      console.log("employee :" + selectedEmployee);
      if ( userid != "" && name != "" && email != "" && password != "" ) {
            if(selected == ""){
              const body = {userid,email,name,phone,password,street,aptnumber,city,state,zip};
              var temp;
              var temp2;
              if(selectedCustomer == "Individual"){
                const response = await fetch("http://localhost:3001/registerIndividual", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
                }).then(x => x.json())
                .then(data => {
                  temp = data.isValid;
                  temp2 = data.type;
                  if(temp){
                    window.location = '/';
                  }
                  else{
                    if(temp2 == "userid"){
                      alert("This user id is already taken.Please select another one.");
                    }
                    else if(temp2 == "email"){
                      alert("This email is already taken.Please select another one.");
                    }
                    else if(temp2 == "phone"){
                      alert("This phone number is already taken.Please select another one.");
                    }
                    else if(temp2 == "branchid"){
                      alert("Please write valid branch id.");
                    }
                    else if(temp2 == "vehicleid"){
                      alert("Please write valid vehicle id.");
                    }
                  }
                });
              }
              else if(selectedCustomer == "Corporate"){
                const response = await fetch("http://localhost:3001/registerCorporate", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body)
                  }).then(x => x.json())
                  .then(data => {
                    temp = data.isValid;
                    temp2 = data.type;
                    if(temp){
                      window.location = '/';
                    }
                    else{
                      if(temp2 == "userid"){
                        alert("This user id is already taken.Please select another one.");
                      }
                      else if(temp2 == "email"){
                        alert("This email is already taken.Please select another one.");
                      }
                      else if(temp2 == "phone"){
                        alert("This phone number is already taken.Please select another one.");
                      }
                      else if(temp2 == "branchid"){
                        alert("Please write valid branch id.");
                      }
                      else if(temp2 == "vehicleid"){
                        alert("Please write valid vehicle id.");
                      }
                    }
                  });
              }
              else{
                setText("Please choose type of the customer!");
              }
            }
            else if(selected == "false"){
              if(selectedEmployee == "PackageManager"){
                const body = {userid,email,name,phone,password,branchid};
                const response = await fetch("http://localhost:3001/registerPackageManager", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body)
                  }).then(x => x.json())
                  .then(data => {
                    temp = data.isValid;
                    temp2 = data.type;
                    if(temp){
                      window.location = '/';
                    }
                    else{
                      if(temp2 == "userid"){
                        alert("This user id is already taken.Please select another one.");
                      }
                      else if(temp2 == "email"){
                        alert("This email is already taken.Please select another one.");
                      }
                      else if(temp2 == "phone"){
                        alert("This phone number is already taken.Please select another one.");
                      }
                      else if(temp2 == "branchid"){
                        alert("Please write valid branch id.");
                      }
                      else if(temp2 == "vehicleid"){
                        alert("Please write valid vehicle id.");
                      }
                    }
                  });

              }
              else if(selectedEmployee == "Shipper"){
                const body = {userid,email,name,phone,password,vehicleid};
                const response = await fetch("http://localhost:3001/registerShipper", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body)
                  }).then(x => x.json())
                  .then(data => {
                    temp = data.isValid;
                    temp2 = data.type;
                    if(temp){
                      window.location = '/';
                    }
                    else{
                      if(temp2 == "userid"){
                        alert("This user id is already taken.Please select another one.");
                      }
                      else if(temp2 == "email"){
                        alert("This email is already taken.Please select another one.");
                      }
                      else if(temp2 == "phone"){
                        alert("This phone number is already taken.Please select another one.");
                      }
                      else if(temp2 == "branchid"){
                        alert("Please write valid branch id.");
                      }
                      else if(temp2 == "vehicleid"){
                        alert("Please write valid vehicle id.");
                      }
                    }
                  });

              }
              else if(selectedEmployee == "Courier"){
                const body = {userid,email,name,phone,password,vehicleid,branchid};
                const response = await fetch("http://localhost:3001/registerCourier", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body)
                  }).then(x => x.json())
                  .then(data => {
                    temp = data.isValid;
                    temp2 = data.type;
                    if(temp){
                      window.location = '/';
                    }
                    else{
                      if(temp2 == "userid"){
                        alert("This user id is already taken.Please select another one.");
                      }
                      else if(temp2 == "email"){
                        alert("This email is already taken.Please select another one.");
                      }
                      else if(temp2 == "phone"){
                        alert("This phone number is already taken.Please select another one.");
                      }
                      else if(temp2 == "branchid"){
                        alert("Please write valid branch id.");
                      }
                      else if(temp2 == "vehicleid"){
                        alert("Please write valid vehicle id.");
                      }
                    }
                  });

              }
              else{
                //please chooose one error
                setText("Please choose type of the employee!");
              }

            }
            else{
              //please choose one error
              setText("Please choose type of the user!");
            }
    }
    else {
        setText("Please enter valid values for user name, email and password!");
        setTrigger(true);
    }
}
   
    function employee() {
      return (
        <div>
          {/* <TextField className="signuptextfield mt-3" id="branch-id" label="Branch ID" variant="outlined"/> */}
          <RadioGroup className="d-flex justify-content-center mt-3" row aria-label="employeekind" defaultValue="customer" name="row-radio-buttons-group" value={selectedEmployee} onChange={event => setSelectedEmployee(event.target.value)}> 
            <FormControlLabel value="Shipper" control={<Radio />} label="Shipper" />
            <FormControlLabel value="PackageManager" control={<Radio />} label="PackageManager" />
            <FormControlLabel value="Courier" control={<Radio />} label="Courier" />
          </RadioGroup>
          {selectedEmployee == "PackageManager" ? <TextField className="signuptextfield" onChange={e => setBranchId(e.target.value)} id="branchid" label="Branch ID" variant="outlined"/> : (selectedEmployee == "Courier" ?
          <div><TextField className="signuptextfield" onChange={e => setVehicleId(e.target.value)} id="vehicleid" label="Vehicle ID" variant="outlined"/><br></br><br></br><TextField className="signuptextfield" onChange={e => setBranchId(e.target.value)} id="branchid" label="Branch ID" variant="outlined"/></div>:
          <TextField className="signuptextfield" onChange={e => setVehicleId(e.target.value)} id="vehicleid" label="Vehicle ID" variant="outlined"/> )}
          <br></br><br></br>
        </div>
      );
    }
    function customer() {
      return ( 
        <div>
          <div style={{width:"90%"}} className="input-group">
            <TextField className="form-control mt-3" onChange={e => setStreet(e.target.value)} id="street" label="Street" variant="outlined"/>
            <TextField className="form-control mt-3" onChange={e => setAptNumber(e.target.value)} id="aptnumber" label="Apt Number" variant="outlined"/>
          </div>
          <div style={{width:"90%"}} className="input-group mt-3">
            <TextField className="form-control mt-3" onChange={e => setCity(e.target.value)} id="city" label="City" variant="outlined"/>
            <TextField className="form-control mt-3" onChange={e => setState(e.target.value)} id="state" label="State" variant="outlined"/>
            <TextField className="form-control mt-3" onChange={e => setZip(e.target.value)} id="zip" label="Zip" variant="outlined"/>
          </div>
          <RadioGroup className="mt-4 d-flex justify-content-center" row aria-label="employeekind" defaultValue="customer" name="row-radio-buttons-group" value={selectedCustomer} onChange={event => setSelectedCustomer(event.target.value)}> 
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

          <RadioGroup className="mt-3 d-flex justify-content-center" row aria-label="userkind" defaultValue="true" name="row-radio-buttons-group" value={selected} onChange={event => setSelected(event.target.value)}>          
            <FormControlLabel value="" control={<Radio />} label="Customer" />
            <FormControlLabel value="false" control={<Radio />}  label="Employee" />
          </RadioGroup>
          
          <TextField className="signuptextfield" onChange={e => setUserId(e.target.value)} id="userid" label="User ID" variant="outlined"/>
          <TextField className="signuptextfield mt-3" onChange={e => setEmail(e.target.value)} id="email" label="Email" variant="outlined"/>
          <TextField className="signuptextfield mt-3"  onChange={e => setName(e.target.value)} id="name" label="Name" variant="outlined"/>
          <TextField className="signuptextfield mt-3"  onChange={e => setPhone(e.target.value)} id="phone" label="Phone Number" variant="outlined"/>
          <TextField className="signuptextfield mt-3" onChange={e => setPassword(e.target.value)} type="password" id="password" label="Password" variant="outlined"/>
          {selected ?  employee() :customer() }
          <button type="button" onClick={register} className="btn btn-secondary btn-lg login-button">Sign Up</button><br/><br/>
        </center>
      </div>
    </div>
  );
}

export default SignUp;
