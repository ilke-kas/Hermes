import React from "react";
import NavBar from "./NavBar";
import PackageAcceptance from "./PackageAcceptance";
import {Cookies, useCookies} from "react-cookie";

function CourierHomePage() {
    const cookies = new Cookies();
    const x = cookies.get(["userId"]);
    return (
        <div>
            <h1>{x}</h1>
            <NavBar></NavBar>
            <PackageAcceptance>
            </PackageAcceptance>
            
        </div>
    );
}

export default CourierHomePage;