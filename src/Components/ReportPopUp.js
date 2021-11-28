import React from "react";

function SeeDetailsPopup(props) {

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <br></br>
                    <center>
                    <table>
                        <tr>
                            <td>Title(type):</td>
                            <td>Malformed Package</td>   
                        </tr>
                        <tr>
                            <td>Weight:</td>
                            <td>400 kg</td>
                        </tr>
                        <tr>
                            <td>Volume:</td>
                            <td>2m³</td>
                        </tr>
                        <tr>
                            <td>Recipient ID:</td>
                            <td>hazal.kaya</td>
                        </tr>
                        <tr>
                            <td>Branch Name:</td>
                            <td>Bilkent</td>
                        </tr>
                        <tr>
                            <td>Employee Name:&emsp;&emsp;</td>
                            <td>Ali Atay</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>My package had a dozen glasses in it and half of them was broken when I recieved the package</td>
                        </tr>
                    </table>
                    <button type="button" onClick={e => props.setTrigger(false)} className="btn btn-danger mt-3">Close</button>
                    </center>
                </div>
            </div>
        )
    }
    return (
        <div>
            {props.trigger === true ? insidePopup() : null}
        </div>
    );
}

export default SeeDetailsPopup;