import React from "react";
import {Cookies, useCookies} from "react-cookie";

function ShipperInformation() {
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    const [userData, setUserData] = React.useState([]);
    React.useEffect(() => {
        profilePage();
    }, []);
    async function profilePage(){
        const response = await fetch('http://localhost:3001/shipperProfilePage', {
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
                        <td>Vehicle ID:</td>
                        <td>{userData.vehicleid}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default ShipperInformation;