import React from "react";

function ConfirmationPopup(props) {

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <center>
                        <p>Do you confirm that you recieved the package?</p>
                        <button type="button" onClick={e => props.setTrigger(false)} className="btn btn-danger mt-3">Yes</button>&emsp;
                        <button type="button" onClick={e => props.setTrigger(false)} className="btn btn-danger mt-3">No</button>
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

export default ConfirmationPopup;