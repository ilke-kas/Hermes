import React from "react";
import NavBar from "./NavBar";
import ReportPopUp from "./ReportPopUp";
import PackageManagerInfo from "./PackageManagerInfo";
import AssignPopUp from "./AssignPopUp"
import SeeDetailsPopup from "./SeeDetailsPopup";

function CompanyProfile() {
    const [popup, setPopup] = React.useState(false);
    
    return (
        <div>
            <NavBar></NavBar>
            <table>
                <tr>
                    <td className="info-tablecomp"><PackageManagerInfo/></td>
                   
                    <td className="completeorder">
                        <div>
                            <center><h2>Old Orders</h2></center>
                            <ul>
                               <table>
                                    <td>
                                    <tr><h6>Orders to give shipper</h6></tr>   
                                    <tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button> </tr>
                                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button> </tr>
                                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button> </tr>
                                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button> </tr>
                                    <br></br>
                                    </td>
                                </table>                                
                            </ul>
                        </div>
                    </td>
                    <td className="completeorder2">
                        <div>
                            <center><h2>Other Orders</h2></center>
                            <ul>
                               <table>
                                    <td>
                                    <tr><h6>Holdout,Lost & Malformed</h6></tr>   
                                    <tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                                    <br></br>
                                    </td>
                                </table>                                
                            </ul>
                        </div>
                    </td>
                </tr>
            </table>
            <SeeDetailsPopup trigger={popup} setTrigger={setPopup}></SeeDetailsPopup>
       
        </div>
    );
}

export default CompanyProfile;