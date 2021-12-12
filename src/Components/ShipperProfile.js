import React from "react";
import NavBar from "./NavBar";
import ShipperInformation from "./ShipperInformation";

function ShipperCourier() {
    const [popup, setPopup] = React.useState(false);

    return (
        <div>
            <NavBar></NavBar>
            
            <table>
                <tr>
                    <td className="company-info"><ShipperInformation/></td>
                </tr>
            </table>
        </div>
    );
}

export default ShipperCourier;