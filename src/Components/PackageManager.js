import React,{useState,useEffect} from "react";
import NavBar from "./NavBar";
import SeeReportPopupPackageManager from "./SeeReportPopupPackageManager";
import PackageManagerInfo from "./PackageManagerInfo";
import {Cookies, useCookies} from "react-cookie";
import {TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import * as ReactBootStrap from "react-bootstrap";

function PackageManager() {
    const [popup, setPopup] = useState(false);
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const [loading, setLoading] = useState(false);  
    const [loading2, setLoading2] = useState(false);
    const [search, setSearch] = useState("");
    const [searchButton, setSearchButton] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const body = {userid};
    var size, orders;
    let orderList =[];
    const [userData, setUserData] =useState([]);
    const [userData2, setUserData2] =useState([]);
    const [selected, setSelected] = useState('all');
    
    useEffect(() => {
        console.log(selected);
       if (selected == 'all'){
            console.log('in all');
            profilePage1();
        }
        else if (selected == 'lost' || selected == 'malformed' || selected == 'holdout' || selected == 'delivered'){
            console.log('in others');
            setLoading2(false);
            profilePage2();
        }
    },[selected]);
    async function sendSearch(e) {
        e.preventDefault();
        const body = {userid,search};
        //setLoading2(true);
        //setLoading(true);
        console.log(search);
        console.log(selected);
        console.log(loading);
        console.log(loading2);
       const response = await fetch('http://localhost:3001/searchPackageManager', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            }).then(x => x.json())
            .then(data => {
                var orders3 = data.orders;
                console.log('here');
                console.log(orders3);
                setSearchResult(orders3);
                setSearchButton(true);
            });
    }
    async function profilePage1(){
        setSearchButton(false);
        setLoading2(false);
        const response =  fetch('http://localhost:3001/packageManagerProfilePageAllOrders', {
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
        setLoading(true);
    }
    async function profilePage2(){
        setLoading(false);
        setSearchButton(false);
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
        setLoading2(true);
    }
   
    return (

        <div>
            <NavBar></NavBar>
            <br></br>
             {loading || loading2 ? 
            <div><center>
            <RadioGroup className="mt-4 d-flex justify-content-center" row aria-label="employeekind" name="row-radio-buttons-group" value={selected} onChange={event => {setSelected(event.target.value)} }> 
                    <FormControlLabel value="malformed" control={<Radio />} label="Malformed Packages" />
                    <FormControlLabel value="holdout" control={<Radio />} label="Holdout Packages" />
                    <FormControlLabel value="lost" control={<Radio />} label="Lost Packages" />
                    <FormControlLabel value="delivered" control={<Radio />} label="Securely Delivered Packages" />
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                </RadioGroup>
            </center>
            <nav className="navbar navbar-light mt-3">
                <div className="mx-auto" style={{width:"500px"}}> 
                    <form className="d-flex">
                        <input className="form-control me-2"type="search" onChange={e => {setSearch(e.target.value)} } placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success ml-1" onClick={sendSearch} type="button">Search</button>
                    </form>
                </div>
            </nav>
            <br></br>
            <center>
                <table>
                {selected == "all" || searchButton ?
                <tr>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Package ID</strong></td>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Package Description</strong></td>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Sender ID</strong></td>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Recipient ID</strong></td>
                 <td style={{textDecoration:"underline"}} className="table-td"><strong>Departure Branch Name</strong></td>
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
                {searchButton ?  
                     searchResult.map((data,id) => {
                        console.log("search result");
                      //for all orders
                      return  <tr key={id}> 
                      <td  className="table-td">{data.pid}</td>
                      <td  className="table-td">{data.itemdescription}</td>
                      <td  className="table-td">{data.senderindvid}</td>
                      <td  className="table-td">{data.takeindvid}</td>
                      <td  className="table-td">{data.sendbid}</td>
                      <td  className="table-td">{data.destinationbid}</td>
                      <td  className="table-td">{data.packagestatus}</td>
                      </tr>}) || []
                :(selected == "all" ?
                  userData2.map((data,id) => {
                      console.log("All");
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
                userData.map((data,id) => 
                {
                    console.log("Delivered");
                    console.log("Data Package Status: " + data.packagestatus);
                    if(data.packagestatus == "Delivered"){
                        console.log("Girdi");
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
                console.log("Lost");
                if(data.packagestatus == "Lost"){

                return  <tr key={id}> 
                <td  className="table-td">{data.pid}</td>
                <td  className="table-td">{data.itemdescription}</td>
                <td  className="table-td">{data.senderindvid}</td>
                <td  className="table-td">{data.takeindvid}</td>
                <td  className="table-td">{data.destinationbid}</td>
                </tr>
            }
        }) : (selected== "holdout" ? 
        //for delivered orders
        userData.map((data,id) => {
            console.log("Holdout");
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
        console.log("Malformed");
        if(data.packagestatus == "Malformed"){

        return  <tr key={id}> 
        <td  className="table-td">{data.pid}</td>
        <td  className="table-td">{data.itemdescription}</td>
        <td  className="table-td">{data.senderindvid}</td>
        <td  className="table-td">{data.takeindvid}</td>
        <td  className="table-td">{data.destinationbid}</td>
        </tr>
        }
    }) : <a></a> ) ) ) )
                )}                
                </table>
            </center>
            <br></br><br></br>
            <center>
            <table>
                <tr>
                    <td className="package-manager-info"><PackageManagerInfo/></td>
                </tr>
            </table>
           
            </center></div> : <center><ReactBootStrap.Spinner style={{width: "75px", height:"75px"}} variant="primary" className="loading-position" animation="border" /></center> }
        </div>

    );  
}

export default PackageManager;