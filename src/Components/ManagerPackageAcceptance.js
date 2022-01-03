import React ,{useState, useEffect} from "react";
import {Cookies, useCookies} from "react-cookie";
import * as ReactBootStrap from "react-bootstrap"
import SeeReportPopupPackageManager from "./SeeReportPopupPackageManager";

function ManagerPackageAcceptance() {
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const [shipperPart, setShipperPart] =useState([]);
    const [shipperData, setShipperData] =useState([]);
    const [clickedShipper, setClickedShipper] = React.useState("");
    const [buttonId, setButtonId] = React.useState("");
    const [buttonId2, setButtonId2] = React.useState("");
    const [trigger, setTrigger] = React.useState("");
    const [courierPart, setCourierPart] =useState([]);
    const [courierData, setCourierData] =useState([]);
    const [clickedCourier, setClickedCourier] = React.useState("");
    const [loading, setLoading] = React.useState(false);   
    const [loading2, setLoading2] = React.useState(false);    
    const [loading3, setLoading3] = React.useState(false);     
    const [num, setNum] = React.useState(0);
    const [reportSize,setReportSize]=useState("");
    const [popid,setPopId]=useState("");
    const [popup, setPopup] = React.useState(false);
    const [reports,setReports] = useState([]);

    React.useEffect(() => {
        getShipperPartPackageManager();
        getCourierPartPackageManager();
        getAllReports();
    },[]);

    async function getAllReports() {
        const body = {userid};
        const response = await fetch('http://localhost:3001/getAllReportsInBranch', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setReports(data.reports);
            console.log(reports);
            setReportSize(data.size);
            console.log(data);
        });    
        setLoading2(true);
    }

    async function clickAccept(value){
        const body ={userid,value,clickedShipper};
        console.log(body);
        const response = await fetch('http://localhost:3001/assignShipper', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            if(data.success){
                alert("You accepted the package");
                window.location="/PackageManagerHomePage";
            }
            else{
                alert("You cannot accept the package");
            }
            });

    }
    async function clickAcceptCourier(value){
        const body ={userid,value,clickedCourier};
        console.log(body);
        const response = await fetch('http://localhost:3001/assignCourier', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            if(data.success){
                alert("You accepted the package");
                window.location="/PackageManagerHomePage";
            }
            else{
                alert("You cannot accept the package");
            }
            });

    }


    async function getShipperPartPackageManager(){
        const body ={userid};
        const response = await fetch('http://localhost:3001/getShipperPartPackageManager', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setShipperPart(data.orders);
            console.log(shipperPart);
            console.log('here');
            });
        setLoading(true);
    } 

    async function getCourierPartPackageManager(){
        const body ={userid};
        const response = await fetch('http://localhost:3001/getCourierPartPackageManager', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setCourierPart(data.orders);
            console.log(courierPart);
            console.log('here');
            });
        setLoading3(true);
    } 

    function handleInputUser(e) {
        const buttonValue= e.target.value;
        console.log(buttonValue);
        setClickedShipper(buttonValue);
    }
    function handleInputCourier(e) {
        const buttonValue= e.target.value;
        console.log(buttonValue);
        setClickedCourier(buttonValue);
    }

    async function allShippers(value){ //there is something wring in here but cannot resolve
        //list all shippers in the route of the package
        const body ={userid,value};
        console.log(body);
        const response = await fetch('http://localhost:3001/getAllShippers', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setShipperData(data.shippers);
            console.log(data.shippers);
            });
        }
        
    async function allCouriers(value){ 
        const body = {userid,value};
        console.log(body);
        const response = await fetch('http://localhost:3001/getAllCourier', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setCourierData(data.couriers);
            console.log(data.couriers);
        });
    }

    async function clickDeny(value){
        const body = {userid,value};
        const response = await fetch('http://localhost:3001/denyAssigningShipper', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            if(data.success){
                alert("You denied the package");
                window.location="/PackageManagerHomePage";
            }
            else{
                alert("You cannot deny the package");
            }
            });

    }

    return (
        <div>
            <br></br>
            <div>
                {loading ?
                <div>
                    <ul>
                        <div>
                            <table>
                                <tr>
                                    {reports.map((x) => {
                                        return (
                                            <td>
                                                <div className="manager-packages3">
                                                    <table>
                                                        <tr>
                                                            <td style={{width: "60px"}}>{x.reportid}</td>
                                                            <td style={{width: "100px"}}>{x.userreport}</td>
                                                            <td style={{width: "130px"}}><button type="button" onClick={e => { setPopup(true);setPopId(x.pid);}} className="btn btn-info">See Report</button></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            </table>
                        </div>
                    </ul>
                    <ul>
                        <div>
                            <table>
                                <tr>
                                    {shipperPart.map((data,id, num) => {
                                        if( data.sendcorporateid == null && (data.packagestatus == 'Submitted to Branch' || data.packagestatus == 'Courier to Branch') ) {
                                            return (
                                                <td>
                                                    <div className="manager-packages">
                                                        <center><h5 className="mt-2">Assign Shipper</h5></center>
                                                        <div id="table-wrapper3">
                                                            <div id="table-scroll3">
                                                                <table className="mt-3">
                                                                    <tr className="table-tr">
                                                                        <td>Package ID:</td>
                                                                        <td className="table-td">{data.pid}</td>
                                                                    </tr>
                                                                    <tr className="table-tr">
                                                                        <td>User ID:</td>
                                                                        <td className="table-td">{data.senderindividualid}</td>
                                                                    </tr>
                                                                    <tr className="table-tr">
                                                                        <td>Recipient Address:</td>
                                                                        <td className="table-td">{data.address}</td>
                                                                    </tr>
                                                                    <tr className="table-tr">
                                                                        <td>Recipient ID:&emsp;&emsp;</td>
                                                                        <td className="table-td">{data.takerid}</td>
                                                                    </tr>   
                                                                    <tr className="table-tr">
                                                                        <td>Select Shipper:&emsp;</td>
                                                                        <td className="table-td">
                                                                            <div>   
                                                                                <button id ={id} onClick={e =>{allShippers(data.destinationbranchid);setButtonId(data.pid);}} className="btn btn-success mt-3"  data-toggle="dropdown">
                                                                                    {clickedShipper == [] ? <a>Shipper ID</a> : ( buttonId == data.pid ? <a>{clickedShipper}</a> : <a>Shipper ID</a>  )}
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    {shipperData.map((data,id) => {return  <li><button id={id+"courier1"} class="unstyled-button" value={data.shipperid} onClick={e =>handleInputUser(e,"value")} >{data.shipperid}</button></li>})}
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <center>
                                                            <button type="button" value={data.pid} onClick={e =>{clickAccept(e.target.value);}} className="btn btn-success mt-3">Accept</button>
                                                            <button type="button" value={data.pid} onClick={e =>{clickDeny(e.target.value);}}  className="btn btn-danger mt-3">Deny</button>
                                                        </center>
                                                    </div>
                                                </td>
                                            );
                                        }
                                        else if (data.senderindividualid == null && (data.packagestatus == 'Submitted to Branch' || data.packagestatus == 'Courier to Branch')) {
                                            return (
                                                <td>
                                                    <div>
                                                        <table>
                                                            <tr>
                                                                <td>Package ID:</td>
                                                                <td>{data.pid}</td> 
                                                            </tr>
                                                            <tr>
                                                                <td>User ID:</td>
                                                                <td>{data.sendercorporateid}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Recipient Address:</td>
                                                                <td>{data.address}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Recipient ID:&emsp;&emsp;</td>
                                                                <td>{data.takerid}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Select Shipper:&emsp;</td>
                                                                <td>
                                                                    <div class="dropdown">
                                                                        <button id ={id} value={data.destinationbranchid} onClick={e =>{allShippers(e.target.value);}} class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                                                                            {clickedShipper == [] ? <a>Shipper ID</a> : <a>{clickedShipper}</a>}   
                                                                            <span class="caret"></span>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <button type="button" value={data.pid} onClick={e =>{clickAccept(e.target.value);}}  className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                                                        <button type="button" value={data.pid} onClick={e =>{clickDeny(e.target.value);}}  className="btn btn-danger mt-3">Deny</button><br></br><br></br>
                                                    </div>
                                                </td>
                                            );
                                        }})
                                    }
                                </tr>
                            </table>
                        </div> 
                    </ul>
                    <ul>
                        <div>
                            <table>
                                <tr>
                                    {courierPart.map((data2,id) => {
                                        if (data2.sendcorporateid == null) {
                                            return (
                                                <td>
                                                    <div className="manager-packages">
                                                        <center><h5 className="mt-2">Assign Courier</h5></center>
                                                        <div id="table-wrapper3">
                                                            <div id="table-scroll3">
                                                                <table className="mt-3">
                                                                    <tr className="table-tr">
                                                                        <td>Package ID:</td>
                                                                        <td >{data2.pid}</td>
                                                                    </tr>
                                                                    <tr className="table-tr">
                                                                        <td>User ID:</td>
                                                                        <td className="table-td">{data2.senderindividualid}</td>
                                                                    </tr>
                                                                    <tr className="table-tr">
                                                                        <td>Recipient Address:</td>
                                                                        <td className="table-td">{data2.address}</td>
                                                                    </tr>
                                                                    <tr className="table-tr">
                                                                        <td>Recipient ID:&emsp;&emsp;</td>
                                                                        <td className="table-td">{data2.takerid}</td>
                                                                    </tr>
                                                                    <tr className="table-tr">
                                                                        <td>Select Courier:&emsp;</td>
                                                                        <td className="table-td">
                                                                            <div>
                                                                                <button type="button" id ={id} onClick={e =>{allCouriers(data2.destinationbranchid);console.log(data2.destinationbranchid);setButtonId2(data2.pid);}} className="btn btn-success mt-3"  data-toggle="dropdown">
                                                                                    {clickedCourier == [] ? <a>Courier ID</a> :  ( buttonId2 == data2.pid ? <a>{clickedCourier}</a> : <a>Courier ID</a>  )}
                                                                                    <span class="caret"></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    {courierData.map((data3,id) => {
                                                                                        return  <li><button id={id} class="unstyled-button" value={data3.courierid} onClick={e =>handleInputCourier(e,"value")} >{data3.courierid}</button></li>
                                                                                    })}
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <center><button type="button" value={data2.pid} onClick={e =>{clickAcceptCourier(e.target.value);}} className="btn btn-success mt-3">Accept</button></center>
                                                    </div>
                                                </td>
                                            );
                                        }
                                        else if (data2.senderindividualid == null) {
                                            return (
                                                <td>
                                                    <div>
                                                        <table>
                                                            <tr>
                                                                <td>Package ID:</td>
                                                                <td>{data2.pid}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>User ID:</td>
                                                                <td>{data2.sendercorporateid}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Recipient Address:</td>
                                                                <td>{data2.address}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Recipient ID:&emsp;&emsp;</td>
                                                                <td>{data2.takerid}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Select Courier:&emsp;</td>
                                                                <td>
                                                                    <div class="dropdown">
                                                                        <button id ={id} value={data2.destinationbranchid} onClick={e =>{allCouriers(e.target.value);}} class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                                                                            {clickedCourier == [] ? <a>Courier ID</a> : <a>{clickedCourier}</a>}
                                                                            <span class="caret"></span>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <button type="button" value={data2.pid} onClick={e =>{clickAcceptCourier(e.target.value);}}  className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                                                    </div>
                                                </td>
                                            );
                                        }})
                                    }
                                </tr>
                            </table>
                        </div>
                    </ul>
                </div>
                :  <ReactBootStrap.Spinner style={{width: "75px", height:"75px"}} variant="primary" className="loading-position" animation="border" />
            }
            <SeeReportPopupPackageManager trigger={popup} setTrigger={setPopup} id={popid}></SeeReportPopupPackageManager>
            </div>
        </div>
    );
}

export default ManagerPackageAcceptance;