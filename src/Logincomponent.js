import { Box, Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import login from "./img/login.jpeg";

function Logincomponent() {
  return (
    <div>
      
    <div className="logincomp">
    <h2 className='loginx'>Login</h2>
    <div className='texta'>
     
     
     <TextField  id="email" label="Email" variant="outlined" style = {{width: 250}} />
     <div/>
     <div/>
     <TextField  id="password" label="Password" variant="outlined" style = {{width: 250}}/>
     <div/>
    
     </div>
     <div className='textb'>
     <Button variant="contained" style = {{width: 200}}>Login</Button>
     </div>
     
     <div className='newemployee'>
     If you are an new user sign up!
     </div>
     <div className='textb'>
     <Button variant="contained" style = {{width: 200}}>Sign up</Button>
     </div>
     
    
    </div>
    
   </div>
  );
}

export default Logincomponent;
