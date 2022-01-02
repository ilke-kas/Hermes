import React, {Component, useEffect, useState} from "react";
import Navbar from "./NavBar";
import SeeReportPopup from "./SeeReportPopup";
import {Cookies, useCookies} from "react-cookie";
import {RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

function CompanyHomePage() {
    const [popup, setPopup] = React.useState(false);
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    var size, orders;
    let orderList =[];
    const [userData, setUserData] =useState([]);
    const [selected, setSelected] = useState('');
    React.useEffect(() => {
        console.log(selected);
        homePage();
    },[selected]);
    async function homePage(){
        const response = await fetch('http://localhost:3001/companyHomePage', {
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
            radiobuttons(selected);
        });
    }
    function directSendPackage(){
        window.location="/Customer";
    }
    function radiobuttons(selected){
        if(selected=="undelivered"){
            //list undelievere ones
            console.log("undelivered");
        }
        else if(selected =="delivered"){
            //list delivered ones
            console.log("delivered");
        }
        else if(selected == ""){
            //list all
            setUserData(orders);
        }
    }
    return (
        <div>
            <Navbar></Navbar><br></br>
            <center>
                <RadioGroup className="mt-4 d-flex justify-content-center" row aria-label="employeekind" name="row-radio-buttons-group" value={selected} onChange={event => {setSelected(event.target.value)} }> 
                    <FormControlLabel value="undelivered" control={<Radio />} label="Undelivered" />
                    <FormControlLabel value="delivered" control={<Radio />} label="Delivered" />
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
                    <tr>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Package ID</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Package Description</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Recipient ID</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Weight</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Volume</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Destination Branch Name</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Sent Branch Name</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Package Status</strong></td>
                        <br></br><br></br>
                    </tr>
                    <>
                    {selected == "" ?
                    userData.map((data,id) => {
                        //for all orders
                        return  <tr key={id}> 
                        <td  className="table-td">{data.pid}</td>
                        <td  className="table-td">{data.itemdescription}</td>
                        <td  className="table-td">{data.takeindvid}</td>
                        <td  className="table-td">{data.weight}</td>
                        <td  className="table-td">{data.volume}</td>
                        <td  className="table-td">{data.destinationbid}</td>
                        <td  className="table-td">{data.sendbid}</td>
                        <td  className="table-td">{data.packagestatus}</td>
                        <td><button type="button" onClick={e => { setPopup(true);}} className="btn btn-info">See Report</button></td>
                        </tr>
                    
                    }) : (selected== "delivered" ? 
                    //for delivered orders
                    userData.map((data,id) => {
                        if(data.packagestatus == "Delivered"){

                        return  <tr key={id}> 
                        <td  className="table-td">{data.pid}</td>
                        <td  className="table-td">{data.itemdescription}</td>
                        <td  className="table-td">{data.takeindvid}</td>
                        <td  className="table-td">{data.weight}</td>
                        <td  className="table-td">{data.volume}</td>
                        <td  className="table-td">{data.destinationbid}</td>
                        <td  className="table-td">{data.sendbid}</td>
                        <td  className="table-td">{data.packagestatus}</td>
                        <td><button type="button" onClick={e => { setPopup(true);}} className="btn btn-info">See Report</button></td>
                        </tr>
                    }
                    }) :
                    //for undelivered orders
                    userData.map((data,id) => {
                        if(data.packagestatus != "Delivered"){
                        return  <tr key={id}> 
                        <td  className="table-td">{data.pid}</td>
                        <td  className="table-td">{data.itemdescription}</td>
                        <td  className="table-td">{data.takeindvid}</td>
                        <td  className="table-td">{data.weight}</td>
                        <td  className="table-td">{data.volume}</td>
                        <td  className="table-td">{data.destinationbid}</td>
                        <td  className="table-td">{data.sendbid}</td>
                        <td  className="table-td">{data.packagestatus}</td>
                        <td><button type="button" onClick={e => { setPopup(true);}} className="btn btn-info">See Report</button></td>
                        </tr>
                    
                    }
                    })
                    )
                }
                    </>
                </table>
                <div>
                    <br></br><br></br><br></br>
                <button onClick={directSendPackage} className="btn btn-outline-success ml-1" type="submit">Send Package</button>
                </div>
            </center>
            <SeeReportPopup trigger={popup} setTrigger={setPopup}></SeeReportPopup>
        </div>
    );
}
export default CompanyHomePage;