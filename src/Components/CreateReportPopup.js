import React, { useState, useEffect } from 'react';
import {TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import { Cookies } from "react-cookie";
import * as ReactBootStrap from "react-bootstrap"


function CreateReportPopup(props) {
    
    console.log(props);
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const packageid = props.id;
    const [userData, setUserData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);    
    const [reportDescription, setReportDescription] =useState('');;

    React.useEffect(() => {
        if(props.trigger){
        console.log("popup is opened");
        packageInfo();
        }
        else{
            setUserData([]);
        }
    },[props.trigger]);

    async function packageInfo() {
        const body = {userid,packageid};
        const response = await fetch('http://localhost:3001/CreateReport', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setUserData(data);
            console.log(data);
        });
        setLoading(true);
    }
    async function createReport(){
        var success;
        const body ={packageid, userid, reportDescription};
        console.log(userid +"here3");

            const response2 = await fetch('http://localhost:3001/submitReportMalformed', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            console.log(data.success);
            alert("You have succesfully submitted your report.");
        });

    }





    function loadedData() {
        return (
            <div className="popup">
                <div className="popup-inner2">
                    <br></br>
                    <center><h4>Malformed Package Report</h4>
                    <h5>Give descirption about the malform of your package.</h5>
                    
                    <table className="report-table mt-3">
                    <tr>
                        <td>Description:</td>
                        <td>{userData.description}</td>   
                    </tr>
                    <tr>
                        <td>Package ID:</td>
                        <td>{userData.packageid}</td>
                    </tr>
                    </table>
                    <table className="mt-3">
                        <tr>
                            <td><label>Give information about the package's situation:</label>&emsp;</td>
                            <td><textarea name="textarea" cols="40" rows="5" onChange={e => setReportDescription(e.target.value)}  id="reportDescription"></textarea></td>
                        </tr>
                    </table>
                    <button type="button" className="btn btn-success mt-3" onClick={e => {props.setTrigger(false); createReport();}}>Submit</button>&emsp;
                    <button type="button" onClick={e => props.setTrigger(false)} className="btn btn-danger mt-3">Close</button>
                    </center>
                </div>
            </div>
        )
    
    }

   function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <br></br>
                    <center>
                    {loading ? loadedData() :
                    <ReactBootStrap.Spinner animation="border" />
                    }
                    </center>
                </div>
            </div>
        )
    }

    return (
        <div>
            
            {props.trigger === true ? insidePopup() : null}
        </div>
    );
}

export default CreateReportPopup;