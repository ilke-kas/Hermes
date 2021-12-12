import React,{useState,useEffect} from "react";
import NavBar from "./NavBar";
import { Cookies } from "react-cookie";
import { useLocation } from 'react-router-dom'

function OpenForm(props) {
    debugger;
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    const [userData, setUserData] =useState([]);
    const [branchData, setBranchData] =useState([]);
    const [description, setDescription] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [volume,setVolume] = React.useState("");
    const [clickedUser, setClickedUser] = React.useState("");
    const [clickedSenderBranch, setClickedSenderBranch] = React.useState("");
    const [clickedDestinationBranch, setClickedDestinationBranch] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const [header,setHeader] = React.useState(props.location.state);

    //send inpouts to back 
    async function calculatePrice(){
        const body2 ={weight,volume};
        const response = await fetch('http://localhost:3001/calculatePrice', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body2)
        }).then(x => x.json())
        .then(data => {
            setPrice(data.price);
            console.log(price);
        });

    }
    async function submitPackage(){
        const body2 ={userid, description,weight,volume,clickedUser,clickedSenderBranch,clickedDestinationBranch};
        const response = await fetch('http://localhost:3001/submitPackage', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body2)
        }).then(x => x.json())
        .then(data => {
            setSuccess(data.success);
            console.log("success" + success);
            if(success){
                alert("You Successufully submit your package");
            }
            else{
                alert("You could not submit your package");
            }
         });
        }

    async function allUsers(){
            //list undelievere ones
            const response = await fetch('http://localhost:3001/getAllUsers', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setUserData(data.users);
            console.log(data.users);
            });
        }
        function handleInputUser(e) {
            const buttonValue= e.target.value;
            console.log(buttonValue);
            setClickedUser(buttonValue);
        }
        function handleInputSenderBranch(e) {
            const buttonValue= e.target.value;
            console.log(buttonValue);
            setClickedSenderBranch(buttonValue);
        }
        function handleInputDestinationBranch(e) {
            const buttonValue= e.target.value;
            console.log(buttonValue);
            setClickedDestinationBranch(buttonValue);
        }
        async function allBranch(){
            //list undelievere ones
            const response = await fetch('http://localhost:3001/getAllBranch', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setBranchData(data.branches);
            console.log(data.branches);
            });
        }


    return ( 
    <div>
        <NavBar></NavBar>
        <center><h2 className="mt-5">{header}</h2></center>
        <center>
        <div className="option-form">
        <table>
            <tr>
                <td>
                    <label>Describe the item:</label>
                </td>
                <td>
                    <textarea type="text" onChange={e => setDescription(e.target.value)}></textarea>
                </td>   
            </tr>
            <tr>
                <td>
                    <label>Enter the weight of the item:&emsp;</label>
                </td>
                <td>
                    <input type="text" onChange={e => setWeight(e.target.value)}></input>
                </td>   
            </tr>
            <tr>
                <td>
                    <label>Enter the volume of the item:</label>
                </td>
                <td>
                    <input type="text" onChange={e => setVolume(e.target.value)}></input>
                </td> 
                <td>
                    <label>m³</label>
                </td>  
            </tr>
            <tr>
                <td>
                    <label>Select recipient of the item:&emsp;</label>
                </td>
                <td>
                    <div class="dropdown">
                        <button  onClick = {allUsers} class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">{
                            clickedUser == [] ? <a>Recipient ID</a> : <a>{clickedUser}</a>
                        }
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            {
                                userData.map((data,id) =>{
                                    return <li><button class="unstyled-button" value={data.userid} onClick={e =>handleInputUser(e,"value")} >{data.userid}</button></li>
                                })
                                
                            }
                        </ul>
                    </div>
                </td>   
            </tr>
            <tr>
                <td>
                    <label className="mt-3">Select Sender branch:&emsp;</label>
                </td>
                <td>
                    <div onClick = {allBranch} class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                        {
                            clickedSenderBranch == [] ? <a>Branch Name</a> : <a>{clickedSenderBranch}</a>
                        }<span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                        {
                                branchData.map((data,id) =>{
                                    return <li><button class="unstyled-button" value={data.branchname} onClick={e =>handleInputSenderBranch(e,"value")}>{data.branchname}</button></li>
                                })
                                
                            }
                        </ul>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <label className="mt-3">Select Destination branch:&emsp;</label>
                </td>
                <td>
                    <div class="dropdown">
                        <button onClick = {allBranch} class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                        {
                            clickedDestinationBranch == [] ? <a>Branch Name</a> : <a>{clickedDestinationBranch}</a>
                        }
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                        {
                                branchData.map((data,id) =>{
                                    return <li><button  class="unstyled-button" value={data.branchname} onClick={e =>handleInputDestinationBranch(e,"value")}>{data.branchname}</button></li>
                                })
                                
                            }
                        </ul>
                    </div>
                </td>
            </tr>
        </table>
        <hr/>
        <button className="mt-3 btn btn-success" type="button" onClick={calculatePrice}>Calculate The Price</button>
        <br></br>
        <strong>{price == [] ? <a></a> : <a>Calculated Price:{price}</a>}</strong><br></br>
        <hr/>
        <button className="mt-3 btn btn-success" type="button" onClick={submitPackage}>Submit</button>
            </div>
        </center>
    </div>
    )
};
export default OpenForm;