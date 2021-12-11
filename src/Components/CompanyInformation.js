import React,{useEffect, useState} from "react";
import {Cookies, useCookies} from "react-cookie";

function CompanyInformation() {
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    const [userData, setUserData] =useState([]);
    var username, email,phone,address,budget;
    React.useEffect(() => {
        profilePage();
    },[]);
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
            </div>
        </div>
    );
}

export default CompanyInformation;