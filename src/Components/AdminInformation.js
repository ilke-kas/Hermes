import React from "react";
import { Cookies } from "react-cookie";

function AdminInformation() {
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const [info, setInfo] = React.useState([]);

    async function getAdminInfo() {
        const response = await fetch('http://localhost:3001/adminInformation/' + userId);
        const jsonData = await response.json();
        setInfo(jsonData);
    }

    React.useEffect(() => {
        getAdminInfo();
    });
    return (
        <div>
            <div className="admin-info">
                <h2>My Information</h2>
                <table>
                    <tr>
                        <td>User ID:</td>
                        <td>{userId}</td>
                    </tr>
                    <tr>
                        <td>User Name:</td>
                        <td>{info.name}</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>{info.email}</td>
                    </tr>
                    <tr>
                        <td>Phone Number:&emsp;</td>
                        <td>{info.phone}</td>
                    </tr>
                    <tr>
                        <td>Budget</td>
                        <td>{info.budget}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default AdminInformation;