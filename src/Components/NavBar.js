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
    async function profile(){
        console.log(userId);
        const body ={userId};
        console.log(body);
        var temp;
        const response = await fetch('http://localhost:3001/getUserType', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            temp = data.userType;
            console.log(temp);
              if(temp == 'packagemanager'){
                window.location = "/PackageManager";
              }
              else if( temp == 'shipper'){
                window.location = "/ShipperProfile";
              }
              else if( temp == 'courier'){
                window.location = "/CourierProfile";
              }
              else if( temp == 'corporate'){
                window.location = "/CompanyProfile";
              }
              else if( temp == 'individual'){
                window.location = "/CustomerProfile";
              }
        });
    }
    async function home(){
        console.log(userId);
        const body ={userId};
        console.log(body);
        var temp;
        const response = await fetch('http://localhost:3001/getUserType', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            temp = data.userType;
            console.log(temp);
              if(temp == 'packagemanager'){
                window.location = "/PackageManagerHomePage";
              }
              else if( temp == 'shipper'){
                window.location = "/Shipper";
              }
              else if( temp == 'courier'){
                window.location = "/CourierHome";
              }
              else if( temp == 'corporate'){
                window.location = "/CompanyHomePage";
              }
              else if( temp == 'individual'){
                window.location = "/Customer";
              }
        });

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
                            <a className="nav-link" href="#" onClick={home}>Home</a>
                        </li>
                        <li className="nav-item ml-3">
                            <a className="nav-link" href="#" onClick={profile}>Profile</a>
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