import React,{useState,useEffect} from "react";
import NavBar from "./NavBar";
import CourierInformation from "./CourierInformation";
import {Cookies, useCookies} from "react-cookie";

function ShipperCourier() {
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    var size, orders;
    let orderList =[];
    const [userData, setUserData] =useState([]);
    React.useEffect(() => {
        profilePage();
    },[]);
    async function profilePage(){
        const response = await fetch('http://localhost:3001/courierProfilePageOrders', {
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
    async function insertHoldout(pid){
        const body = {pid};
        const response = await fetch('http://localhost:3001/makeitholdout', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            if(data.success){
                alert("Customer Not Found");
                window.location="/CourierProfile";
            }
            else{
                alert("Operation cannot be done");
            }
        });
    }

    return (
        <div>
            <NavBar></NavBar>
            <br></br>
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
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Destination Branch Name</strong></td><br></br><br></br>
                    </tr>
                    {
                         userData.map((data,id) => {
                            //for all orders
                            return  <tr key={id}> 
                            <td  className="table-td">{data.pid}</td>
                            <td  className="table-td">{data.itemdescription}</td>
                            <td  className="table-td">{data.takeindvid}</td>
                            <td  className="table-td">{data.weight}</td>
                            <td  className="table-td">{data.volume}</td>
                            <td  className="table-td">{data.destinationbid}</td>
                            <td><button type="button" onClick={e => { insertHoldout(data.pid);}} className="btn btn-info">Customer Not Found</button></td>
                            </tr>
                    })
                }
                </table>
            </center>
            <table>
                <tr>
                    <td className="company-info"><CourierInformation/></td>
                </tr>
            </table>
        </div>
    );
}

export default ShipperCourier;