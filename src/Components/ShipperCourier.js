import React from "react";
import NavBar from "./NavBar";
import CourierInformation from "./CourierInformation";

function ShipperCourier() {
    const [popup, setPopup] = React.useState(false);
    return (
        <div>
            <NavBar></NavBar>
            <table>
                <tr>

                    <td className="info-tablecomp"><CourierInformation/></td>
                    <td className="incompleteorder">
                        <div>
                            <center><h2>Orders To Transport</h2></center><ul>
                            
                                <table>
                                <td>
                                    <tr><h6>Accept orders</h6></tr>   
                                    <tr>OrderID&emsp;<button type="button" className="btn btn-success">Accept</button></tr>
                                    <br></br><tr>OrderID&emsp;<button type="button"  className="btn btn-success">Accept</button></tr>
                                    <br></br><tr>OrderID&emsp;<button type="button" className="btn btn-success">Accept</button></tr>
                                    <br></br><tr>OrderID&emsp;<button type="button"  className="btn btn-success">Accept</button></tr>
                                    <br></br><tr>OrderID&emsp;<button type="button" className="btn btn-success">Accept</button></tr>
                                    <br></br>
                                    </td>
                                </table>                                
                            </ul>
                        </div>
                    </td>

                    <td className="info-tablecomp"><CourierInformation/></td>       

                </tr>
            </table>
        </div>
    );
}

export default ShipperCourier;