import React from "react";
import { Cookies } from "react-cookie";
import * as ReactBootStrap from "react-bootstrap"

function SeeReportPopupPackageManager(props) {
    console.log(props);
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const packageid = props.id;
    const [userData, setUserData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);  
    const [reportStatusState,setReportStatusState] = React.useState("");  
    console.log(props.id);

    React.useEffect(() => {
        if(props.trigger){
        console.log("popup is opened");
        packageInfo();
        }
       
    },[props.trigger]);
    async function packageInfo() {
        const body = {userid,packageid}

        const response = await fetch('http://localhost:3001/SeeReport', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setUserData(data.ya);
            console.log(userData);
        });
        setLoading(true);
    }


    async function acceptit(){

        var success;
        const body ={packageid, userid};
        console.log(userid +"here4");
        if( reportStatusState== "Lost report in evaluation."){
         const response = await fetch('http://localhost:3001/acceptLostReport', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            console.log(data.success);
        });
    }
        else{
            const response = await fetch('http://localhost:3001/acceptMalformedReport', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            console.log(data.success);
        });

        }
    }

    async function denyit(){
        var success;
        const body ={packageid, userid};
        console.log(userid +"here5");
         const response = await fetch('http://localhost:3001/denyReport', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            console.log(data.success);
            setReportStatusState(userData.packageStatus);
        });
    }

    function loadedData() {
        return (
            <div>
                <table>
            <tr>
                <td><strong>Type:</strong></td>
                <td>{userData[0]?.packageStatus}</td>   
            </tr>
            <tr>
                <td><strong>Weight:</strong></td>
                <td>{userData[0]?.weight}kg</td>
            </tr>
            <tr>
                <td><strong>Volume:</strong></td>
                <td>{userData[0]?.volume}m³</td>
            </tr>
            <tr>
                <td><strong>Recipient ID:</strong></td>
                <td>{userData[0]?.receptient}</td>
            </tr>
            <tr>
                <td><strong>Branch Name:</strong></td>
                <td>{userData[0]?.branchname}</td>
            </tr>
            <tr>
                <td><strong>Description:</strong></td>
                <td>{userData[0]?.description}</td>
            </tr>
        </table>
        <button type="button" onClick={e => {props.setTrigger(false);acceptit();}} className="btn btn-success mt-3">Accept Complaint</button>&emsp;
        <button type="button" onClick={e => {props.setTrigger(false);denyit();}} className="btn btn-danger mt-3">Deny Complaint</button>
        <button type="button" onClick={e => {props.setTrigger(false);}} className="btn btn-danger mt-3">Close</button>

            </div>
        );
    }


    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <br></br>
                    <center>
                    {loading ? loadedData() :
                    <ReactBootStrap.Spinner animation="border" />
                    }
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



export default SeeReportPopupPackageManager;