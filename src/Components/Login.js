import {TextField} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Logo from '../Logo';
import {useCookies} from "react-cookie";
import { Route,Link } from 'react-router-dom';
import SignUp from './SignUp';

function Login() {
  const [cookies, setCookie] = useCookies(["userId"])
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  var temp; 
  var temp2;
  var temp3;
  async function checkLogin(e) {
    e.preventDefault();
    debugger; 
    const body = {email, password};
    const response = await fetch('http://localhost:3001/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then(x => x.json())
    .then(data => {
        temp = data.isValid;
        temp2 = data.userId;
        temp3= data.userType;
        console.log(temp);
        console.log(temp2);
        console.log(temp3);
        if (temp) {
          const remember = localStorage.setItem("user", temp2)
          if(temp3 == 'packagemanager'){
            window.location = "/PackageManagerHomePage";
          }
          else if( temp3 == 'shipper'){
            window.location = "/Shipper";
          }
          else if( temp3 == 'courier'){
            window.location = "/CourierHome";
          }
          else if( temp3 == 'corporate'){
            window.location = "/CompanyHomePage";
          }
          else if( temp3 == 'individual'){
            window.location = "/Customer";
          }
      }
      else {
          alert("Login Failed, Please Try Again");
          window.location = "/";
      }
    });
    setCookie("userId", temp2, {
      path: "/"
  });
}
  return (
    <div>
      <Logo></Logo>
      <div className="logincomp">
        <center>
          <h2 className="display-5 mt-3 login-header">Welcome to Hermes</h2>
          <TextField onChange={e => setEmail(e.target.value)
} name="userid"  className="email-password mt-3" id="userid" label="User ID" variant="outlined"/>
          <br/><br/>
          <TextField onChange={e => setPassword(e.target.value)
} name="password" className="email-password" type="password" id="password" label="Password" variant="outlined"/>
          <br/><br/>
          <button onClick={checkLogin} type="button" className="btn btn-secondary btn-lg login-button">Sign In</button><br/><br/>
          <hr className="hr-login"/>
          <Link to="/SignUp" className="mt-4 create-account">New to Hermes? Create Account</Link>

        </center>
      </div>
    </div>
  );
}
export default Login;
