import React from "react";
import NavBar from "./NavBar";
import CustomerInformation from "./CustomerInformation";
import {BiCurrentLocation} from "react-icons/bi";
import {AiOutlineDash} from "react-icons/ai";
import SeeDetailsPopup from "./SeeDetailsPopup";
import CreateReportPopup from "./CreateReportPopup";
import CreateReportPopup2 from "./CreateReportPopup2";
import {RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import ConfirmationPopup from "./ConfirmationPopup";


function CustomerProfile() {
    const [popup, setPopup] = React.useState(false);
    const [popup2, setPopup2] = React.useState(false);
    const [popup3, setPopup3] = React.useState(false);
    const [popup4, setPopup4] = React.useState(false);

    return (
        <div>
            <NavBar></NavBar>
            <table>
                <tr>
                    <td className="info-table2"><CustomerInformation></CustomerInformation></td>
                    <td className="info-table21">
                        <center><h2>Load Money</h2></center>
                        <center><input type="amount" id="amount" placeholder="Amount to Load"></input></center><br></br>
                        <center><button className="btn btn-secondary">Load</button></center>
                    </td>
                    <td className="info-table3">
                        <div>
                            <RadioGroup className="d-flex justify-content-center mt-3" row aria-label="employeekind" defaultValue="customer" name="row-radio-buttons-group"> 
                                <FormControlLabel value="Shipper" control={<Radio />} label="Sender" />
                                <FormControlLabel value="PackageManager" control={<Radio />} label="Recipient" />
                            </RadioGroup><hr style={{height:"2px"}}></hr>
                            <center><h2>My Packages</h2></center>
                            <h3 className="mt-3">Delivered Packages</h3>
                            <ul>
                                <li>Refrigerator&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button>&emsp;<button onClick={e => { setPopup2(true);}} className="btn btn-warning" type="button">Create Report</button></li>
                            </ul>
                            <h3 className="mt-5">Not Delivered Packages</h3>
                            <ul>
                                <li>Television&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button>&emsp;
                                <button onClick={e => { setPopup3(true);}} className="btn btn-warning" type="button">Create Report</button>&emsp;
                                <button type="button" onClick={e => setPopup4(true)} className="btn btn-info">I Received The Package</button></li>
                                <BiCurrentLocation size="2em" className="mt-5"/><AiOutlineDash className="mt-5"/><AiOutlineDash className="mt-5"/><AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em" className="mt-5"/><AiOutlineDash className="mt-5"/><AiOutlineDash className="mt-5"/><AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em" style={{color:"red"}} className="mt-5"/>&emsp;&emsp;&emsp;<BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;<BiCurrentLocation size="2em" className="mt-5"/>
                                <table>
                                    <tr>
                                        <td><p className="location">Courier&emsp;</p></td>
                                        <td><p className="location">Branch&emsp;&ensp;&nbsp;</p></td>
                                        <td><p className="location">Shipper&emsp;</p></td>
                                        <td><p className="location">Destination<br></br>Branch</p></td>
                                        <td><p className="location">&emsp;Recipient</p></td>
                                    </tr>
                                </table>                                
                            </ul>
                        </div>
                    </td>
                </tr>
            </table>
            <SeeDetailsPopup trigger={popup} setTrigger={setPopup}></SeeDetailsPopup>
            <CreateReportPopup trigger={popup2} setTrigger={setPopup2}></CreateReportPopup>
            <CreateReportPopup2 trigger={popup3} setTrigger={setPopup3}></CreateReportPopup2>
            <ConfirmationPopup trigger={popup4} setTrigger={setPopup4}></ConfirmationPopup>
        </div>
    );
}

export default CustomerProfile;