import React from "react";

function PackageAcceptance() {
    return (
        <div>
        <div className="package-acceptance">
            <table>
                <tr>
                    <td>Order ID:</td>
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
            </table>
            <button type="button" className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
            <button type="button" className="btn btn-danger mt-3">Deny</button>
        </div>
        </div>
    );
}

export default PackageAcceptance;