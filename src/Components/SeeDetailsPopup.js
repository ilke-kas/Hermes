import React from "react";

function SeeDetailsPopup(props) {

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <strong><center><p>Please enter nonempty values for error name and content!</p></center></strong>
                    <table>
                        <tr>
                            <td><input type="textarea"  style={{width: "400px", height: "120px"}} className="form-control" id="floatingInput" step="any"/></td>
                            <td><input type="textarea"  style={{width: "400px", height: "120px"}} className="form-control" step="any" id="floatingPassword"/></td>
                        </tr>
                    </table>
                    <br></br>
                    <button type="button" className="btn btn-success">Save</button>
                    <button type="button" onClick={e => props.setTrigger(false)} className="btn btn-danger popup-close-button">Close</button>
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