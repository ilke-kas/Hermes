import React from "react";
import NavBar from "./NavBar";
import CompanyInformation from "./CompanyInformation";
import {Cookies, useCookies} from "react-cookie";

function CompanyProfile() {
    const [popup, setPopup] = React.useState(false);
    const [amount, setAmount] = React.useState("");
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid, amount};
    var success;
    async function loadMoney(){
        const response = await fetch('http://localhost:3001/companyLoadMoney', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
          
            success = data.success;
            console.log(success);
            if(success){
                alert("You loaded the money!");
                window.location = '/CompanyProfile';
            }

        });
    }

    return (
        <div>
            <NavBar></NavBar>
            <table>
                <tr>
                    <td className="company-info2"><CompanyInformation/></td>
                    <td className="company-load-money">
                        <center><h2>Load Money</h2></center>
                        <center><input type="amount" id="amount" placeholder="Amount to Load" onChange={e => setAmount(e.target.value)}></input></center><br></br>
                        <center><button className="btn btn-secondary" onClick={loadMoney}>Load</button></center>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default CompanyProfile;