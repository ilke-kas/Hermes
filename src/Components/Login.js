import {TextField} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Logo from '../Logo';

function Login() {
  return (
    <div>
      <Logo></Logo>
      <div className="logincomp">
        <center>
          <h2 className="display-5 mt-3 login-header">Welcome to Hermes</h2>
          <TextField className="email-password mt-3" id="userid" label="User ID" variant="outlined"/>
          <br/><br/>
          <TextField className="email-password" type="password" id="password" label="Password" variant="outlined"/>
          <br/><br/>
          <button type="button" className="btn btn-secondary btn-lg login-button">Sign In</button><br/><br/>
          <hr className="hr-login"/>
          <p className="mt-4 create-account">New to Hermes? Create Account</p>
        </center>
      </div>
    </div>
  );
}

export default Login;
