import React from "react";
import { Cookies } from "react-cookie";
import * as ReactBootStrap from "react-bootstrap"

function SeeReportPopup(props) {
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
        const body = {userid,packageid}

        const response = await fetch('http://localhost:3001/SeeReport', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setUserData(data.ya);
               
        });
        setLoading(true);
    }

    function loadedData() {
        return (

            <div>
                <table>
            <tr>
                <td><strong>Type:</strong></td>
                <td>{userData?.packageStatus}</td>   
            </tr>
            <tr>
                <td><strong>Weight:</strong></td>
                <td>{userData.weight}kg</td>
            </tr>
            <tr>
                <td><strong>Volume:</strong></td>
                <td>{userData.volume}m³</td>
            </tr>
            <tr>
                <td><strong>Recipient ID:</strong></td>
                <td>{userData.receptient}</td>
            </tr>
            <tr>
                <td><strong>Branch Name:</strong></td>
                <td>{userData.branchname}</td>
            </tr>
            <tr>
                <td><strong>Employee Name:</strong></td>
                <td>{userData.branchmanager}</td>
            </tr>
            <tr>
                <td><strong>Description:</strong></td>
                <td>{userData.description}</td>
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
            
            {props.trigger === true ? insidePopup() : console.log("girmedi")}
        </div>
    );
}

export default SeeReportPopup;
