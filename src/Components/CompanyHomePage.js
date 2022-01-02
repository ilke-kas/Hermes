import React, {Component, useEffect, useState} from "react";
import Navbar from "./NavBar";
import SeeReportPopup from "./SeeReportPopup";
import {Cookies, useCookies} from "react-cookie";
import { render } from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

function CompanyHomePage() {
    const [popup, setPopup] = React.useState(false);
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    var size, orders;
    let orderList =[];
    const [userData, setUserData] =useState([]);
    const [selected, setSelected] = useState('');
    const [search, setSearch] = useState("");
    const [searchButton, setSearchButton] = useState(false);
    const [filterButton, setFilterButton] = useState(false);
    const [filterResult, setFilterResult] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [clickedRange, setClickedRange] = React.useState("");
    React.useEffect(() => {
        console.log(selected);
        homePage();
    },[selected]);
    async function sendSearch(e) {
        e.preventDefault();
        const body = {userid,search};
        //setLoading2(true);
        //setLoading(true);
        console.log(search);
       const response = await fetch('http://localhost:3001/searchCorporate', {
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
    async function homePage(){
        setFilterButton(false);
        setSearchButton(false);
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
    async function filterPrice(e){
        e.preventDefault();
        console.log("clickedRange Front" + clickedRange);
        const body = {userid, clickedRange};
        setFilterButton(false);
        const response = await fetch('http://localhost:3001/companyFilter', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            var orders4 = data.orders;
            console.log(orders4);
            setFilterResult(orders4);
            setFilterButton(true);
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
    function handleInputUser(e) {
        const buttonValue= e.target.value;
        console.log(buttonValue);
        setClickedRange(buttonValue);
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
                    <input className="form-control me-2" type="search"  onChange={e => {setSearch(e.target.value)} } placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success ml-1" onClick={sendSearch} type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <table>
                <tr>
            <td className="mt-7" ><label for="price">Price Range:</label> &emsp;</td>
            <td><div><button className="btn btn-light mt-3" data-toggle="dropdown">{clickedRange == [] ? <a>Range</a>: clickedRange }</button>&emsp;
                <ul class="dropdown-menu">
                <li><button class="unstyled-button" value="0-50" onClick={e =>handleInputUser(e,"value")}>0-50</button></li>
                <li><button class="unstyled-button" value="50-100" onClick={e =>handleInputUser(e,"value")}>50-100</button></li>
                <li><button class="unstyled-button" value="100-150" onClick={e =>handleInputUser(e,"value")}>100-150</button></li>
                <li><button class="unstyled-button" value="150-200" onClick={e =>handleInputUser(e,"value")}>150-200</button></li>
                <li><button class="unstyled-button" value="200-250" onClick={e =>handleInputUser(e,"value")}>200-250</button></li>
                <li><button class="unstyled-button" value="250-300" onClick={e =>handleInputUser(e,"value")}>250-300</button></li>
                <li><button class="unstyled-button" value="300-higher" onClick={e =>handleInputUser(e,"value")}>300-higher</button></li>
            </ul></div></td>
            <td><button  className="btn btn-secondary mt-3" onClick={filterPrice}>Filter</button></td>
            </tr>
            </table>
            <br></br>
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
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Price</strong></td>
                        <br></br><br></br>
                    </tr>
                    <>
                    { filterButton ?
                    filterResult.map((data,id) => {
                        console.log("filter result");
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
                      <td  className="table-td">{data.price}</td>
                      </tr>})

                    :(searchButton? 
                     searchResult.map((data,id) => {
                        console.log("search result");
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
                      <td  className="table-td">{data.price}</td>
                      </tr>})
                    :
                    (selected == "" ?
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
                        <td  className="table-td">{data.price}</td>
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
                        <td  className="table-td">{data.price}</td>
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
                        <td  className="table-td">{data.price}</td>
                        <td><button type="button" onClick={e => { setPopup(true);}} className="btn btn-info">See Report</button></td>
                        </tr>
                    
                    }
                    })
                    )
                    ))}
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