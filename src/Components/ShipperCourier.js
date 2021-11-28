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
                    

                </tr>
            </table>
        </div>
    );
}

export default ShipperCourier;