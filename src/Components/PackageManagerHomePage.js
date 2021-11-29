import React from "react";
import NavBar from "./NavBar";
import ManagerPackageAcceptance from "./ManagerPackageAcceptance";
import SeeReportPopupPackageManager from "./SeeReportPopupPackageManager";

function PackageManagerHomePage() {
    const [popup, setPopup] = React.useState(false);

    return (
        <div>
            <NavBar></NavBar>
            <ManagerPackageAcceptance/>
            <div className="info-tablecomp23">
                <table>
                    <tr>
                        <td><h5>Reports</h5></td>
                    </tr>
                    <tr>
                        <td><h6>Package ID</h6></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>725</td>
                        <td>&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></td>
                    </tr>
                    <tr>
                        <td>532</td>
                        <td>&emsp;<button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button></td>
                    </tr>
                </table>
            </div>
            <SeeReportPopupPackageManager trigger={popup} setTrigger={setPopup}></SeeReportPopupPackageManager>
        </div>

    );
}

export default PackageManagerHomePage;