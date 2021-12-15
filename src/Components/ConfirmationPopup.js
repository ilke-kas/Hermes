import React from "react";

function ConfirmationPopup(props) {
    const [pid,setPid] = React.useState([]);

    React.useEffect(() => {
        setPid(props.setId);
        console.log(props);
    });

    async function makeitDelivered(){
        props.setTrigger(false);
        console.log(pid);
            const body2 ={pid};
            const response = await fetch('http://localhost:3001/makePackageDelivered', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body2)
            }).then(x => x.json())
            .then(data => {
                props.setTrigger(false);
            });
    }
    function makeitUndelivered(){
        //do nothing
        props.setTrigger(false);
    }

    function refreshPage() {
        window.location = "/CustomerProfile";
    }

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <center>
                        <p>Do you confirm that you recieved the package?</p>
                        <button type="button" onClick={e => {makeitDelivered(); refreshPage();}} className="btn btn-danger mt-3">Yes</button>&emsp;
                        <button type="button" onClick={makeitUndelivered} className="btn btn-danger mt-3">No</button>
                    </center>
                </div>
            </div>
        )
    }
    return (
        <div>
            {props.trigger === true ? insidePopup() :null}
        </div>
    );
}

export default ConfirmationPopup;