import React from "react";
import NavBar from "./NavBar";
import CustomerInformation from "./CustomerInformation";
import {BiCurrentLocation} from "react-icons/bi";
import {AiOutlineDash} from "react-icons/ai";
import DeliveredPackage from "./DeliveredPackage";
import SeeDetailsPopup from "./SeeDetailsPopup";
import CompanyInformation from "./CompanyInformation";
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