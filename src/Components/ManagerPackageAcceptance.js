import React from "react";

function PackageAcceptance() {
    return (
        <div>
            <center>
            
                <div className="package-acceptance">
                    <h6>Assign Shipper</h6>
                    
                    <table className="mt-3">
                        <tr>
                            <td>Package ID:</td>
                            <td>276</td>
                        </tr>
                        <tr>
                            <td>User ID:</td>
                            <td>ahmet.yildiz</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>Bilkent/ANKARA</td>
                        </tr>
                        <tr>
                            <td>Recipient ID:&emsp;&emsp;</td>
                            <td>cem.alkan</td>
                        </tr>
                        <tr>
                            <td>Select Shipper:&emsp;</td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">Shipper Name
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">Mesut Yılmaz</a></li>
                                        <li><a href="#">Hüseyin Akalmaz</a></li>
                                        <li><a href="#">Erman Rok</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <button type="button" className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                    <button type="button" className="btn btn-danger mt-3">Deny</button><br></br><br></br>
                </div>
                <div className="package-acceptance2">
                <h6>Assign Courier</h6>
                    <table className="mt-3">
                        <tr>
                            <td>Package ID:</td>
                            <td>289</td>
                        </tr>
                        <tr>
                            <td>User ID:</td>
                            <td>mehmet.efkan</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>Kızılay/ANKARA</td>
                        </tr>
                        <tr>
                            <td>Recipient ID:&emsp;&emsp;</td>
                            <td>rasim.yaşar</td>
                        </tr>
                        <tr>
                            <td>Select Courier:&emsp;</td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">Employee Name
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">Ali Atay</a></li>
                                        <li><a href="#">Bilge Demir</a></li>
                                        <li><a href="#">Osman Bayrak</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <button type="button" className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                    <button type="button" className="btn btn-danger mt-3">Deny</button><br></br><br></br>
                </div>
                <div className="package-acceptance1">
                    <table className="mt-3">
                        <tr>
                            <td>Package ID:</td>
                            <td>276</td>
                        </tr>
                        <tr>
                            <td>User ID:</td>
                            <td>ahmet.yildiz</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>Bilkent/ANKARA</td>
                        </tr>
                        <tr>
                            <td>Recipient ID:&emsp;&emsp;</td>
                            <td>cem.alkan</td>
                        </tr>
                        <tr>
                            <td>Select Shipper:&emsp;</td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">Shipper Name
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">Mesut Yılmaz</a></li>
                                        <li><a href="#">Hüseyin Akalmaz</a></li>
                                        <li><a href="#">Erman Rok</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <button type="button" className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                    <button type="button" className="btn btn-danger mt-3">Deny</button><br></br><br></br>
                </div>
                <div className="package-acceptance21">
                    <table className="mt-3">
                        <tr>
                            <td>Package ID:</td>
                            <td>289</td>
                        </tr>
                        <tr>
                            <td>User ID:</td>
                            <td>mehmet.efkan</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>Kızılay/ANKARA</td>
                        </tr>
                        <tr>
                            <td>Recipient ID:&emsp;&emsp;</td>
                            <td>rasim.yaşar</td>
                        </tr>
                        <tr>
                            <td>Select Courier:&emsp;</td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">Employee Name
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">Ali Atay</a></li>
                                        <li><a href="#">Bilge Demir</a></li>
                                        <li><a href="#">Osman Bayrak</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <button type="button" className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                    <button type="button" className="btn btn-danger mt-3">Deny</button><br></br><br></br>
                </div>
            </center>
        </div>
    );
}

export default PackageAcceptance;