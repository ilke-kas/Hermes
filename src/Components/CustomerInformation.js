import React from "react";
import { Cookies } from "react-cookie";

function CustomerInformation() {
    const [userInfo, setUserInfo] = React.useState([]);
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const [amount, setAmount] = React.useState("");
    var success;

    React.useEffect(() => {
        customerInfo();
    },[]);

    async function customerInfo() {
        const body = {userid};
        const response = await fetch('http://localhost:3001/CustomerProfile', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setUserInfo(data);
            console.log(data);
        });
    }

    async function loadMoney() {
        const body = {userid, amount};
        const response = await fetch('http://localhost:3001/customerLoadMoney', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            success = data.success;
            if(success){
                alert("You loaded the money!");
                window.location = '/CustomerProfile';
            }
        });
    }
    return (
        <div>
            <div>
                <center><h2>My Information</h2></center>
                <table>
                    <tr>
                        <td>User ID:</td>
                        <td>{userid}</td>
                    </tr>
                    <tr>
                        <td>User Name:</td>
                        <td>{userInfo.username}</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>{userInfo.email}</td>
                    </tr>
                    <tr>
                        <td>Phone Number:&emsp;</td>
                        <td>{userInfo.phone}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{userInfo.address}</td>
                    </tr>
                    <tr>
                        <td>Balance:</td>
                        <td>{userInfo.balance}</td> 
                    </tr>
                    <tr>
                        <td style={{width: "30%"}}>Points Collected:</td>
                        <td>{userInfo.points}</td> 
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

export default CustomerInformation;