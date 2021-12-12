import React,{useState,useEffect} from "react";
import NavBar from "./NavBar";
import CourierLogo from '../img/courier.png';
import InPersonLogo from '../img/inPerson.png';
import {Link} from "react-router-dom"

function CustomerHome(){
    const [trigger, setTrigger] = React.useState(true); 
    const [trigger2, setTrigger2] = React.useState(true); 
    return (
        <div>
            <NavBar></NavBar>
            <center>
            <table className="option-table">
                <tr>
                    <td>
                        <Link to={{pathname: "/OpenForm", state: "Please fill out the form below to submit your package to the courier."}}><img onClick={e => { setTrigger(false);}} src={CourierLogo} className="customer-page-logo" alt="logo"/></Link>
                    </td>
                    <td>
                        <Link to={{pathname: "/OpenForm", state: "Please fill out the form below to submit your package in person"}}><img onClick={e => { setTrigger2(false);}} src={InPersonLogo} className="customer-page-logo2" alt="logo"/></Link>
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
            </center>
        </div>
    );
}

export default CustomerHome;