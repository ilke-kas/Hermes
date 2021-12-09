import {TextField} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Logo from '../Logo';
import axios from 'axios';

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  var temp; 
  var temp2;
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
          <p className="mt-4 create-account">New to Hermes? Create Account</p>
        </center>
      </div>
    </div>
  );
}

export default Login;
