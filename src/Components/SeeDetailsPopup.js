import React from "react";
import { Cookies } from "react-cookie";
import * as ReactBootStrap from "react-bootstrap"

function SeeDetailsPopup(props) {
    console.log(props);
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const packageid = props.id;
    const [userData, setUserData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);    

    React.useEffect(() => {
        if(props.trigger){
        console.log("popup is opened");
        packageInfo();
        }
        else{
            setUserData([]);
        }
    },[props.trigger]);
    async function packageInfo() {
        const body = {userid,packageid};
        const response = await fetch('http://localhost:3001/SeeDetails', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setUserData(data);
            console.log(data);
        });
        setLoading(true);
    }

    function loadedData() {
        return (
            <div>
                <table>
                    <tr>
                        <td>Description:</td>
                        <td>{userData.description}</td>   
                    </tr>
                    <tr>
                        <td>Package ID:</td>
                        <td>{userData.packageid}</td>
                    </tr>
                    <tr>
                        <td>Weight:</td>
                        <td>{userData.weight}</td>
                    </tr>
                    <tr>
                        <td>Volume:</td>
                        <td>{userData.volume}</td>
                    </tr>
                    <tr>
                        <td>Recipient ID:</td>
                        <td>{userData.recipient}</td>
                    </tr>
                    <tr>
                        <td>Sender Branch Name:</td>
                        <td>{userData.senderBranchName}</td>
                    </tr>
                    <tr>
                        <td>Destination Branch Name:</td>
                        <td>{userData.destinationBranchName}</td>
                    </tr>
                    <tr>
                        <td>Package Status: </td>
                        <td>{userData.packagestatus}</td>
                    </tr>
                </table>
                <button type="button" onClick={e => {props.setTrigger(false); setLoading(false)}} className="btn btn-danger mt-3">Close</button>
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

export default SeeDetailsPopup;