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
    const [street, setStreet] = React.useState("a");
    const [aptnumber, setAptNumber] = React.useState("1");
    const [city, setCity] = React.useState("a");
    const [state, setState] = React.useState("a");
    const [zip, setZip] = React.useState("1");
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
      if (userid == "") {
        alert("User ID can't be empty. Please enter a user ID and try again.");
      }
      else if (email == "") {
        alert("Email can't be empty. Please enter an email and try again.");
      }
      else if (!email.includes('@')) {
        alert("Please enter a valid email address.");
      }
      else if (name == "") {
        alert("Name can't be empty. Please enter a name and try again.");
      }
      else if (!/^[A-Za-z\s]*$/.test(name)) {
        alert("Name can contain only letters. Please enter a valid name and try again.");
      }
      else if (phone == "") {
        alert("Phone number can't be empty. Please enter a phone number and try again.");
      }
      else if (phone.match(/^[0-9]+$/) == null) {
        alert("Please enter a valid phone number.");
      }
      else if (password == "") {
        alert("Password can't be empty. Please enter a password and try again.");
      }
      else if (street == "") {
        alert("Street name can't be empty. Please enter a street name and try again.");
      }
      else if (aptnumber == "" ) {
        alert("Apartment number can't be empty. Please enter an apartment number and try again.")
      }
      else if (aptnumber.match(/^[0-9]+$/) == null) {
        alert("Apartment number must be a number.");
      }
      else if (city == "") {
        alert("City name can't be empty. Please enter a city name and try again.");
      }
      else if (!/^[A-Za-z\s]*$/.test(city)) {
        alert("Please enter a valid city name.");
      }
      else if (state == "") {
        alert("State name can't be empty. Please enter a state name and try again.");
      }
      else if (!/^[A-Za-z\s]*$/.test(state)) {
        alert("Please enter a valid state name.");
      }
      else if (zip == "") {
        alert("Zip number can't be empty. Please enter a zip number and try again.");
      }
      else if (zip.match(/^[0-9]+$/) == null) {
        alert("Please enter a valid zip number, it can contain only numbers.");
      }
      else {
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
                alert("Are you an individual or a company? Please select one of them.");
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
                alert("Are you a shipper or package manager or courier? Select one of them.");
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
            <TextField className="form-control mt-3" onChange={e => setStreet(e.target.value)} placeholder="Sağlık" id="street" label="Street" variant="outlined"/>
            <TextField className="form-control mt-3" onChange={e => setAptNumber(e.target.value)} placeholder="10" id="aptnumber" label="Apt Number" variant="outlined"/>
          </div>
          <div style={{width:"90%"}} className="input-group mt-3">
            <TextField className="form-control mt-3" onChange={e => setCity(e.target.value)} placeholder="Ankara" id="city" label="City" variant="outlined"/>
            <TextField className="form-control mt-3" onChange={e => setState(e.target.value)} placeholder="Çankaya" id="state" label="State" variant="outlined"/>
            <TextField className="form-control mt-3" onChange={e => setZip(e.target.value)} placeholder="06524" id="zip" label="Zip" variant="outlined"/>
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
          
          <TextField className="signuptextfield" onChange={e => setUserId(e.target.value)} placeholder="hasan-yeni" id="userid" label="User ID" variant="outlined"/>
          <TextField className="signuptextfield mt-3" onChange={e => setEmail(e.target.value)} placeholder="hasan@gmail.com" id="email" label="Email" variant="outlined"/>
          <TextField className="signuptextfield mt-3"  onChange={e => setName(e.target.value)} placeholder="Hasan Yeni" id="name" label="Name" variant="outlined"/>
          <TextField className="signuptextfield mt-3" type="tel"  onChange={e => setPhone(e.target.value)} id="phone" label="Phone Number" placeholder="0531 457 85 98" variant="outlined"/>
          <TextField className="signuptextfield mt-3" onChange={e => setPassword(e.target.value)} type="password" id="password" label="Password" variant="outlined"/>
          {selected ?  employee() :customer() }
          <button type="button" onClick={register} className="btn btn-secondary btn-lg login-button">Sign Up</button><br/><br/>
        </center>
      </div>
    </div>
  );
}

export default SignUp;
