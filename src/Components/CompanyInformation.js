import React from "react";
import {Cookies, useCookies} from "react-cookie";

function CompanyInformation() {
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    const [amount, setAmount] = React.useState("");
    const [userData, setUserData] = React.useState([]);
    var success;

    React.useEffect(() => {
        profilePage();
    }, []);
    
    async function loadMoney() {
        const body = {userid, amount};
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

    async function profilePage(){
        const response = await fetch('http://localhost:3001/companyProfilePage', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setUserData(data);
            console.log(data);
        });
    }
    return (
        <div>
            <div>
                <h2>My Information</h2>
                <table>
                    <tr>
                        <td>User ID:</td>
                        <td>{userid}</td>
                    </tr>
                    <tr>
                        <td>User Name:</td>
                        <td>{userData.username}</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>{userData.email}</td>
                    </tr>
                    <tr>
                        <td>Phone Number:&emsp;</td>
                        <td>{userData.phone}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{userData.address}</td>
                    </tr>
                    <tr>
                        <td>Budget:</td>
                        <td>{userData.budget}</td>
                    </tr>
                </table>
                <hr style={{color:"black", backgroundColor:"#ccc", border:"none", height:"3px"}}></hr>
                <table>
                <tr>
                        <td>Load money to your credit card:&emsp;</td>
                        <td><input type="amount" id="amount" placeholder="Amount to Load" onChange={e => setAmount(e.target.value)}></input>&emsp;</td>
                        <td><button className="btn btn-secondary" onClick={loadMoney}>Load</button></td>  
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default CompanyInformation;