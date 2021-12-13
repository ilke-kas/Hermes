import React from "react";
import NavBar from "./NavBar";
import PackageAcceptance from "./PackageAcceptance";
import {Cookies, useCookies} from "react-cookie";

function CourierHomePage() {
    return (
        <div>
            <NavBar></NavBar>
            <PackageAcceptance>
            </PackageAcceptance>
            
        </div>
    );
}

export default CourierHomePage;