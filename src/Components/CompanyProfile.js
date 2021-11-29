import React from "react";
import NavBar from "./NavBar";
import CompanyInformation from "./CompanyInformation";

function CompanyProfile() {
    const [popup, setPopup] = React.useState(false);

    return (
        <div>
            <NavBar></NavBar>
            <table>
                <tr>
                    <td className="company-info2"><CompanyInformation/></td>
                    <td className="company-load-money">
                        <center><h2>Load Money</h2></center>
                        <center><input type="amount" id="amount" placeholder="Amount to Load"></input></center><br></br>
                        <center><button className="btn btn-secondary">Load</button></center>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default CompanyProfile;