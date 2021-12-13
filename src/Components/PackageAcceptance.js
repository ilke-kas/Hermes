import React ,{useState, useEffect} from "react";
import {Cookies, useCookies} from "react-cookie";


function PackageAcceptance(){
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const [ctobpackage, setCToBPackage] =useState([]);
    const [clickedButton, setClickedButton] = React.useState([]);
    const [infos, setInfos] = React.useState([]);
    React.useEffect(() => {
        getCustomerToBranch();
    },[]);

    async function getCustomerToBranch(){
        const body ={userid};
        const response = await fetch('http://localhost:3001/getCustomerToBranchPackagesCourier', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setCToBPackage(data.orders);
            console.log(ctobpackage);
            console.log('here');
            });
    }
    async function clickDeny(value){
        const body ={userid,value};
        const response = await fetch('http://localhost:3001/findAnotherCourier', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            if(data.success){
                alert("You denied the package");
                window.location="/CourierHome";
            }
            else{
                alert("You cannot deny the package");
            }
            });

    }
    async function clickAccept(){

    }
    return (
        <div>
            <center>
            <h5 className="mt-4">Customer to Branch</h5>
                    <hr/>
                    <ul className="inlineUl">
                        {
                            ctobpackage.map((data,id) =>{
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
                <h5 className="header-branch-customer">Branch to Customer </h5>
                <hr/>
                <div className="package-acceptance">
                    <table className="mt-3">
                        <tr>
                            <td>Package ID:</td>
                            <td>177</td>
                        </tr>
                        <tr>
                            <td>User ID:</td>
                            <td>halime.sucu</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>Kızılay/ANKARA</td>
                        </tr>
                        <tr>
                            <td>Recipient ID:&emsp;&emsp;</td>
                            <td>ali.okcu</td>
                        </tr>
                        
                    </table>
                    <button type="button" className="btn btn-success mt-3">Accept</button><br></br><br></br>
            
                </div>
                <div className="package-acceptance">
                    <table className="mt-3">
                        <tr>
                            <td>Package ID:</td>
                            <td>206</td>
                        </tr>
                        <tr>
                            <td>User ID:</td>
                            <td>ahmet.celebi</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>Bilkent/ANKARA</td>
                        </tr>
                        <tr>
                            <td>Recipient ID:&emsp;&emsp;</td>
                            <td>ahmet.kaya</td>
                        </tr>
                        
                    </table>
                    <button type="button" className="btn btn-success mt-3">Accept</button><br></br><br></br>
                </div>
            </center>
        </div>
    );
}

export default PackageAcceptance;