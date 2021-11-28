import React from "react";
import NavBar from "./NavBar";
import ManagerPackageAcceptance from "./ManagerPackageAcceptance";
import ReportPopUp from "./ReportPopUp";

function CourierHomePage() {
    const [popup, setPopup] = React.useState(false);

    return (
        <div>
            <NavBar></NavBar>
            
            <ManagerPackageAcceptance/>
            <td className="info-tablecomp23">
                    <h6>Reports</h6> 
                    <tr><h6>Order Number</h6></tr>   
                    <tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                    <br></br>
                    <tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                    <br></br><tr>OrderID&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></tr>
                    <br></br>
                    
                    </td>
                    <ReportPopUp trigger={popup} setTrigger={setPopup}></ReportPopUp>
        </div>

    );
}

export default CourierHomePage;