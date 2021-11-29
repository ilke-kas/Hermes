import React from "react";
import NavBar from "./NavBar";
import CourierInformation from "./CourierInformation";

function ShipperCourier() {
    const [popup, setPopup] = React.useState(false);

    return (
        <div>
            <NavBar></NavBar>
            <br></br>
            <nav className="navbar navbar-light mt-3">
                <div className="mx-auto" style={{width:"500px"}}> 
                    <form className="d-flex">
                    <input className="form-control me-2"type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success ml-1" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <br></br>
            <center>
                <table>
                    <tr>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Package ID</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Package Description</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Recipient ID</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Weight</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Volume</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Branch Name</strong></td><br></br><br></br>
                    </tr>
                    <tr>
                        <td className="table-td">2098</td>
                        <td className="table-td">Refrigerator</td>
                        <td className="table-td">cem.alkan</td>
                        <td className="table-td">400 kg</td>
                        <td className="table-td">2 m³</td>
                        <td className="table-td">Bilkent</td>
                        <td><button type="button" onClick={e => { setPopup(true);}} className="btn btn-info">Customer Not Found</button></td>
                    </tr>
                    <tr>
                        <td className="table-td">2156</td>
                        <td className="table-td">Television</td>
                        <td className="table-td">cem.alkan</td>
                        <td className="table-td">20 kg</td>
                        <td className="table-td">0.5 m³</td>
                        <td className="table-td">Kızılay</td>
                        <td><button type="button" onClick={e => { setPopup(true);}} className="btn btn-info">Customer Not Found</button></td>
                    </tr>
                </table>
            </center>
            <table>
                <tr>
                    <td className="company-info"><CourierInformation/></td>
                </tr>
            </table>
        </div>
    );
}

export default ShipperCourier;