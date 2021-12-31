import React,{useState,useEffect} from "react";
import NavBar from "./NavBar";
import SeeReportPopup from "./SeeReportPopup";
import PackageManagerInfo from "./PackageManagerInfo";
import {Cookies, useCookies} from "react-cookie";
import {TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

function PackageManager() {
    const [popup, setPopup] = React.useState(false);
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    var size, orders;
    let orderList =[];
    const [userData, setUserData] =useState([]);
    const [userData2, setUserData2] =useState([]);
    const [selected, setSelected] = useState('');
    React.useEffect(() => {
        console.log(selected);
        profilePage1();
        profilePage2();
    },[selected]);
    async function profilePage1(){
        const response = await fetch('http://localhost:3001/packageManagerProfilePageAllOrders', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            size = data.size;
            orders = data.orders;
            console.log('here');
            console.log(size);
            console.log(orders);
            setUserData2(orders);
        });
    }
    async function profilePage2(){
        const response = await fetch('http://localhost:3001/packageManagerProfilePageOrders', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            size = data.size;
            orders = data.orders;
            console.log('here');
            console.log(size);
            console.log(orders);
            setUserData(orders);
        });
    }
    
    return (
        <div>
            <NavBar></NavBar>
            <br></br>
            <center>
            <RadioGroup className="mt-4 d-flex justify-content-center" row aria-label="employeekind" name="row-radio-buttons-group" value={selected} onChange={event => {setSelected(event.target.value)} }> 
                    <FormControlLabel value="malformed" control={<Radio />} label="Malformed Packages" />
                    <FormControlLabel value="holdout" control={<Radio />} label="Holdout Packages" />
                    <FormControlLabel value="lost" control={<Radio />} label="Lost Packages" />
                    <FormControlLabel value="delivered" control={<Radio />} label="Securely Delivered Packages" />
                    <FormControlLabel value="" control={<Radio />} label="All" />
                </RadioGroup>
            </center>
            <nav className="navbar navbar-light mt-3">
                <div className="mx-auto" style={{width:"500px"}}> 
                    <form className="d-flex">
                    <input className="form-control me-2"type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success ml-1" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <br></br>
            <center>
                <table>
                {selected == "" ?
                <tr>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Package ID</strong></td>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Package Description</strong></td>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Sender ID</strong></td>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Recipient ID</strong></td>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Departure Branch Name</strong></td><br></br><br></br>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Destination Branch Name</strong></td>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Package Status</strong></td>
                 </tr> 
                :
                <tr>
                <td style={{textDecoration:"underline"}} className="table-td"><strong>Package ID</strong></td>
                <td style={{textDecoration:"underline"}} className="table-td"><strong>Package Description</strong></td>
                <td style={{textDecoration:"underline"}} className="table-td"><strong>Sender ID</strong></td>
                <td style={{textDecoration:"underline"}} className="table-td"><strong>Recipient ID</strong></td>
                <td style={{textDecoration:"underline"}} className="table-td"><strong>Branch Name</strong></td><br></br><br></br>
                </tr>      
                }
                {selected == "" ?
                  userData2.map((data,id) => {
                    //for all orders
                    return  <tr key={id}> 
                    <td  className="table-td">{data.pid}</td>
                    <td  className="table-td">{data.itemdescription}</td>
                    <td  className="table-td">{data.senderindvid}</td>
                    <td  className="table-td">{data.takeindvid}</td>
                    <td  className="table-td">{data.sendbid}</td>
                    <td  className="table-td">{data.destinationbid}</td>
                    <td  className="table-td">{data.packagestatus}</td>
                    </tr>
                
                })
                :(selected== "delivered" ? 
                //for delivered orders
                userData.map((data,id) => {
                    if(data.packagestatus == "Delivered"){

                    return  <tr key={id}> 
                    <td  className="table-td">{data.pid}</td>
                    <td  className="table-td">{data.itemdescription}</td>
                    <td  className="table-td">{data.senderindvid}</td>
                    <td  className="table-td">{data.takeindvid}</td>
                    <td  className="table-td">{data.destinationbid}</td>
                    </tr>
                }
            }) : (selected== "lost" ? 
            //for delivered orders
            userData.map((data,id) => {
                if(data.packagestatus == "Lost"){

                return  <tr key={id}> 
                <td  className="table-td">{data.pid}</td>
                <td  className="table-td">{data.itemdescription}</td>
                <td  className="table-td">{data.senderindvid}</td>
                <td  className="table-td">{data.takeindvid}</td>
                <td  className="table-td">{data.destinationbid}</td>
                <td><button type="button" onClick={e => { setPopup(true);}} className="btn btn-info">See Report</button></td>
                </tr>
            }
        }) : (selected== "holdout" ? 
        //for delivered orders
        userData.map((data,id) => {
            if(data.packagestatus == "Holdout"){

            return  <tr key={id}> 
            <td  className="table-td">{data.pid}</td>
            <td  className="table-td">{data.itemdescription}</td>
            <td  className="table-td">{data.senderindvid}</td>
            <td  className="table-td">{data.takeindvid}</td>
            <td  className="table-td">{data.destinationbid}</td>
            </tr>
        }
    }) :  (selected== "malformed" ? 
    //for delivered orders
    userData.map((data,id) => {
        if(data.packagestatus == "Malformed"){

        return  <tr key={id}> 
        <td  className="table-td">{data.pid}</td>
        <td  className="table-td">{data.itemdescription}</td>
        <td  className="table-td">{data.senderindvid}</td>
        <td  className="table-td">{data.takeindvid}</td>
        <td  className="table-td">{data.destinationbid}</td>
        <td><button type="button" onClick={e => { setPopup(true);}} className="btn btn-info">See Report</button></td>
        </tr>
        }
    }) : <a></a> ) ) ) )
}                
                </table>
            </center>
            <br></br><br></br>
            <center>
            <table>
                <tr>
                    <td className="package-manager-info"><PackageManagerInfo/></td>
                </tr>
            </table>
            </center>
            <SeeReportPopup trigger={popup} setTrigger={setPopup}></SeeReportPopup>
        </div>
    );  
}

export default PackageManager;