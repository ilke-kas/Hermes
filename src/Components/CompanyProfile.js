import React from "react";
import NavBar from "./NavBar";
import SeeDetailsPopup from "./SeeDetailsPopup";
import CompanyInformation from "./CompanyInformation";


function CompanyProfile() {
    const [popup, setPopup] = React.useState(false);
    return (
        <div>
            <NavBar></NavBar>
            <table>
                <tr>
                    <td className="info-tablecomp"><CompanyInformation/></td>
                    <td className="info-tablecomp2">
                    <h6>Reports</h6> 
                    <tr><h6>Order Number</h6></tr>   
                    <tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                    </td>
                    <td className="incompleteorder">
                        <div>
                            <center><h2>Incomplete Orders</h2></center><ul>
                            
                                <table>
                                <td>
                                    <tr><h6>Order Number</h6></tr>   
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
                    <td className="completeorder">
                        <div>
                            <center><h2>Complete Orders</h2></center>
                            <ul>
                               <table>
                                    <td>
                                    <tr><h6>Order Number</h6></tr>   
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