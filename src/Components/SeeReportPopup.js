import React from "react";

function SeeReportPopup(props) {

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner3">
                    <br></br>
                    <center>
                    <table>
                        <tr>
                            <td><strong>Type:</strong></td>
                            <td>Malformed Package</td>   
                        </tr>
                        <tr>
                            <td><strong>Weight:</strong></td>
                            <td>400 kg</td>
                        </tr>
                        <tr>
                            <td><strong>Volume:</strong></td>
                            <td>2m³</td>
                        </tr>
                        <tr>
                            <td><strong>Recipient ID:&emsp;&emsp;</strong></td>
                            <td>hazal.kaya</td>
                        </tr>
                        <tr>
                            <td><strong>Branch Name:</strong></td>
                            <td>Bilkent</td>
                        </tr>
                        <tr>
                            <td><strong>Employee Name:</strong></td>
                            <td>Ali Atay</td>
                        </tr>
                        <tr>
                            <td><strong>Description:</strong></td>
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

export default SeeReportPopup;