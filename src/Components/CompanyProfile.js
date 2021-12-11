import React from "react";
import NavBar from "./NavBar";
import CompanyInformation from "./CompanyInformation";
import {Cookies, useCookies} from "react-cookie";

function CompanyProfile() {    
    return (
        <div>
            <NavBar></NavBar>
            <center>
            <br></br><br></br><br></br>
            <table className="mt-5">
                <tr>
                    <td className="company-info2"><CompanyInformation/></td>
                </tr>
            </table>
            </center>
        </div>
    );
}

export default CompanyProfile;