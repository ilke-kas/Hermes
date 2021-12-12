import React,{useState,useEffect} from "react";
import NavBar from "./NavBar";
import CourierLogo from '../img/courier.png';
import InPersonLogo from '../img/inPerson.png';
import { Cookies } from "react-cookie";
import openForm from './OpenForm';

function CustomerHome(){
    const [trigger, setTrigger] = React.useState(true); 
    const [trigger2, setTrigger2] = React.useState(true); 
    return (
        <div>
            <NavBar></NavBar>
            <center>
            {trigger && trigger2 ?
            <table className="option-table">
                <tr>
                    <td>
                        <img onClick={e => { setTrigger(false);}} src={CourierLogo} className="customer-page-logo" alt="logo"/>
                    </td>
                    <td>
                        <img onClick={e => { setTrigger2(false);}} src={InPersonLogo} className="customer-page-logo2" alt="logo"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <br></br>
                        <h3 className="customer-page-option">Call Courier to Your Own Location</h3>
                    </td>
                    <td>
                        <br></br>
                        <h3 className="customer-page-option">Submit Package in Person</h3>
                    </td>
                </tr>
            </table>
            : !trigger ? window.location='/Openform' : window.location= '/OpenForm'}
            </center>
        </div>
    );

}

export default CustomerHome;