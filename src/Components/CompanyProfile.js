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
                    <td className="company-info"><CompanyInformation/></td>
                </tr>
            </table>
        </div>
    );
}

export default CompanyProfile;