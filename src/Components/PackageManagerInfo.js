import React from "react";
import {Cookies, useCookies} from "react-cookie";

function PackageManagerInfo() {
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    const [userData, setUserData] = React.useState([]);
    React.useEffect(() => {
        profilePage();
    }, []);
    async function profilePage(){
        const response = await fetch('http://localhost:3001/packageManagerProfilePage', {
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
                        <td>Branch Id:&emsp;</td>
                        <td>{userData.branchid}</td>
                    </tr>
                    <tr>
                       
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default PackageManagerInfo;