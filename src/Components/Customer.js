import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./NavBar";
import CourierLogo from '../img/courier.png';
import InPersonLogo from '../img/inPerson2.jpg';


function openForm(trigger) {
    return ( 
    <div>
        <h2 className="mt-5">Please fill out the form below to submit your package to the courier.</h2>
        <center>
        <div className="option-form">
        <table>
            <tr>
                <td>
                    <label>Describe the item:</label>
                </td>
                <td>
                    <textarea type="text"></textarea>
                </td>   
            </tr>
            <tr>
                <td>
                    <label>Enter the weight of the item:&emsp;</label>
                </td>
                <td>
                    <input type="text"></input>
                </td>   
            </tr>
            <tr>
                <td>
                    <label>Enter the volume of the item:</label>
                </td>
                <td>
                    <input type="text"></input>
                </td> 
                <td>
                    <label>m³</label>
                </td>  
            </tr>
            <tr>
                <td>
                    <label>Enter the user ID of the recipient of the item:&emsp;</label>
                </td>
                <td>
                    <input type="text"></input>
                </td>   
            </tr>
            <tr>
                <td>
                    <label className="mt-3">Select branch:&emsp;</label>
                </td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">Branch Name
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="#">Tunalı</a></li>
                            <li><a href="#">Kızılay</a></li>
                            <li><a href="#">Bilkent</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </table>
        <button className="mt-3 btn btn-success" type="button">Submit</button>
        <hr/>
        <button onClick={e => { trigger(true);}} className="btn btn-primary" type="button">Go Back to Selection</button>
        </div>
        </center>
    </div>
    );
}

function openForm2(trigger) {
    return ( 
    <div>
        <h2 className="mt-5">Please fill out the form below to submit your package to the branch in person.</h2>
        <center>
        <div className="option-form">
        <table>
            <tr>
                <td>
                    <label>Describe the item:</label>
                </td>
                <td>
                    <textarea type="text"></textarea>
                </td>   
            </tr>
            <tr>
                <td>
                    <label>Enter the weight of the item:&emsp;</label>
                </td>
                <td>
                    <input type="text"></input>
                </td>   
            </tr>
            <tr>
                <td>
                    <label>Enter the volume of the item:</label>
                </td>
                <td>
                    <input type="text"></input>
                </td> 
                <td>
                    <label>m³</label>
                </td>  
            </tr>
            <tr>
                <td>
                    <label>Enter the user ID of the recipient of the item:&emsp;</label>
                </td>
                <td>
                    <input type="text"></input>
                </td>   
            </tr>
            <tr>
                <td>
                    <label className="mt-3">Select branch:&emsp;</label>
                </td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">Branch Name
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="#">Tunalı</a></li>
                            <li><a href="#">Kızılay</a></li>
                            <li><a href="#">Bilkent</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <label className="mt-3">Select employee:&emsp;</label>
                </td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">Employee Name
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="#">Ela Nur</a></li>
                            <li><a href="#">Ahmet Aksöz</a></li>
                            <li><a href="#">Ala Tokel</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </table>
        <button className="mt-3 btn btn-success" type="button">Submit</button>
        <hr/>
        <button onClick={e => { trigger(true);}} className="btn btn-primary" type="button">Go Back to Selection</button>
        </div>
        </center>
    </div>
    );
}

function Customer() {
    const [trigger, setTrigger] = React.useState(true); 
    const [trigger2, setTrigger2] = React.useState(true); 
    return (
        <div>
            <NavBar></NavBar>
            <center>
            {trigger && trigger2 ?
            <table className="option-table">
                <tr>
                    <td>
                        <img onClick={e => { setTrigger(false);}} src={CourierLogo} className="customer-page-logo" alt="logo"/>
                    </td>
                    <td>
                        <img onClick={e => { setTrigger2(false);}} src={InPersonLogo} className="customer-page-logo" alt="logo"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <br></br>
                        <h3 className="customer-page-option">Call Courier to Your Own Location</h3>
                    </td>
                    <td>
                        <br></br>
                        <h3 className="customer-page-option">Submit Package in Person</h3>
                    </td>
                </tr>
            </table>
            : !trigger ? openForm(setTrigger) : openForm2(setTrigger2)}
            </center>
        </div>
    );
}

export default Customer;