import React from "react";
import HermesLogo from "../img/thelogo.png"
import {useCookies, Cookies} from "react-cookie";
function NavBar() {
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    function logout(){
        //remove cookies
        cookies.remove("userId");
        //direct to the login page
        window.location ="/";
    }
       return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-secondary py-3 navbar-edit">
                <a className="navbar-brand" href="#">
                <div>
                    <img src={HermesLogo} className="logohead2 mt-1" alt="logo"/>
                    <a className='nav-link'> Hermes</a>
                 </div>
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item ml-3">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item ml-3">
                            <a className="nav-link" href="#">Profile</a>
                        </li>
                    </ul>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={logout} >Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;