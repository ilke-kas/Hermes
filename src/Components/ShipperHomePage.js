import React,{useState,useEffect} from "react";

import NavBar from "./NavBar";
import {Cookies, useCookies} from "react-cookie";


function ShipperHomePage() {
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const [btobpackage, setBToBPackage] =useState([]);
    React.useEffect(() => {
        getBranchToBranch();
    },[]);
    async function getBranchToBranch(){
        const body ={userid};
        const response = await fetch('http://localhost:3001/getBranchToBranchShipper', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setBToBPackage(data.packages);
            console.log(btobpackage);
            console.log('here');
            });
    }
    async function clickDeny(value){
        const body ={userid,value};
        const response = await fetch('http://localhost:3001/denyShipper', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            if(data.success){
                alert("You denied the package");
                window.location="/Shipper";
            }
            else{
                alert("You cannot deny the package");
            }
            });

    }
    async function clickAccept(value){
        const body ={userid,value};
        const response = await fetch('http://localhost:3001/acceptShipper', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            if(data.success){
                alert("You accepted the package");
                window.location="/Shipper";
            }
            else{
                alert("You cannot accept the package");
            }
            });

    }

    return (
        <div>
            <NavBar></NavBar>
            <center>
                <h5 className="mt-4">Branch to Branch</h5>
                <hr/>
                <ul className="inlineUl">
                        {
                            btobpackage.map((data,id) =>{
                                if(data.sendercorporateid == null){
                                    console.log(id);
                                return   <span><li className="package-acceptance">
                                            <table className="mt-3">
                                             <tr>
                                                <td>Package ID:</td>
                                                <td>{data.pid}</td>
                                            </tr>
                                            <tr>
                                                <td>User ID:</td>
                                                <td>{data.senderindividualid}</td>
                                            </tr>
                                            <tr>
                                                <td>Address:</td>
                                                <td>{data.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Recipient ID:&emsp;&emsp;</td>
                                                <td>{data.takerid}</td>
                                            </tr>
                                            </table>
                                        <button type="button"  value={data.pid} onClick={e =>{clickAccept(e.target.value);}} className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                                        <button type="button" value={data.pid} onClick={e =>{clickDeny(e.target.value);}} className="btn btn-danger mt-3">Deny</button><br></br><br></br>
                                    </li><span></span><span></span> </span>

                                }
                                else if(data.senderindividualid == null){
                                    return <div className="package-acceptance">
                                        <p>
                                                 <table className="mt-3">
                                                    <tr>
                                                    <td>Package ID:</td>
                                                    <td>{data.pid}</td>
                                                </tr>
                                                <tr>
                                                    <td>User ID:</td>
                                                    <td>{data.sendercorporateid}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address:</td>
                                                    <td>{data.address}</td>
                                                </tr>
                                                <tr>
                                                    <td>Recipient ID:&emsp;&emsp;</td>
                                                    <td>{data.takerid}</td>
                                                </tr>
                                                </table>
                                        <button type="button"  value={data.pid} onClick={e =>{clickAccept(e.target.value);}} className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                                        <button type="button"  value={data.pid} onClick={e =>{clickDeny(e.target.value);}} className="btn btn-danger mt-3">Deny</button><br></br><br></br>
                                        </p>
                                    </div>
                                         
                                }

                            })
                        }
                        </ul>
                <br></br><br></br> <br></br>
            </center>
        </div>
    );
}

export default ShipperHomePage;