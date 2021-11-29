import React from "react";

function CustomerInformation() {
    return (
        <div>
            <div>
                <center><h2>My Information</h2></center>
                <table>
                    <tr>
                        <td>User ID:</td>
                        <td>ahmet.yildiz</td>
                    </tr>
                    <tr>
                        <td>User Name:</td>
                        <td>Ahmet Yıldız</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>ahmet.yildiz@bilkent.edu.tr</td>
                    </tr>
                    <tr>
                        <td>Phone Number:&emsp;</td>
                        <td>0555 555 55 55</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>Bilkent/ANKARA</td>
                    </tr>
                    <tr>
                        <td>Balance:</td>
                        <td>70₺</td> 
                    </tr>
                    <tr>
                        <td>Points Collected:</td>
                        <td>7</td> 
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default CustomerInformation;