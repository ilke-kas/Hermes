import React from "react";

function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-secondary py-3 navbar-edit">
                <a className="navbar-brand" href="#">Hermes</a>
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
                                <a className="nav-link" href="#">Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;