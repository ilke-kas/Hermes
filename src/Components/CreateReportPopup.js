import React from "react";

function CreateReportPopup(props) {

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner2">
                    <br></br>
                    <center>
                    <h4 style={{color:"red"}}>Malformed Package</h4>
                    <h5>Creating report for a delivered package means that your package is malformed. If it is malformed, fill out the form below.</h5>
                    <table className="report-table mt-3">
                        <tr>
                            <td>Description:</td>
                            <td>Refrigerator</td>
                        </tr>
                        <tr>
                            <td>Package ID:</td>
                            <td>2098</td>
                        </tr>
                    </table>
                    <table className="mt-3">
                        <tr>
                            <td><label>Give information about the package's situation:</label>&emsp;</td>
                            <td><textarea name="textarea" cols="40" rows="5"></textarea></td>
                        </tr>
                    </table>
                    <button type="button" className="btn btn-success mt-3">Submit</button>&emsp;
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

export default CreateReportPopup;